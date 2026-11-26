---
title: Modo di lavorare con l'utente
stato: DECISO
ultimo_aggiornamento: 2026-11-26
---

# Modo di lavorare

Istruzioni operative per agenti AI che lavorano su questo progetto.

## Ruoli

| Chi | Ruolo |
| --- | --- |
| Utente (chi lavora con l'agente) | Decide insieme all'agente requisiti, design e sviluppo |
| Sandra Di Scipio | Proprietaria del sito e **PO**: interviene **dopo**, per validare (es. domande dei questionari). Non coinvolgerla nelle decisioni quotidiane e non attribuirle compiti senza che l'utente lo chieda |
| Agente AI | Propone, scrive bozze, fa domande, sviluppa |

## Regole di collaborazione

1. **Lingua**: rispondi sempre in italiano, domande comprese.
2. **Una domanda alla volta**: non fare liste di domande. Una domanda, con opzioni chiare e una raccomandata, poi la successiva.
3. **Prima il business, poi la tecnologia**: niente domande tecniche (stack, hosting, librerie, servizi email) finché i temi di business della fase corrente non sono chiusi.
4. **Rispetta i rinvii**: se in [04-decisioni.md](04-decisioni.md) un tema è `RIMANDATO` a una fase, non riproporlo prima di quella fase.
5. **Fasi in ordine**: requisiti business → mockup Figma → scelte tecniche → sviluppo, sezione per sezione. Il 2026-11-21 l'utente ha anticipato le scelte tecniche prima dei mockup (→ D-020).
6. **Non inventare contenuti personali di Sandra** (studi, esperienze, clienti, recensioni, numeri): usa segnaposto evidenti e chiedili all'utente in fase di sviluppo.
7. **Documenta**: ogni decisione nuova va in [04-decisioni.md](04-decisioni.md) e, se serve, nel file del requisito.

## Prossimo passo previsto

Segui [07-roadmap.md](07-roadmap.md). Lavora per task: ogni task è una issue su GitHub (sotto-issue di una storia, in una milestone) e si chiude con una sola PR (`Closes #n`), che aggiorna anche lo stato in [07-roadmap.md](07-roadmap.md) (D-047). T-01.1, T-02.1, T-02.2 e T-03.1 sono fatti: ora in parallelo T-02.3 e T-02.4 (elementi globali e componenti in Figma) e il setup tecnico (T-03.2 → T-03.6). Per lavorare su Figma serve il plugin Desktop Bridge aperto dall'utente nel file del sito (D-048).

Le revisioni di Sandra come PO non si pianificano: le gestisce l'utente (D-041).
