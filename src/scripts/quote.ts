/**
 * Quote builder behaviour (S-08, D-095): turns each path form into one screen
 * at a time with chapters, validation, the live project sheet (aside on
 * desktop, bar and full-screen sheet on mobile), an editable summary, answers
 * kept for the browser session and the "request sent" screen.
 * The `#turnkey` and `#design` anchors open a path; an empty hash shows the choice.
 */
import { fill, isPhoneRequired, linkLabel, normalizeLink, pathFromHash, type QuotePath } from "../lib/quote";
import { submitQuote } from "../lib/quote-submit";
import { createUploads, type FilesText } from "./quote-files";

interface FlowText {
  locale: string;
  pathName: string;
  chapters: string[];
  ui: Record<string, string>;
  sent: { title: string; text: string; channels: Record<string, string> };
  files: FilesText;
  moodboard: Record<string, string>;
}

interface Row {
  label: string;
  value: string;
}

interface ChapterSummary {
  index: number;
  name: string;
  firstStep: number;
  rows: Row[];
  images: HTMLImageElement[];
  swatches: string[];
}

interface Flow {
  setActive(active: boolean, initial: boolean): void;
}

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const tabletUp = window.matchMedia("(min-width: 53.75rem)");

function textOf(element: Element | null): string {
  return element?.textContent?.replace(/\s+/g, " ").trim() ?? "";
}

function createFlow(section: HTMLElement): Flow | null {
  const path = section.dataset.quoteFlow as QuotePath;
  const formElement = section.querySelector<HTMLFormElement>("form[data-quote-form]");
  const textElement = section.querySelector("script[data-quote-text]");
  if (!formElement || !textElement?.textContent) return null;
  const form: HTMLFormElement = formElement;
  const text = JSON.parse(textElement.textContent) as FlowText;
  const { ui } = text;

  const steps = Array.from(form.querySelectorAll<HTMLElement>(".quote-step"));
  const summaryIndex = steps.length - 1;
  const screenCount = summaryIndex;
  const chapterItems = Array.from(section.querySelectorAll<HTMLElement>("[data-chapter-index]"));
  const chapterCurrent = section.querySelector<HTMLElement>("[data-chapter-current]");
  const exitLink = section.querySelector<HTMLElement>("[data-quote-exit]");
  const aside = section.querySelector<HTMLElement>("[data-sheet-aside]");
  const sheets = Array.from(section.querySelectorAll<HTMLElement>("[data-sheet]"));
  const bar = section.querySelector<HTMLElement>("[data-sheet-bar]");
  const barCount = section.querySelector<HTMLElement>("[data-sheet-count]");
  const barNext = section.querySelector<HTMLButtonElement>("[data-bar-next]");
  const dialog = section.querySelector<HTMLDialogElement>("[data-sheet-dialog]");
  const sent = section.querySelector<HTMLElement>("[data-sent]");
  const formGrid = form.parentElement;
  const storageKey = `quote:${path}`;

  let current = 0;
  let returnToSummary = false;
  let pointerChoice = false;
  let renderQueued = false;
  let active = false;

  const uploads = createUploads(form, text.files, text.locale, () => queueRender());

  /* ---------- Values ---------- */

  const fieldsOf = (root: Element) =>
    Array.from(root.querySelectorAll<HTMLElement>("[data-field]")).filter((field) => field.dataset.kind !== "consent");

  const displayValue = (field: HTMLElement): string => {
    const kind = field.dataset.kind;
    if (kind === "single" || kind === "multi") {
      return Array.from(field.querySelectorAll<HTMLInputElement>("input:checked"))
        .map((input) => textOf(input.closest("label")?.querySelector("[data-option-label]") ?? null))
        .join(", ");
    }
    const control = field.querySelector<HTMLInputElement | HTMLTextAreaElement>("input, textarea");
    const value = control?.value.trim() ?? "";
    if (kind === "counter") return value === "0" ? "" : value;
    if (kind === "number" && value) return `${value} m²`;
    if (kind === "textarea" && value.length > 90) return `${value.slice(0, 89)}…`;
    return value;
  };

  const linkCount = () => form.querySelectorAll("[data-link-value]").length;

  const stepAnswered = (step: HTMLElement): boolean =>
    fieldsOf(step).some((field) => !field.hasAttribute("data-default-answer") && displayValue(field) !== "") ||
    Array.from(step.querySelectorAll<HTMLElement>("[data-file-list]")).some((list) => list.children.length > 0) ||
    step.querySelectorAll("[data-link-value]").length > 0;

  const collect = (): ChapterSummary[] =>
    text.chapters.map((name, index) => {
      const chapterSteps = steps.slice(0, summaryIndex).filter((step) => Number(step.dataset.chapter) === index);
      const rows: Row[] = [];
      const images: HTMLImageElement[] = [];
      const swatches: string[] = [];
      for (const step of chapterSteps) {
        for (const field of fieldsOf(step)) {
          const value = displayValue(field);
          if (value || field.hasAttribute("data-required")) rows.push({ label: field.dataset.summary ?? "", value });
          if (field.dataset.field === "atmospheres") {
            field.querySelectorAll<HTMLInputElement>("input:checked").forEach((input) => {
              const image = input.closest("label")?.querySelector<HTMLImageElement>("img");
              if (image) images.push(image);
            });
          }
          if (field.dataset.field === "colors") {
            field.querySelectorAll<HTMLInputElement>("input:checked").forEach((input) => {
              const swatch = input.closest("label")?.querySelector<HTMLElement>("[data-swatch]")?.dataset.swatch;
              if (swatch) swatches.push(swatch);
            });
          }
        }
        const links = step.querySelector<HTMLElement>("[data-links]");
        if (links && linkCount() > 0) {
          rows.push({
            label: links.dataset.summary ?? "",
            value: fill(links.dataset.countText ?? "{n}", { n: linkCount() }),
          });
        }
        step.querySelectorAll<HTMLElement>("[data-uploader]").forEach((uploader) => {
          const names = Array.from(uploader.querySelectorAll("[data-file-name]")).map(textOf);
          if (names.length) rows.push({ label: uploader.dataset.summary ?? "", value: names.join(", ") });
        });
      }
      return { index, name, firstStep: Number(chapterSteps[0]?.dataset.stepIndex ?? 0), rows, images, swatches };
    });

  const answeredCount = () => steps.slice(0, summaryIndex).filter(stepAnswered).length;

  /* ---------- Project sheet and summary ---------- */

  const element = <K extends keyof HTMLElementTagNameMap>(tag: K, className = "", content = "") => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content) node.textContent = content;
    return node;
  };

  const editButton = (chapter: ChapterSummary) => {
    const button = element(
      "button",
      "type-link text-action-hover uppercase underline-offset-[0.3em] hover:underline",
      ui.edit
    );
    button.type = "button";
    button.setAttribute("aria-label", fill(ui.editChapter, { chapter: chapter.name }));
    button.addEventListener("click", () => {
      returnToSummary = current === summaryIndex;
      if (dialog?.open) dialog.close();
      goTo(chapter.firstStep);
    });
    return button;
  };

  const moodVisuals = (chapter: ChapterSummary, large: boolean) => {
    if (!chapter.images.length && !chapter.swatches.length) return null;
    const wrap = element("div", "flex flex-wrap items-center gap-2 pt-3");
    wrap.setAttribute("aria-hidden", "true");
    for (const image of chapter.images) {
      const copy = element("img", large ? "h-30 w-24 object-cover" : "h-17 w-14 object-cover");
      copy.src = image.currentSrc || image.src;
      copy.alt = "";
      wrap.append(copy);
    }
    for (const color of chapter.swatches) {
      const dot = element("span", "size-7 rounded-pill border border-border-default");
      dot.style.backgroundColor = color;
      wrap.append(dot);
    }
    return wrap;
  };

  const renderSheet = (container: HTMLElement, framed: boolean) => {
    const chapters = collect();
    const reached = Number(steps[current]?.dataset.chapter ?? 0);
    const answered = answeredCount();
    const root = element(
      "div",
      framed
        ? "flex flex-col gap-6 border border-border-default bg-surface-default p-8"
        : "flex flex-col gap-6 bg-surface-default"
    );
    const head = element("div", "flex flex-col gap-2");
    head.append(
      element("p", "type-eyebrow text-text-label uppercase", ui.sheetTitle),
      element("p", "type-h3", text.pathName)
    );
    const progress = element("div", "flex items-center gap-3 pt-2");
    const track = element("span", "h-0.5 flex-1 bg-border-default");
    const fillBar = element("span", "block h-full bg-action-default transition-[width] duration-base ease-editorial");
    fillBar.style.width = `${Math.round((answered / screenCount) * 100)}%`;
    track.append(fillBar);
    progress.append(
      track,
      element("span", "type-caption text-text-secondary", fill(ui.sheetCount, { n: answered, total: screenCount }))
    );
    head.append(progress);
    root.append(head);

    for (const chapter of chapters) {
      const group = element("section", "flex flex-col border-t border-border-default pt-4");
      const groupHead = element("div", "flex items-center justify-between gap-3 pb-2");
      const open = chapter.index <= reached || current === summaryIndex;
      groupHead.append(
        element(
          "h4",
          `type-caption ${open ? "text-text-primary" : "text-text-secondary"}`,
          `0${chapter.index + 1} · ${chapter.name}`
        )
      );
      if (open && chapter.rows.some((row) => row.value)) groupHead.append(editButton(chapter));
      group.append(groupHead);
      if (open && chapter.rows.length) {
        const list = element("dl", "flex flex-col");
        for (const row of chapter.rows) {
          const line = element("div", "flex justify-between gap-4 py-1.5");
          line.append(
            element("dt", "type-body-small shrink-0 text-text-secondary", row.label),
            element(
              "dd",
              `type-body-small min-w-0 text-right break-words ${row.value ? "text-text-primary" : "text-text-secondary"}`,
              row.value || ui.sheetEmpty
            )
          );
          list.append(line);
        }
        group.append(list);
      }
      const visuals = open ? moodVisuals(chapter, false) : null;
      if (visuals) group.append(visuals);
      root.append(group);
    }
    container.replaceChildren(root);
  };

  const renderSummary = () => {
    const list = form.querySelector<HTMLElement>("[data-summary-list]");
    if (!list) return;
    list.replaceChildren(
      ...collect().map((chapter) => {
        const group = element("section", "flex flex-col border-t border-border-default pt-6");
        const head = element("div", "flex items-center justify-between gap-4 pb-3");
        head.append(element("h4", "type-h3", `0${chapter.index + 1} · ${chapter.name}`), editButton(chapter));
        group.append(head);
        const rows = element("dl", "flex flex-col");
        for (const row of chapter.rows) {
          const line = element(
            "div",
            "flex flex-col gap-1 border-b border-border-default py-3 mobile:flex-row mobile:gap-6"
          );
          line.append(
            element("dt", "type-body-small shrink-0 text-text-secondary mobile:w-44", row.label),
            element("dd", "type-body-small min-w-0 break-words", row.value || ui.sheetEmpty)
          );
          rows.append(line);
        }
        group.append(rows);
        const visuals = moodVisuals(chapter, true);
        if (visuals) group.append(visuals);
        return group;
      })
    );
    const sendText = form.querySelector<HTMLElement>("[data-send-text]");
    const email = form.querySelector<HTMLInputElement>('input[name="email"]')?.value.trim() ?? "";
    if (sendText) sendText.textContent = fill(sendText.dataset.template ?? "", { email });
  };

  const render = () => {
    renderQueued = false;
    sheets.forEach((sheet) => renderSheet(sheet, sheet.closest("aside") !== null));
    if (barCount) barCount.textContent = fill(ui.sheetCount, { n: answeredCount(), total: screenCount });
    if (current === summaryIndex) renderSummary();
  };

  function queueRender() {
    if (renderQueued) return;
    renderQueued = true;
    requestAnimationFrame(render);
  }

  /* ---------- Validation ---------- */

  const showError = (field: HTMLElement, message: string) => {
    const errors = field.querySelectorAll<HTMLElement>("[data-error]");
    const error = errors[errors.length - 1];
    const help = field.querySelector<HTMLElement>("[data-help]");
    const controls = field.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
      "input:not([type=hidden]), textarea"
    );
    if (error) {
      error.textContent = message;
      error.hidden = !message;
      if (!error.id) error.id = `${path}-${field.dataset.field}-error`;
    }
    if (help) help.hidden = Boolean(message);
    controls.forEach((control) => {
      if (message) {
        control.setAttribute("aria-invalid", "true");
        if (error) control.setAttribute("aria-describedby", error.id);
      } else {
        control.removeAttribute("aria-invalid");
        if (help?.id) control.setAttribute("aria-describedby", help.id);
        else if (control.type === "radio" || control.type === "checkbox") control.removeAttribute("aria-describedby");
      }
    });
    field.toggleAttribute("data-invalid", Boolean(message));
  };

  const validateField = (field: HTMLElement): boolean => {
    const kind = field.dataset.kind;
    const required = field.hasAttribute("data-required");
    let valid = true;
    if (kind === "single" || kind === "multi" || kind === "consent") {
      valid = !required || field.querySelector("input:checked") !== null;
    } else {
      const control = field.querySelector<HTMLInputElement | HTMLTextAreaElement>("input, textarea");
      const value = control?.value.trim() ?? "";
      if (kind === "phone") {
        const preference = form.querySelector<HTMLInputElement>('input[name="preferredContact"]:checked')?.value;
        const digits = value.replace(/\D/g, "");
        valid = value ? digits.length >= 6 : !isPhoneRequired(preference);
      } else if (kind === "email") {
        valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      } else if (kind === "number") {
        valid = value ? (control as HTMLInputElement).validity.valid : !required;
      } else if (required) {
        valid = value !== "";
      }
    }
    showError(field, valid ? "" : (field.dataset.errorMessage ?? ""));
    return valid;
  };

  const validateStep = (step: HTMLElement, focusInvalid = true): boolean => {
    let firstInvalid: HTMLElement | null = null;
    for (const field of Array.from(step.querySelectorAll<HTMLElement>("[data-field]"))) {
      if (!validateField(field) && !firstInvalid) firstInvalid = field;
    }
    if (firstInvalid && focusInvalid) {
      firstInvalid.querySelector<HTMLElement>("input:not([type=hidden]), textarea")?.focus();
    }
    return firstInvalid === null;
  };

  /* ---------- Navigation ---------- */

  const updateChrome = () => {
    const chapter = Number(steps[current]?.dataset.chapter ?? 0);
    chapterItems.forEach((item, index) => {
      item.dataset.state = index < chapter ? "done" : index === chapter ? "current" : "todo";
      if (index === chapter) item.setAttribute("aria-current", "step");
      else item.removeAttribute("aria-current");
    });
    if (chapterCurrent) chapterCurrent.textContent = `0${chapter + 1} · ${text.chapters[chapter] ?? ""}`;
    if (barNext) {
      barNext.hidden = current === summaryIndex;
      barNext.textContent = current === summaryIndex - 1 ? ui.toSummary : ui.next;
    }
  };

  const scrollToTop = () => {
    const top = section.getBoundingClientRect().top + window.scrollY - 80;
    if (window.scrollY > top) window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
  };

  function goTo(index: number, options: { focus?: boolean } = {}) {
    const target = Math.min(Math.max(index, 0), summaryIndex);
    steps.forEach((step, stepIndex) => step.classList.toggle("is-current", stepIndex === target));
    section.classList.toggle("is-summary", target === summaryIndex);
    current = target;
    const step = steps[target]!;
    if (!reducedMotion) {
      step.classList.remove("is-entering");
      void step.offsetWidth;
      step.classList.add("is-entering");
    }
    updateChrome();
    render();
    save();
    if (options.focus !== false) {
      scrollToTop();
      step.querySelector<HTMLElement>("[data-step-title]")?.focus({ preventScroll: true });
    }
  }

  const next = () => {
    if (uploads.busy()) return;
    if (!validateStep(steps[current]!)) return;
    if (returnToSummary) {
      returnToSummary = false;
      goTo(summaryIndex);
    } else {
      goTo(current + 1);
    }
  };

  /* ---------- Session storage ---------- */

  function save() {
    try {
      const values: [string, string][] = [];
      new FormData(form).forEach((value, name) => {
        if (typeof value === "string" && !["path", "locale", "privacy"].includes(name)) values.push([name, value]);
      });
      sessionStorage.setItem(storageKey, JSON.stringify({ step: current, values }));
    } catch {
      // Storage unavailable (private mode): answers simply are not kept.
    }
  }

  const restore = (): number => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(storageKey) ?? "null") as {
        step: number;
        values: [string, string][];
      } | null;
      if (!saved) return 0;
      form.querySelectorAll<HTMLInputElement>('input[type="radio"], input[type="checkbox"]').forEach((input) => {
        input.checked = false;
      });
      for (const [name, value] of saved.values) {
        if (name === "referenceLinks") {
          addLink(value);
          continue;
        }
        const controls = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(`[name="${CSS.escape(name)}"]`);
        controls.forEach((control) => {
          if (control instanceof HTMLInputElement && (control.type === "radio" || control.type === "checkbox")) {
            if (control.value === value) control.checked = true;
          } else if (!(control instanceof HTMLInputElement && control.type === "file")) {
            control.value = value;
          }
        });
      }
      updatePhoneLabel();
      return Math.min(saved.step, summaryIndex);
    } catch {
      return 0;
    }
  };

  const clearSaved = () => {
    try {
      sessionStorage.removeItem(storageKey);
    } catch {
      // Nothing to clear.
    }
  };

  /* ---------- Field behaviours ---------- */

  const linkList = form.querySelector<HTMLElement>("[data-link-list]");
  const linkTemplate = form.querySelector<HTMLTemplateElement>("[data-link-item]");
  const linkInput = form.querySelector<HTMLInputElement>("[data-link-input]");
  const linkField = form.querySelector<HTMLElement>("[data-link-field]");

  function addLink(raw: string): boolean {
    const href = normalizeLink(raw);
    if (!href || !linkList || !linkTemplate) return false;
    const existing = Array.from(linkList.querySelectorAll<HTMLInputElement>("[data-link-value]")).map(
      (input) => input.value
    );
    if (existing.includes(href) || existing.length >= 10) return true;
    const item = linkTemplate.content.firstElementChild?.cloneNode(true) as HTMLElement;
    const label = linkLabel(href);
    const anchor = item.querySelector<HTMLAnchorElement>("[data-link-label]")!;
    anchor.href = href;
    anchor.textContent = label;
    item.querySelector<HTMLInputElement>("[data-link-value]")!.value = href;
    const remove = item.querySelector<HTMLButtonElement>("[data-link-remove]")!;
    remove.setAttribute("aria-label", fill(remove.dataset.labelTemplate ?? "", { label }));
    remove.addEventListener("click", () => {
      item.remove();
      linkInput?.focus();
      queueRender();
      save();
    });
    linkList.append(item);
    return true;
  }

  const submitLink = () => {
    if (!linkInput || !linkField) return;
    const error = linkField.querySelector<HTMLElement>("[data-error]");
    const help = linkField.querySelector<HTMLElement>("[data-help]");
    const ok = addLink(linkInput.value);
    if (error) {
      error.textContent = ok ? "" : (linkInput.dataset.errorMessage ?? "");
      error.hidden = ok;
    }
    if (help) help.hidden = !ok;
    linkInput.toggleAttribute("aria-invalid", !ok);
    if (ok) {
      linkInput.value = "";
      queueRender();
      save();
    }
    linkInput.focus();
  };

  function updatePhoneLabel() {
    const field = form.querySelector<HTMLElement>('[data-field="phone"]');
    const label = field?.querySelector<HTMLElement>("label");
    if (!field || !label) return;
    const preference = form.querySelector<HTMLInputElement>('input[name="preferredContact"]:checked')?.value;
    const required = isPhoneRequired(preference);
    label.textContent = (required ? label.dataset.labelRequired : label.dataset.labelOptional) ?? label.textContent;
    field.querySelector("input")?.toggleAttribute("required", required);
    if (field.hasAttribute("data-invalid")) validateField(field);
  }

  form.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const counter = target.closest<HTMLButtonElement>("[data-counter-step]");
    if (counter) {
      const input = counter.parentElement?.querySelector<HTMLInputElement>('input[type="number"]');
      if (input) {
        if (Number(counter.dataset.counterStep) > 0) input.stepUp();
        else input.stepDown();
        input.dispatchEvent(new Event("input", { bubbles: true }));
      }
      return;
    }
    const prompt = target.closest<HTMLButtonElement>("[data-prompt]");
    if (prompt) {
      const textarea = prompt.closest("[data-field]")?.querySelector("textarea");
      if (textarea) {
        const before = textarea.value.replace(/\s+$/, "");
        textarea.value = `${before}${before ? "\n" : ""}${prompt.dataset.prompt}: `;
        textarea.focus();
        textarea.setSelectionRange(textarea.value.length, textarea.value.length);
        textarea.dispatchEvent(new Event("input", { bubbles: true }));
      }
      return;
    }
    if (target.closest("[data-link-add]")) {
      submitLink();
      return;
    }
    if (target.closest("[data-step-next]")) next();
    else if (target.closest("[data-step-back]")) goTo(current - 1);
  });

  form.addEventListener("pointerup", (event) => {
    pointerChoice = (event.target as HTMLElement).closest("label") !== null;
  });

  form.addEventListener("change", (event) => {
    const input = event.target as HTMLInputElement;
    const field = input.closest<HTMLElement>("[data-field]");
    const exclusive = field?.dataset.exclusive?.split(" ");
    if (field && exclusive && input.type === "checkbox" && input.checked) {
      const chosenExclusive = exclusive.includes(input.value);
      field.querySelectorAll<HTMLInputElement>('input[type="checkbox"]').forEach((other) => {
        if (other !== input && (chosenExclusive || exclusive.includes(other.value))) other.checked = false;
      });
    }
    if (input.name === "preferredContact") updatePhoneLabel();
    if (field?.hasAttribute("data-invalid")) validateField(field);
    const step = steps[current];
    if (
      pointerChoice &&
      input.type === "radio" &&
      step?.hasAttribute("data-auto-advance") &&
      step.contains(input) &&
      !returnToSummary
    ) {
      pointerChoice = false;
      window.setTimeout(() => {
        if (steps[current] === step) next();
      }, 380);
    }
    queueRender();
    save();
  });

  form.addEventListener("input", (event) => {
    const field = (event.target as HTMLElement).closest<HTMLElement>("[data-field]");
    if (field?.hasAttribute("data-invalid")) validateField(field);
    queueRender();
    save();
  });

  form.addEventListener("keydown", (event) => {
    pointerChoice = false;
    if (event.key !== "Enter" || event.isComposing) return;
    const target = event.target as HTMLElement;
    if (
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLButtonElement ||
      target instanceof HTMLAnchorElement
    ) {
      return;
    }
    if (!(target instanceof HTMLInputElement)) return;
    event.preventDefault();
    if (target.hasAttribute("data-link-input")) submitLink();
    else if (current < summaryIndex) next();
  });

  /* ---------- Sheet on mobile ---------- */

  section.querySelector("[data-sheet-open]")?.addEventListener("click", () => {
    render();
    dialog?.showModal();
  });
  section.querySelector("[data-sheet-close]")?.addEventListener("click", () => dialog?.close());
  dialog?.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  barNext?.addEventListener("click", next);
  tabletUp.addEventListener("change", () => {
    if (tabletUp.matches && dialog?.open) dialog.close();
  });

  /* ---------- Sending ---------- */

  const showSent = (dryRun: boolean) => {
    if (!sent) return;
    const name = form.querySelector<HTMLInputElement>('input[name="name"]')?.value.trim() ?? "";
    const email = form.querySelector<HTMLInputElement>('input[name="email"]')?.value.trim() ?? "";
    const preference = form.querySelector<HTMLInputElement>('input[name="preferredContact"]:checked')?.value ?? "email";
    const title = sent.querySelector<HTMLElement>("[data-sent-title]");
    const body = sent.querySelector<HTMLElement>("[data-sent-text]");
    if (title) title.textContent = fill(text.sent.title, { name: name.split(" ")[0] ?? name });
    if (body) {
      body.textContent = fill(text.sent.text, { email, channel: text.sent.channels[preference] ?? "" });
    }
    const draft = sent.querySelector<HTMLElement>("[data-sent-draft]");
    if (draft) draft.hidden = !dryRun;
    const mood = sent.querySelector<HTMLElement>("[data-sent-mood]");
    const images = collect()
      .flatMap((chapter) => chapter.images)
      .slice(0, 2);
    if (mood) {
      mood.hidden = images.length === 0;
      mood.replaceChildren(
        ...images.map((image, index) => {
          const copy = document.createElement("img");
          copy.src = image.currentSrc || image.src;
          copy.alt = "";
          copy.className = `w-full object-cover ${index === 0 ? "aspect-[3/5]" : "aspect-[3/4] mt-16"}`;
          return copy;
        })
      );
    }
    if (formGrid) formGrid.hidden = true;
    section.querySelector<HTMLElement>("[data-flow-head]")!.hidden = true;
    if (bar) bar.hidden = true;
    sent.hidden = false;
    scrollToTop();
    sent.focus({ preventScroll: true });
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (current !== summaryIndex) {
      next();
      return;
    }
    for (let index = 0; index < summaryIndex; index += 1) {
      if (!validateStep(steps[index]!, false)) {
        returnToSummary = true;
        goTo(index);
        validateStep(steps[index]!);
        return;
      }
    }
    const privacy = form.querySelector<HTMLElement>('[data-field="privacy"]');
    if (privacy && !validateField(privacy)) {
      privacy.querySelector("input")?.focus();
      return;
    }
    const button = form.querySelector<HTMLButtonElement>("[data-send]");
    const error = form.querySelector<HTMLElement>("[data-send-error]");
    const label = button?.textContent ?? "";
    if (button) {
      button.disabled = true;
      button.setAttribute("aria-busy", "true");
      button.textContent = ui.sending ?? label;
    }
    if (error) error.hidden = true;

    const data = new FormData(form);
    for (const { name, file } of uploads.entries()) data.append(name, file, file.name);
    const result = await submitQuote(data);

    if (button) {
      button.disabled = false;
      button.removeAttribute("aria-busy");
      button.textContent = label;
    }
    if (result.ok) {
      clearSaved();
      showSent(result.dryRun);
    } else if (error) {
      error.hidden = false;
      error.focus();
    }
  });

  /* ---------- Activation ---------- */

  const startStep = restore();

  return {
    setActive(isActive: boolean, initial: boolean) {
      section.classList.toggle("is-active", isActive);
      if (exitLink) exitLink.hidden = false;
      if (aside) aside.hidden = !isActive;
      if (bar) bar.hidden = !isActive || (sent !== null && !sent.hidden);
      if (!isActive) {
        if (dialog?.open) dialog.close();
        active = false;
        return;
      }
      if (active) return;
      active = true;
      goTo(initial ? startStep : current, { focus: !initial });
      // The flow replaces the choice at the top of the page: start from there.
      requestAnimationFrame(() => window.scrollTo({ top: 0 }));
    },
  };
}

const root = document.querySelector<HTMLElement>("[data-quote]");

if (root) {
  const choice = root.querySelector<HTMLElement>("[data-quote-choice]");
  const flows = new Map<QuotePath, Flow>();
  root.querySelectorAll<HTMLElement>("[data-quote-flow]").forEach((section) => {
    const flow = createFlow(section);
    if (flow) flows.set(section.dataset.quoteFlow as QuotePath, flow);
  });

  const show = (initial: boolean) => {
    const path = pathFromHash(window.location.hash);
    for (const [flowPath, flow] of flows) flow.setActive(flowPath === path, initial);
    if (path) document.documentElement.dataset.quotePath = path;
    else delete document.documentElement.dataset.quotePath;
    if (path === null && !initial) {
      window.scrollTo({ top: 0 });
      choice?.querySelector<HTMLElement>("h1")?.setAttribute("tabindex", "-1");
      choice?.querySelector<HTMLElement>("h1")?.focus({ preventScroll: true });
    }
  };

  window.addEventListener("hashchange", () => show(false));
  show(true);
}
