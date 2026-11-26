import { describe, expect, it } from "vitest";

import { en } from "../i18n/ui/en";
import { es } from "../i18n/ui/es";
import { it as itUi } from "../i18n/ui/it";
import { contact, emailHref, phoneHref, whatsappHref } from "./contact";

describe("whatsappHref", () => {
  it("opens the chat with the pre-filled message, URL-encoded", () => {
    expect(whatsappHref("Buongiorno Sandra, scrivo dal sito: vorrei informazioni su un progetto.")).toBe(
      "https://wa.me/393661331176?text=Buongiorno%20Sandra%2C%20scrivo%20dal%20sito%3A%20vorrei%20informazioni%20su%20un%20progetto."
    );
  });

  it("encodes accented characters and apostrophes of EN and ES messages", () => {
    for (const message of [en["whatsapp.message"], es["whatsapp.message"]]) {
      const url = new URL(whatsappHref(message));
      expect(url.searchParams.get("text")).toBe(message);
    }
  });

  it("omits the text parameter when the message is empty", () => {
    expect(whatsappHref("   ")).toBe("https://wa.me/393661331176");
  });

  it("uses the same number as the phone link", () => {
    expect(itUi["whatsapp.message"]).not.toBe("");
    expect(phoneHref()).toBe(`tel:+${contact.phoneNumber}`);
    expect(whatsappHref("Hi", "391234")).toBe("https://wa.me/391234?text=Hi");
  });
});

describe("emailHref", () => {
  it("builds a mailto link", () => {
    expect(emailHref("info@example.com")).toBe("mailto:info@example.com");
  });
});
