/**
 * Attachments of a quote form (T-08.6, D-015, D-069): every `[data-uploader]`
 * of the form keeps its files in memory, the limits (5 files, 20 MB) count all
 * of them together, heavy photos are reduced in the browser before the check.
 */
import {
  addFiles,
  attachmentLimits,
  fitWithin,
  formatBytes,
  reducedName,
  shouldShrink,
  type RejectReason,
} from "../lib/attachments";
import { fill } from "../lib/quote";

export interface FilesText {
  reducing: string;
  removeFile: string;
  added: string;
  removed: string;
  errorType: string;
  errorCount: string;
  errorSize: string;
  total: string;
  help: string;
}

export interface Uploads {
  /** True while photos are being reduced. */
  busy(): boolean;
  /** Files to send, with the field name of their uploader. */
  entries(): { name: string; file: File }[];
}

/** Reduces a photo to 2560 px on its longest side as JPEG; returns the original if that does not help. */
async function shrinkImage(file: File): Promise<File> {
  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    const { width, height } = fitWithin(bitmap.width, bitmap.height);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) return file;
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
    context.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", attachmentLimits.jpegQuality)
    );
    if (!blob || blob.size >= file.size) return file;
    return new File([blob], reducedName(file.name), { type: "image/jpeg", lastModified: file.lastModified });
  } catch {
    // Formats the browser cannot decode (HEIC outside Safari) are sent as they are.
    return file;
  }
}

export function createUploads(form: HTMLFormElement, text: FilesText, locale: string, onChange: () => void): Uploads {
  const uploaders: { name: string; files: File[] }[] = [];
  let pending = 0;

  const allFiles = () => uploaders.flatMap((uploader) => uploader.files);

  const renderTotals = () => {
    const files = allFiles();
    const size = files.reduce((sum, file) => sum + file.size, 0);
    form.querySelectorAll<HTMLElement>("[data-file-total]").forEach((total) => {
      total.hidden = files.length === 0;
      total.textContent = fill(text.total, { count: files.length, size: formatBytes(size, locale) });
    });
  };

  form.querySelectorAll<HTMLElement>("[data-uploader]").forEach((element) => {
    const name = element.dataset.uploader ?? "attachments";
    const input = element.querySelector<HTMLInputElement>('input[type="file"]');
    const list = element.querySelector<HTMLUListElement>("[data-file-list]");
    const template = element.querySelector<HTMLTemplateElement>("[data-file-item]");
    const error = element.querySelector<HTMLElement>("[data-error]");
    const help = element.querySelector<HTMLElement>("[data-help]");
    const dropzone = element.querySelector<HTMLElement>("[data-dropzone]");
    if (!input || !list || !template || !error || !help) return;

    const uploader = { name, files: [] as File[] };
    uploaders.push(uploader);
    // Files are kept in memory: the input never submits them itself.
    input.removeAttribute("name");

    const showMessage = (message: string) => {
      error.textContent = message;
      error.hidden = !message;
      help.hidden = Boolean(message);
    };

    const render = () => {
      list.replaceChildren(
        ...uploader.files.map((file, index) => {
          const item = template.content.firstElementChild?.cloneNode(true) as HTMLElement;
          item.querySelector("[data-file-name]")!.textContent = file.name;
          item.querySelector("[data-file-size]")!.textContent = formatBytes(file.size, locale);
          const remove = item.querySelector<HTMLButtonElement>("[data-file-remove]")!;
          remove.setAttribute("aria-label", fill(text.removeFile, { name: file.name }));
          remove.addEventListener("click", () => {
            const [removed] = uploader.files.splice(index, 1);
            render();
            showMessage("");
            announce(fill(text.removed, { name: removed?.name ?? "" }));
            input.focus();
          });
          return item;
        })
      );
      renderTotals();
      onChange();
    };

    const status = document.createElement("p");
    status.className = "sr-only";
    status.setAttribute("role", "status");
    element.append(status);
    const announce = (message: string) => {
      status.textContent = message;
    };

    const messageFor = (reason: RejectReason, fileName: string) =>
      reason === "type"
        ? fill(text.errorType, { name: fileName })
        : reason === "count"
          ? text.errorCount
          : fill(text.errorSize, { name: fileName });

    const handle = async (incoming: File[]) => {
      if (incoming.length === 0) return;
      pending += 1;
      const reducing = incoming.some(shouldShrink);
      if (reducing) {
        help.hidden = false;
        help.textContent = text.reducing;
      }
      const processed = await Promise.all(incoming.map((file) => (shouldShrink(file) ? shrinkImage(file) : file)));
      pending -= 1;
      help.textContent = text.help;
      const { accepted, rejected } = addFiles(allFiles(), processed);
      uploader.files.push(...accepted);
      render();
      const firstRejected = rejected[0];
      showMessage(firstRejected ? messageFor(firstRejected.reason, firstRejected.file.name) : "");
      if (accepted.length) announce(fill(text.added, { n: accepted.length }));
    };

    input.addEventListener("change", () => {
      const files = Array.from(input.files ?? []);
      input.value = "";
      void handle(files);
    });

    if (dropzone) {
      const setOver = (over: boolean) => dropzone.toggleAttribute("data-dragover", over);
      dropzone.addEventListener("dragenter", (event) => {
        event.preventDefault();
        setOver(true);
      });
      dropzone.addEventListener("dragover", (event) => {
        event.preventDefault();
        setOver(true);
      });
      dropzone.addEventListener("dragleave", () => setOver(false));
      dropzone.addEventListener("drop", (event) => {
        event.preventDefault();
        setOver(false);
        void handle(Array.from(event.dataTransfer?.files ?? []));
      });
    }
  });

  return {
    busy: () => pending > 0,
    entries: () => uploaders.flatMap(({ name, files }) => files.map((file) => ({ name, file }))),
  };
}
