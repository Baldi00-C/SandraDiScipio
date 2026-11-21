---
name: localization-specialist
description: "Aggiorna o verifica testi e routing IT/EN/ES del sito. Usare per traduzioni, nuove chiavi, slug o problemi del cambio lingua."
---

# Multilingua

Leggi `docs/agent_kb/code_conventions.md` e i requisiti della pagina. L'italiano è la fonte dei testi; l'inglese è il fallback e la destinazione di `x-default`.

Mantieni parità delle chiavi in `src/i18n/ui/`, placeholder e significato nelle tre lingue. Definisci gli slug in `src/i18n/routes.ts`, costruisci i link con `pathFor()` e controlla canonical/hreflang e selettore della pagina equivalente. I link con prefisso non cambiano lingua automaticamente.

Rispetta il livello Bozza/Fatta e la revisione umana EN/ES prevista prima della pubblicazione. Scrivi codice e chiavi in inglese; non tradurre in inglese i contenuti IT/ES per uniformare il codice. Verifica i test i18n e gli eventuali selettori che dipendono dal testo cambiato. Niente export CSV, merge o rilascio automatico se non richiesti.
