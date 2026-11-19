/**
 * Dati globali del sito: un solo punto da aggiornare.
 */
export const site = {
  name: 'Sandra Di Scipio',
  role: 'Architetto | Interior Designer',
  descriptor: 'Architect · Interior Designer',
  tagline: 'Architettura | Interior Design | Ristrutturazioni',
  description:
    'Sandra Di Scipio, architetto e interior designer a Milano: progettazione architettonica e d’interni, ristrutturazioni e arredamento chiavi in mano.',
  email: 'discipiosandra@gmail.com',
  phone: '+39 366 133 1176',
  phoneHref: 'tel:+393661331176',
  whatsappHref: 'https://wa.me/393661331176',
  /** Lascia vuoto finché non c'è un profilo: il link non viene mostrato. */
  instagram: '',
  locale: 'it_IT',
} as const;

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Chi sono', href: '/chi-sono/' },
  { label: 'Servizi', href: '/servizi/' },
  { label: 'Progetti', href: '/progetti/' },
  { label: 'Preventivatore online', href: '/preventivatore/' },
  { label: 'Contatti', href: '/contatti/' },
] as const;

export const projectCategories = [
  'Ristrutturazione completa',
  'Interior design',
  'Arredamento chiavi in mano',
] as const;

export type ProjectCategory = (typeof projectCategories)[number];
