---
name: sandra-feature-development
description: "Sviluppa feature e correggi bug del sito Astro, con test, storie Storybook pertinenti, verifiche e documentazione. Usare per implementare un requisito o un task della roadmap."
---

# Sviluppo di feature

Leggi `AGENTS.md`, l'indice `docs/README.md` e le sole note pertinenti di `docs/agent_kb/`. Verifica requisito, decisioni e dipendenze della roadmap prima di implementare. Se il task ha una issue, ricavane i criteri di accettazione; non inventarne una per ottenere un numero.

- Lavora nel checkout assegnato su un branch dedicato; preserva le modifiche preesistenti. Usa codice in inglese e documentazione in italiano.
- Implementa l'ambito richiesto con Astro, TypeScript e i token condivisi. Il POC è materiale di riferimento, non la base del sito.
- Scrivi o aggiorna test Vitest per il comportamento nuovo: caso riuscito, errori e limiti pertinenti. Un bug deve avere un test di regressione utile. Non creare test artificiali per sola formattazione o documentazione.
- Per componenti o stati visivi riusabili, aggiungi o aggiorna le storie in `src/stories/`: stato normale e varianti pertinenti, inclusi errore/disabilitato quando esistono. Qui Storybook rende HTML con gli stessi token; controlla anche il componente Astro reale per evitare divergenze. Una feature di sola logica non richiede una storia fittizia.
- Aggiorna testi IT/EN/ES e routing quando coinvolti, rispettando il livello Bozza/Fatta della roadmap. Non inventare contenuti personali.
- Esegui `sandra-verify`; per UI esegui anche `sandra-page-check`. Riusa i risultati già ottenuti sullo stesso stato dei file, senza ripetere controlli inutili. Playwright e axe sono ancora pianificati: dichiara la lacuna se manca il relativo strumento.
- Aggiorna documentazione, decisioni e stato del task quando cambiano. Prima della PR applica una sola review mirata con `sandra-pr-review`.

Consegna il risultato con verifiche e limiti. Quando la pubblicazione è autorizzata, prepara commit e PR verso `main`, con `Closes #n` solo per il task effettivo; lascia il merge all'utente. Non aggiungere dipendenze o servizi per attività future.
