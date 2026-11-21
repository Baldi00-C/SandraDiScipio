---
name: sandra-design-tokens-sync
description: "Allinea token Tailwind e storie del design system alle modifiche Figma. Usare quando cambia la guida di stile o viene richiesto un confronto design-codice."
---

# Allineamento dei token

Leggi D-055 in `docs/04-decisioni.md` e `docs/agent_kb/code_conventions.md`. Il file Figma è quello già registrato in D-048; verifica il bersaglio prima della lettura. Se il collegamento non è disponibile, dichiara il limite senza inventare valori.

Confronta solo le collezioni pertinenti con `src/styles/tokens.css`. Mantieni il mapping di primitivi, semantici Light/Dark, tipografia e motion. Aggiorna le storie interessate con gli stessi token. Una corrispondenza ambigua è una decisione da chiarire; non sostituire valori per somiglianza.

La sincronizzazione del sito è manuale: non dichiarare disponibili pipeline hash o controlli automatici del drift. Per cambi a tipografia, spaziature o breakpoint verifica il risultato nel sito a dimensioni mobile e desktop. Esegui `sandra-verify` e registra mapping e decisioni cambiati.
