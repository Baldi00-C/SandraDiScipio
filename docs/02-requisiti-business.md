---
title: Requisiti business delle pagine (V.0)
stato: DECISO (con punti rimandati indicati)
ultimo_aggiornamento: 2026-11-21
---

# Requisiti business delle pagine

Convenzioni:
- Ogni requisito ha un ID stabile (`REQ-<AREA>-<n>`). Citalo nei commit, nei task e nelle discussioni.
- `RIMANDATO` = da decidere nella fase indicata; non inventare una soluzione, chiedi all'utente quando arrivi a quella fase.

## Mappa del sito

```
Home
├── Chi sono
├── Servizi
├── Progetti
│   ├── Non conclusi   (progetti universitari / accademici)
│   └── Conclusi       (progetti professionali: parte digitale + foto reali)
├── Preventivatore
│   ├── Chiavi in mano (dal progetto alla realizzazione)
│   └── Solo progetto  (resta in digitale)
└── Contatti

Su ogni pagina: selettore lingua IT / EN / ES, pulsante WhatsApp fisso.
Nel footer: privacy policy, cookie policy.
```

Menu principale, in quest'ordine: Home, Chi sono, Servizi, Progetti, Preventivatore, Contatti.

## Elementi globali

| ID | Requisito |
| --- | --- |
| REQ-GLOB-1 | Selettore della lingua (IT, EN, ES) visibile su ogni pagina |
| REQ-GLOB-2 | Pulsante WhatsApp fisso su ogni pagina |
| REQ-GLOB-3 | Footer con link a privacy policy e cookie policy |

## Home

Scopo: riassumere tutto il sito e portare il visitatore verso un preventivo o un contatto.

| ID | Requisito | Stato |
| --- | --- | --- |
| REQ-HOME-1 | Apertura con nome, ruolo e un'immagine forte di un progetto | DECISO |
| REQ-HOME-2 | Breve presentazione di Sandra con link a Chi sono | DECISO |
| REQ-HOME-3 | Progetti principali in evidenza, con link a Progetti | DECISO; **quali progetti** è RIMANDATO allo sviluppo della Home (→ D-012) |
| REQ-HOME-4 | Invito al preventivatore con le due strade: Chiavi in mano e Solo progetto | DECISO |
| REQ-HOME-5 | Contatti rapidi: WhatsApp, email, telefono | DECISO |
| REQ-HOME-6 | Elementi extra (Instagram, recensioni, iscrizione all'Ordine degli Architetti) | RIMANDATO allo sviluppo della Home (→ D-016) |

## Chi sono

| ID | Requisito | Stato |
| --- | --- | --- |
| REQ-CHI-1 | Foto di Sandra e testo di presentazione | DECISO |
| REQ-CHI-2 | Percorso di studi e professionale (studi, dove ha lavorato, lavori precedenti, la sua storia). Forma da definire nei mockup (es. timeline) | DECISO |
| REQ-CHI-3 | Invito finale a vedere i progetti o chiedere un preventivo | DECISO |
| REQ-CHI-4 | I contenuti testuali li fornisce l'utente in fase di sviluppo; nel design si usano segnaposto | DECISO (→ D-008) |

## Servizi

| ID | Requisito | Stato |
| --- | --- | --- |
| REQ-SERV-1 | Pagina a sé nel menu che spiega cosa offre Sandra e cosa include ogni servizio | DECISO (→ D-011) |
| REQ-SERV-2 | Ogni servizio porta al percorso giusto del preventivatore | DECISO |

## Progetti

| ID | Requisito | Stato |
| --- | --- | --- |
| REQ-PROG-1 | Due gruppi: **Non conclusi** (universitari/accademici) e **Conclusi** (professionali) | DECISO |
| REQ-PROG-2 | Scheda di un progetto non concluso: tavole, render, concept, breve descrizione, anno, corso | DECISO |
| REQ-PROG-3 | Scheda di un progetto concluso: **nella stessa scheda** prima la parte digitale (render, piante, concept), poi la parte interior (foto reali del lavoro finito) | DECISO (→ D-003) |
| REQ-PROG-4 | Confronti prima/dopo quando esistono le foto dello stato di partenza | DECISO |
| REQ-PROG-5 | Elenco e materiale dei progetti universitari forniti dall'utente in fase di sviluppo | RIMANDATO (→ D-013) |

Progetti professionali già presenti nel POC (materiale riusabile, in `src/content/projects/` e `src/assets/projects/`): Villa privata a Castana (Pavia, 2020), Appartamento ai Magazzini Bracchi (Milano, 2024, solo render), Sala VIP aeroporto di Caracas (Venezuela, 2019).

## Preventivatore

Vedi [03-preventivatore.md](03-preventivatore.md).

## Contatti

| ID | Requisito | Stato |
| --- | --- | --- |
| REQ-CONT-1 | WhatsApp: apre una chat con Sandra con un messaggio iniziale già scritto | DECISO |
| REQ-CONT-2 | Email: link che apre il programma di posta | DECISO |
| REQ-CONT-3 | Telefono: numero cliccabile da smartphone | DECISO |
| REQ-CONT-4 | Form: nome, email, telefono (facoltativo), oggetto, messaggio, consenso privacy | DECISO |
| REQ-CONT-5 | Dopo l'invio del form: email a Sandra + copia di conferma all'utente (stesso flusso dei questionari) | DECISO (→ D-009) |
| REQ-CONT-6 | Email e numero definitivi da confermare. Nel POC: `discipiosandra@gmail.com`, `+39 366 133 1176`. Indirizzo previsto sul sito: `info@sandradiscipio.com`, inoltrato alla Gmail (→ D-029) | APERTO |
