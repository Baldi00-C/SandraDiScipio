---
title: Preventivatore — flusso e bozze dei questionari
stato: flusso DECISO; domande in BOZZA
ultimo_aggiornamento: 2026-11-21
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

## Flusso

```
Preventivatore (scelta del percorso)
   ├── Chiavi in mano (15 domande, nessun prezzo) ──┐
   └── Solo progetto  (4 passaggi, 18 domande) ─────┤
                                                    ▼
                                    Invio (con allegati facoltativi)
                                       ├──► Email a Sandra: risposte + allegati, nella lingua dell'utente
                                       └──► Copia all'utente: riepilogo + conferma
                                                    ▼
                                     Sandra ricontatta il cliente
```

## Stato delle domande

Le domande sotto sono una **BOZZA scritta dall'AI**. Processo deciso (→ D-005, D-019):
1. Si rivedono insieme all'utente **quando si sviluppano i questionari** (non prima).
2. Poi le valida Sandra come PO.

Non considerarle definitive e non riscriverle di tua iniziativa prima di quella fase.

## Bozza — Questionario Chiavi in mano

Scopo: raccogliere i dati di un intervento completo, dal progetto alla realizzazione.

| # | Domanda | Tipo di risposta | Obbligatoria |
| --- | --- | --- | --- |
| 1 | Che tipo di immobile è? | Scelta singola: appartamento, casa indipendente o villa, ufficio, negozio o locale, altro | Sì |
| 2 | Dove si trova? | Testo: città e provincia (o Paese) | Sì |
| 3 | Quanti mq circa? | Numero | Sì |
| 4 | L'immobile è già tuo? | Scelta singola: sì, in acquisto, sto valutando | Sì |
| 5 | Che tipo di intervento immagini? | Scelta singola: ristrutturazione completa, parziale, solo arredo | Sì |
| 6 | Quali ambienti sono coinvolti? | Scelta multipla: cucina, soggiorno, camere, bagni, esterni, tutto | Sì |
| 7 | Ci sono lavori impiantistici da fare? | Scelta multipla: elettrico, idraulico, riscaldamento o clima, non so | No |
| 8 | Serve anche la fornitura degli arredi? | Scelta singola: sì, in parte, no | Sì |
| 9 | Quale budget complessivo hai in mente? | Fasce di prezzo + "preferisco parlarne" | No |
| 10 | Entro quando vorresti finire? | Scelta singola: entro 6 mesi, 6–12 mesi, oltre, nessuna fretta | Sì |
| 11 | Che stile ti piace? | Scelta multipla con immagini: moderno, classico, industriale, naturale, minimal | No |
| 12 | Vuoi aggiungere altro? | Testo libero | No |
| 13 | Allegati | File: planimetria, foto dello stato attuale, ispirazioni (immagini o PDF) | No |
| 14 | I tuoi dati | Nome, email, telefono, contatto preferito (email, telefono, WhatsApp) | Sì |
| 15 | Privacy | Consenso al trattamento dei dati | Sì |

## Bozza — Questionario Solo progetto

Scopo: capire a fondo i desideri di chi vuole solo il progetto digitale (render, piante, scelta di arredi e materiali) e poi far realizzare i lavori per conto suo. Diviso in 4 passaggi.

### Passaggio 1 — Lo spazio

| # | Domanda | Tipo di risposta | Obbligatoria |
| --- | --- | --- | --- |
| 1 | Che tipo di spazio è? | Scelta singola: casa, ufficio, negozio o locale, altro | Sì |
| 2 | Quanti mq circa? | Numero | Sì |
| 3 | Quali ambienti vuoi progettare? | Scelta multipla: cucina, soggiorno, camere, bagni, studio, esterni, tutto | Sì |
| 4 | Cosa ti serve? | Scelta multipla: nuova distribuzione, render 3D, scelta arredi, materiali e colori, illuminazione | Sì |

### Passaggio 2 — Chi lo vive

| # | Domanda | Tipo di risposta | Obbligatoria |
| --- | --- | --- | --- |
| 5 | Chi vive o usa lo spazio? | Numero di persone, età dei bambini, animali | Sì |
| 6 | Come passi le giornate in casa? | Scelta multipla: lavoro da casa, cucino spesso, ricevo ospiti, leggo, guardo film, sport | No |
| 7 | Cosa non funziona oggi? | Testo libero | No |
| 8 | Cosa non può mancare? | Testo libero (es. cabina armadio, isola in cucina) | No |
| 9 | Ci sono arredi o oggetti da tenere? | Testo libero o foto | No |

### Passaggio 3 — Gusti

| # | Domanda | Tipo di risposta | Obbligatoria |
| --- | --- | --- | --- |
| 10 | Che atmosfera desideri? | Scelta con immagini: calda e accogliente, luminosa e minimale, elegante, naturale, industriale | Sì |
| 11 | Colori che ami e colori che eviti | Testo libero o tavolozza | No |
| 12 | Materiali preferiti | Scelta multipla: legno, pietra, mattone, metallo, tessuti naturali, resina | No |
| 13 | Hai immagini di ispirazione? | Link (Pinterest, Instagram) o allegati | No |

### Passaggio 4 — Tempi, budget, contatti

| # | Domanda | Tipo di risposta | Obbligatoria |
| --- | --- | --- | --- |
| 14 | Budget previsto per lavori e arredi | Fasce di prezzo + "preferisco parlarne" | No |
| 15 | Quando vorresti avere il progetto? | Scelta singola: entro 1 mese, 1–3 mesi, nessuna fretta | Sì |
| 16 | Allegati | File: planimetria, foto dello stato attuale (immagini o PDF) | No |
| 17 | I tuoi dati | Nome, email, telefono, contatto preferito | Sì |
| 18 | Privacy | Consenso al trattamento dei dati | Sì |
