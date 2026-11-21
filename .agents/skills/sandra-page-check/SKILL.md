---
name: sandra-page-check
description: "Verifica una pagina o un componente visivo del sito su mobile e desktop, rispetto a Figma, lingue, accessibilità e SEO. Usare per UI nuove o modificate."
---

# Controllo della pagina

Leggi requisiti e decisioni della pagina e la nota `docs/agent_kb/project_context.md`. Usa l'anteprima locale o un URL effettivamente disponibile; le anteprime Cloudflare sono ancora da configurare.

Controlla a dimensioni mobile e desktop il comportamento cambiato: corrispondenza al mockup, overflow, navigazione da tastiera, focus, etichette, immagini, selettore lingua e CTA pertinenti. Per form controlla anche errori, conferma e stato durante l'invio senza inviare email reali. Controlla title, description, canonical e hreflang nelle lingue coinvolte.

Usa Playwright/axe se disponibili; se l'harness manca, esplicita ciò che hai controllato manualmente e ciò che resta da verificare. Storybook non sostituisce la pagina Astro. Per modifiche visive prepara immagini mobile/desktop quando lo strumento lo permette, senza commettere output generati o inventare verifiche non eseguite. Riporta solo problemi concreti e lacune pertinenti.
