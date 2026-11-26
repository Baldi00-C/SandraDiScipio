/**
 * Contact details shown in the header menu, footer and WhatsApp button.
 * Values from the POC until Sandra confirms them (REQ-CONT-6).
 */
export const contact = {
  email: "discipiosandra@gmail.com",
  phoneDisplay: "+39 366 133 1176",
  /** International number without "+" or spaces, as wa.me and tel: expect. */
  phoneNumber: "393661331176",
  /** Leave empty until there is a profile: the footer link stays hidden (D-065). */
  instagram: "",
  /** VAT number for the footer legal line; empty shows the placeholder (D-065). */
  vatNumber: "",
} as const;

export const phoneHref = (number: string = contact.phoneNumber): string => `tel:+${number}`;

export const emailHref = (email: string = contact.email): string => `mailto:${email}`;

/** WhatsApp chat link with a pre-filled message (REQ-CONT-1, D-076). */
export function whatsappHref(message: string, number: string = contact.phoneNumber): string {
  const text = message.trim();
  return text ? `https://wa.me/${number}?text=${encodeURIComponent(text)}` : `https://wa.me/${number}`;
}
