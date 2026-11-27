---
title: Preventivatore — flusso e bozze dei questionari
stato: flusso DECISO; domande APPROVATE dall'utente (T-08.1), da validare con Sandra
ultimo_aggiornamento: 2026-11-27
---

# Preventivatore

## Regole decise

| ID | Regola | Riferimento |
| --- | --- | --- |
| REQ-PREV-1 | Due percorsi a questionario: **Chiavi in mano** e **Solo progetto** | Brief |
| REQ-PREV-2 | Nella V.0 **nessun percorso mostra un prezzo**. La stima automatica del Chiavi in mano è una possibile evoluzione futura (servono le tariffe di Sandra) | D-004 |
| REQ-PREV-3 | Allegati facoltativi: planimetria, foto dello stato attuale, immagini di ispirazione. Max 5 file, 20 MB in tutto, formati JPG, PNG, HEIC, WebP, PDF. La copia all'utente elenca solo i nomi dei file | D-006, D-015 |
| REQ-PREV-4 | Dopo l'invio: Sandra riceve un'email con tutte le risposte e gli allegati; l'utente riceve una copia di riepilogo e conferma | D-009 |
| REQ-PREV-5 | L'email a Sandra è nella **lingua in cui l'utente ha compilato il form** | D-014 |
| REQ-PREV-6 | Tempi di risposta promessi all'utente nell'email di conferma: RIMANDATO | D-017 |
| REQ-PREV-7 | La pagina spiega la differenza: Chiavi in mano segue tutto, dal progetto alla realizzazione; Solo progetto resta in digitale | — |
| REQ-PREV-8 | Esperienza "Scheda progetto": capitoli, una schermata alla volta, scelte visive, scheda del progetto che si compone e si modifica, riepilogo prima dell'invio, accessibile e con "riduci movimento" | D-095 |
| REQ-PREV-9 | Moodboard in tutti e due i percorsi: atmosfere, colori, materiali e reference del visitatore (link e immagini) | D-099 |

## Flusso

```
Preventivatore (scelta del percorso)
   ├── Chiavi in mano (15 domande, nessun prezzo) ──┐
   └── Solo progetto  (7 schermate, brief) ──────────┤
                                                    ▼
                                    Invio (con allegati facoltativi)
                                       ├──► Email a Sandra: risposte + allegati, nella lingua dell'utente
                                       └──► Copia all'utente: riepilogo + conferma
                                                    ▼
                                     Sandra ricontatta il cliente
```

## Stato delle domande

Le domande sotto sono state **riviste con l'utente in T-08.1** (D-095 → D-101). Prossimo passo: le valida Sandra come PO (D-019). Le risposte segnate con * sono obbligatorie.

## Testi della pagina di scelta

Fonte: sezione "6. PREVENTIVATORE ONLINE" del file "SITO WEB (1).docx" (D-096). Titolo "Il tuo progetto inizia da qui." Al posto della "prima stima dei costi" la pagina promette una **proposta su misura preparata da Sandra**: nessuna cifra (D-004).

## Moodboard (comune ai due percorsi, D-099)

| Elemento | Risposta |
| --- | --- |
| Atmosfere | Card con immagine, scelta multipla: calda e accogliente, luminosa e minimale, elegante e classica, naturale, industriale, contemporanea (immagini di esempio, D-101) |
| Colori che ami | Tavolozza di 8 campioni, scelta multipla |
| Colori da evitare | Testo breve |
| Materiali | Chip, scelta multipla: legno, pietra, mattone, metallo, tessuti naturali, resina |
| Le tue reference | Link (Pinterest, Instagram, altri siti) e immagini caricate; i file contano nei limiti di D-015 |

Tutto il moodboard è facoltativo.

## Questionario Chiavi in mano (D-097)

Scopo: raccogliere i dati di un intervento completo, dal progetto alla realizzazione. 15 domande in 4 capitoli, poi il riepilogo.

| Capitolo | # | Domanda | Risposta |
| --- | --- | --- | --- |
| 1 · L'immobile | 1* | Che tipo di immobile è? | Card con icona: appartamento, casa o villa, ufficio, negozio o locale, altro |
| | 2* | Dove si trova? | Testo: città (o Paese) |
| | 3* | Quanti mq circa? | Numero |
| | 4* | L'immobile è già tuo? | Sì, in acquisto, sto valutando |
| 2 · L'intervento | 5* | Che tipo di intervento immagini? | Card: ristrutturazione completa, parziale, solo arredo |
| | 6* | Quali ambienti sono coinvolti? | Multipla con icone: cucina, soggiorno, camere, bagni, studio, esterni, tutto |
| | 7 | Ci sono lavori sugli impianti? | Multipla: elettrico, idraulico, riscaldamento o clima, nessuno, non so |
| | 8* | Serve anche la fornitura degli arredi? | Sì, in parte, no |
| 3 · Gusti e tempi | 9 | Moodboard | Vedi sopra |
| | 10 | Quale budget complessivo hai in mente? | Fino a 30.000 €, 30.000–60.000 €, 60.000–100.000 €, oltre 100.000 €, preferisco parlarne (D-100) |
| | 11* | Entro quando vorresti finire? | Entro 6 mesi, 6–12 mesi, oltre, nessuna fretta |
| 4 · Tu e il progetto | 12 | Vuoi aggiungere altro? | Testo libero |
| | 13 | Allegati | Planimetria, foto dello stato attuale, ispirazioni (D-015) |
| | 14* | I tuoi dati | Nome*, email*, telefono, contatto preferito* (email, telefono, WhatsApp); telefono obbligatorio se il contatto preferito è telefono o WhatsApp |
| | 15* | Privacy | Consenso al trattamento dei dati |
| Riepilogo | — | Scheda completa, ogni voce modificabile | — |

## Questionario Solo progetto (D-098)

Scopo: capire a fondo i desideri di chi vuole solo il progetto digitale (render, piante, scelta di arredi e materiali) e poi far realizzare i lavori per conto suo. Un brief con moodboard: 7 schermate in 4 capitoli, 4 sole risposte obbligatorie.

| Capitolo | Schermata | Contenuto |
| --- | --- | --- |
| 1 · Lo spazio | 1 | Che tipo di spazio è?* (card: casa, ufficio, negozio o locale, altro) e quanti mq circa (numero) |
| | 2 | Quali ambienti vuoi progettare?* (multipla con icone: cucina, soggiorno, camere, bagni, studio, esterni, tutto) |
| 2 · Le esigenze | 3 | Cosa ti serve? (multipla: nuova distribuzione, render 3D, scelta arredi, materiali e colori, illuminazione) e chi vive lo spazio (contatori adulti e bambini, animali sì o no) |
| | 4 | Raccontami il tuo spazio: un testo libero con spunti cliccabili (lavoro da casa, cucino spesso, ricevo ospiti, cosa non funziona oggi, cosa non può mancare, arredi da tenere) |
| 3 · Il tuo moodboard | 5 | Moodboard (vedi sopra) |
| 4 · Tempi e contatti | 6 | Quando vorresti avere il progetto?* (entro 1 mese, 1–3 mesi, nessuna fretta); budget per lavori e arredi (fino a 20.000 €, 20.000–50.000 €, 50.000–100.000 €, oltre 100.000 €, preferisco parlarne, D-100); allegati: planimetria e foto dello stato attuale |
| | 7 | I tuoi dati* e privacy*, come nel Chiavi in mano |
| Riepilogo | — | Scheda completa, ogni voce modificabile |

## Nel codice (D-103)

- Pagina: `src/pages/[lang]/[quote]/index.astro`; ancore `#turnkey` (Chiavi in mano) e `#design` (Solo progetto).
- Domande: `src/lib/quote.ts`; testi IT/EN/ES: `src/i18n/quote/` (EN ed ES tradotti dall'AI, da rivedere secondo D-007).
- Invio: `src/lib/quote-submit.ts` manda un `multipart/form-data` all'endpoint di T-05.3 (`PUBLIC_QUOTE_ENDPOINT`). Campi: `path`, `locale`, una voce per risposta (ripetuta per le scelte multiple e i link `referenceLinks`), `privacy=accepted`, file in `attachments` e `referenceFiles`. Senza endpoint non parte nulla e la conferma mostra "Anteprima del sito".
