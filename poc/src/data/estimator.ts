/**
 * PREVENTIVATORE ONLINE — domande e criteri di calcolo.
 *
 * ⚠️  VALORI DIMOSTRATIVI · DA SOSTITUIRE CON I CRITERI DI SANDRA.
 * Tutti i prezzi sono indicativi, IVA esclusa e non vincolanti.
 * Modifica solo questo file per aggiornare domande, opzioni e importi.
 */

export type EstimatorOption = {
  id: string;
  label: string;
  hint?: string;
  /** Moltiplicatore applicato al costo base (default 1). */
  factor?: number;
  /** Costo €/mq base (solo per la domanda "servizio"). */
  baseRate?: number;
  /** Superficie di riferimento in mq (solo per la domanda "superficie"). */
  sqm?: number;
  /** Quota dell'immobile coinvolta (solo per la domanda "ambienti", sommata). */
  share?: number;
};

export type EstimatorQuestion = {
  id: string;
  title: string;
  help?: string;
  multiple?: boolean;
  options: EstimatorOption[];
};

export const estimatorQuestions: EstimatorQuestion[] = [
  {
    id: 'servizio',
    title: 'Di quale servizio hai bisogno?',
    options: [
      { id: 'progetto', label: 'Progetto', hint: 'Progettazione architettonica e d’interni', baseRate: 45 },
      { id: 'chiavi-in-mano', label: 'Chiavi in mano', hint: 'Dal progetto alla realizzazione', baseRate: 950 },
      { id: 'ristrutturazione', label: 'Ristrutturazione', hint: 'Progetto e direzione dei lavori', baseRate: 750 },
      { id: 'consulenza', label: 'Consulenza d’arredo', hint: 'Scelta di arredi, materiali e colori', baseRate: 25 },
    ],
  },
  {
    id: 'immobile',
    title: 'Che tipo di immobile è?',
    options: [
      { id: 'appartamento', label: 'Appartamento', factor: 1 },
      { id: 'villa', label: 'Villa o casa indipendente', factor: 1.1 },
      { id: 'ufficio', label: 'Ufficio o studio professionale', factor: 1.05 },
      { id: 'commerciale', label: 'Negozio, locale o spazio commerciale', factor: 1.15 },
    ],
  },
  {
    id: 'superficie',
    title: 'Quanto è grande lo spazio?',
    options: [
      { id: 'xs', label: 'Fino a 50 mq', sqm: 45 },
      { id: 's', label: 'Da 50 a 90 mq', sqm: 70 },
      { id: 'm', label: 'Da 90 a 150 mq', sqm: 120 },
      { id: 'l', label: 'Oltre 150 mq', sqm: 180 },
    ],
  },
  {
    id: 'ambienti',
    title: 'Quali ambienti vuoi trasformare?',
    help: 'Puoi scegliere più risposte.',
    multiple: true,
    options: [
      { id: 'tutto', label: 'Tutto l’immobile', share: 1 },
      { id: 'giorno', label: 'Zona giorno', share: 0.35 },
      { id: 'cucina', label: 'Cucina', share: 0.2 },
      { id: 'bagni', label: 'Bagni', share: 0.15 },
      { id: 'notte', label: 'Camere', share: 0.3 },
    ],
  },
  {
    id: 'stato',
    title: 'In che stato si trova oggi?',
    options: [
      { id: 'da-ristrutturare', label: 'Da ristrutturare completamente', factor: 1.2 },
      { id: 'abitabile', label: 'Abitabile, da rinnovare', factor: 1 },
      { id: 'nuovo', label: 'Nuovo o appena ristrutturato', factor: 0.85 },
    ],
  },
  {
    id: 'finiture',
    title: 'Che livello di personalizzazione desideri?',
    options: [
      { id: 'essenziale', label: 'Essenziale', hint: 'Soluzioni di serie, ottimo rapporto qualità/prezzo', factor: 0.85 },
      { id: 'medio', label: 'Su misura', hint: 'Alcuni arredi e finiture personalizzati', factor: 1 },
      { id: 'alto', label: 'Alta gamma', hint: 'Materiali pregiati e arredi su misura', factor: 1.35 },
    ],
  },
  {
    id: 'tempi',
    title: 'Quando vorresti iniziare?',
    options: [
      { id: 'subito', label: 'Entro 3 mesi' },
      { id: 'medio', label: 'Tra 3 e 6 mesi' },
      { id: 'lungo', label: 'Oltre 6 mesi' },
      { id: 'da-definire', label: 'Non lo so ancora' },
    ],
  },
];

/** Forchetta del risultato: ±% attorno al valore calcolato. */
export const estimatorRange = { low: 0.85, high: 1.2 };
