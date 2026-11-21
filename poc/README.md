# POC archiviato (solo riferimento)

Primo prototipo del sito: Astro 5 + Tailwind 4 + Resend + adapter Node. Archiviato con T-03.1 nel tag Git `poc` e in questa cartella (D-050).

**Non** è la base del sito V.0 (D-001). Non si compila, non si controlla e non si testa insieme al nuovo progetto. Alcune parti contraddicono i requisiti decisi, per esempio i prezzi dimostrativi del preventivatore (D-004) e l'adapter Node (D-026).

## Materiale riusabile

| Materiale | Percorso | Dove serve |
| --- | --- | --- |
| Foto dei progetti | `src/assets/projects/` | T-04.2 |
| Testi dei 3 progetti professionali | `src/content/projects/` | T-04.2 |
| Foto di Sandra | `src/assets/about/` | Chi sono |
| Loghi | `src/assets/brand/` | T-03.7 |
| Email e numero (da confermare, REQ-CONT-6) | `src/data/site.ts` | T-05.2 |

## Avviarlo in locale

Requisiti: Node.js ≥ 20.3. La chiave [Resend](https://resend.com) serve solo per provare il modulo contatti.

```bash
cd poc && npm install && cp .env.example .env && npm run dev
```
