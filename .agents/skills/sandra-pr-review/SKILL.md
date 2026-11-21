---
name: sandra-pr-review
description: "Review leggera di una PR o del diff di un branch: individua bug, regressioni e incongruenze concrete. Usare prima della PR o quando viene chiesta una review."
---

# Review mirata

Leggi `AGENTS.md` e `docs/agent_kb/verification_and_prs.md`. Determina base e head effettivi; esamina prima elenco dei file e dimensione del diff, poi le parti cambiate. Per lavoro non committato includi anche file nuovi e modifiche locali.

## Costo e contesto

- Una sola passata di un solo revisore; niente agenti paralleli, confronti multi-modello o cicli automatici di convergenza.
- Se il runtime consente di scegliere il modello prima dell'avvio, preferisci un modello semplice ed economico con ragionamento basso. La skill non cambia da sola il modello: se la selezione non è disponibile, usa quello corrente senza dichiarare risparmi non misurati.
- Carica solo diff, istruzioni pertinenti e il minimo codice chiamante necessario a verificare un sospetto. Non rileggere l'intero repository o i progetti di origine delle convenzioni.
- Riusa gli esiti dei controlli sullo stesso head. Esegui solo una verifica mirata se serve a confermare un problema; non ripetere tutta la suite per formalità.
- Per modifiche ampie concentra l'attenzione sui comportamenti cambiati e segnala il perimetro non esaminato. Un audit più esteso richiede una richiesta esplicita; niente escalation automatica a modelli più costosi.

## Cosa verificare

Cerca bug riproducibili, regressioni, input non validati, uso incoerente di tipi/traduzioni/token e test mancanti sul comportamento modificato. Per sola documentazione controlla accuratezza e collegamenti; per formattazione evita commenti su stile già imposto da Prettier. Non richiedere rifattorizzazioni speculative.

Restituisci al massimo cinque rilievi concreti ordinati per impatto, ciascuno con file/riga, scenario, conseguenza e correzione minima; se ci sono altri difetti bloccanti, segnalali senza nasconderli per rispettare il limite. Se non emergono problemi, dichiaralo insieme al perimetro e alle lacune. Distingui auto-review e review indipendente. La review non pubblica commenti, non approva e non unisce la PR senza una richiesta pertinente dell'utente.
