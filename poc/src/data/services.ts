import architettura from '@/assets/projects/villa-castana-pavia/villa-castana-pavia-pianta-arredi.jpg';
import interior from '@/assets/projects/appartamento-milano/appartamento-milano-render-zona-tv.jpg';
import ristrutturazioni from '@/assets/projects/villa-castana-pavia/villa-castana-pavia-dopo-zona-giorno.jpg';
import arredamento from '@/assets/projects/villa-castana-pavia/villa-castana-pavia-render-soggiorno-vista-laterale.jpg';

/** Testi dei servizi (da Figma: 01 · Home, 03 · Servizi). */
export const services = [
  {
    id: 'architettura',
    number: '01',
    eyebrow: '01 / Architettura',
    title: 'Architettura e progettazione',
    short: 'Dall’idea iniziale allo sviluppo del progetto.',
    description:
      'Dall’idea iniziale allo sviluppo del progetto, studiamo soluzioni architettoniche pensate per valorizzare ogni ambiente.',
    items: [
      'Consulenza progettuale',
      'Rilievo e analisi degli spazi',
      'Distribuzione e ottimizzazione degli ambienti',
      'Elaborati grafici e planimetrici',
      'Progettazione architettonica e d’interni',
      'Modellazione e visualizzazione 3D',
    ],
    image: architettura,
    imageAlt: 'Pianta arredata di una villa a Castana con distribuzione degli ambienti',
  },
  {
    id: 'interior-design',
    number: '02',
    eyebrow: '02 / Interior Design',
    title: 'Interior Design',
    short: 'Materiali, colori, finiture e illuminazione.',
    description:
      'Progettiamo ambienti che rispecchiano lo stile e la personalità di chi li vive, attraverso un’attenta selezione di materiali, colori, finiture e illuminazione.',
    items: [
      'Concept e moodboard',
      'Studio degli stili e delle palette cromatiche',
      'Selezione di materiali e rivestimenti',
      'Progettazione di arredi su misura',
      'Studio dell’illuminazione',
      'Selezione di complementi e accessori',
    ],
    image: interior,
    imageAlt: 'Render della zona living di un appartamento a Milano con parete in mattoni e libreria metallica',
  },
  {
    id: 'ristrutturazioni',
    number: '03',
    eyebrow: '03 / Ristrutturazioni',
    title: 'Ristrutturazioni',
    short: 'Il coordinamento delle fasi operative.',
    description:
      'Seguiamo il processo di trasformazione degli ambienti, coordinando le diverse fasi operative per garantire coerenza tra progetto, tempi e risultato finale.',
    items: [
      'Studio preliminare dell’intervento',
      'Sviluppo del progetto di ristrutturazione',
      'Computo e analisi dei costi',
      'Selezione di materiali e fornitori',
      'Coordinamento delle lavorazioni e delle maestranze',
      'Assistenza e supervisione durante le fasi di realizzazione',
    ],
    image: ristrutturazioni,
    imageAlt: 'Zona giorno ristrutturata con parete in listelli di mattone e camino',
  },
  {
    id: 'arredamento',
    number: '04',
    eyebrow: '04 / Soluzioni chiavi in mano',
    title: 'Arredamento e soluzioni chiavi in mano',
    shortTitle: 'Arredamento',
    short: 'Selezione e fornitura di arredi, fino al progetto finito.',
    description:
      'Diamo continuità al progetto attraverso la selezione e la fornitura di arredi, collaborando con brand e aziende specializzate nel settore dell’arredamento e del design.',
    items: [
      'Consulenza per la scelta degli arredi',
      'Selezione di brand e fornitori',
      'Proposte d’arredo personalizzate',
      'Ricerca e fornitura di mobili e complementi',
      'Coordinamento delle consegne e del montaggio',
      'Gestione integrata del progetto fino alla realizzazione finale',
    ],
    image: arredamento,
    imageAlt: 'Render di un soggiorno arredato con divano, tappeto e libreria a mensole',
  },
] as const;
