# afdeling.ai — Website

Hugo statische site voor afdeling.ai — "De AI Afdeling voor MKB". Rebranding van afdeling-ict.nl.

## Tech stack

- **Generator:** Hugo (statische site, Markdown-content, output naar `public/`)
- **Hosting:** Cloudflare Pages
- **Repository:** GitHub — organisatie `afdeling-ict`, repo `afdeling.ai`
- **Deploy:** automatisch bij elke push naar `main`
- **Domein:** `afdeling.ai` — koppelen via Cloudflare Custom Domains

## Lokaal draaien

```bash
hugo server -D
# → http://localhost:1313
```

## Bouwen voor productie

```bash
hugo
# Output in /public/
```

---

## Sitemap & URL-structuur

| URL | Pagina | Type |
|---|---|---|
| `/` | Homepage | index.html |
| `/lisa` | Lisa — AI Offertespecialist | product |
| `/thomas` | Thomas — AI Klantenservice | product |
| `/sarah` | Sarah — AI Social Media Manager | product |
| `/blog` | Blog overzicht | blog list |
| `/blog/[slug]` | Blog post | blog single |
| `/over` | Over afdeling.ai | over |
| `/contact` | Contact & kennismakingsgesprek | contact |
| `/privacy` | Privacybeleid | default single |
| `/voorwaarden` | Algemene voorwaarden | default single |

---

## Bestandsstructuur

```
afdeling.ai/
├── config.toml                         # Hugo config
├── content/
│   ├── _index.md                       # Homepage content
│   ├── lisa.md                         # Lisa productpagina (type: product)
│   ├── thomas.md                       # Thomas productpagina (type: product)
│   ├── sarah.md                        # Sarah productpagina (type: product)
│   ├── over.md                         # Over-pagina (type: over)
│   ├── contact.md                      # Contactpagina (type: contact)
│   ├── privacy.md                      # Privacybeleid
│   ├── voorwaarden.md                  # Algemene voorwaarden
│   └── blog/
│       ├── _index.md
│       └── waarom-snelheid-wint-bij-offertes.md
├── layouts/
│   ├── index.html                      # Homepage template
│   ├── _default/
│   │   ├── baseof.html                 # HTML wrapper
│   │   ├── single.html                 # Fallback single (incl. product routing)
│   │   └── list.html                   # Fallback list
│   ├── blog/
│   │   ├── list.html                   # Blog overzicht
│   │   └── single.html                 # Blog post
│   ├── over/
│   │   └── single.html                 # Over-pagina template
│   ├── contact/
│   │   └── single.html                 # Contact template + formulier
│   └── partials/
│       ├── head.html                   # <head> incl. alle Schema.org JSON-LD
│       ├── nav.html                    # Navigatie
│       ├── footer.html                 # Footer
│       ├── product-page.html           # Gedeeld template voor Lisa/Thomas/Sarah
│       └── geo-quickanswer.html        # GEO quick-answer blok (boven de fold)
└── static/
    ├── css/main.css
    ├── js/main.js
    ├── img/
    │   ├── favicon.svg
    │   └── social-preview.png          # Aanmaken: 1200×630px OG/Twitter Card
    ├── _headers                        # Cloudflare Pages security headers
    ├── robots.txt                      # Crawler-instructies incl. 14 AI-bots
    ├── llms.txt                        # LLM/AI-crawler optimization (spec-conform)
    └── llms-full.txt                   # Uitgebreide LLM-documentatie
```

---

## Design

- **Stijl:** Basecamp / Statamic / Fizzy geïnspireerd — bold typografie, clean layouts, persoonlijkheid in copy
- **Fonts:** Plus Jakarta Sans (display + body) + DM Mono (labels, prijzen, timestamps)
- **Kleurenpalet:** `#FAFAF7` achtergrond, `#0D0D0D` tekst, `#717171` muted, `#E6E3DC` lijnen
- **Highlighter accents:** geel `#FFE566`, groen `#B8F5A0`, roze `#FFB3D9`, blauw `#A8DCFF`, oranje `#FFC89A`
- **Cursor:** default
- **Animaties:** fadeUp bij scroll via IntersectionObserver
- **Nav:** fixed, blur-on-scroll na 20px

---

## SEO / GEO / LLM / AI-crawler optimalisatie

### Schema.org JSON-LD (triple stack)

| Pagina | Schema types |
|---|---|
| Homepage | `WebSite` + `SearchAction` + `Organization` + `OfferCatalog` + `ItemList` + `FAQPage` |
| Lisa / Thomas / Sarah | `SoftwareApplication` + `Service` + `BreadcrumbList` |
| Blog post | `Article` + `BreadcrumbList` |
| Blog overzicht | `CollectionPage` + `BreadcrumbList` |
| Over | `Person` + `BreadcrumbList` |
| Contact | `ContactPage` + `BreadcrumbList` |
| Privacy / Voorwaarden | `WebPage` + `BreadcrumbList` |

### GEO Quick-Answer blokken
Alle productpagina's hebben een `quickanswer` veld in de front matter. Dit wordt boven de fold gerenderd via `geo-quickanswer.html` — fact-dense, gestructureerd voor directe extractie door LLMs.

### LLM-bestanden
- `llms.txt` — conform de officiële [llmstxt.org](https://llmstxt.org/) spec
- `llms-full.txt` — uitgebreide documentatie (prijzen, FAQ, onboarding, juridisch)

### AI-crawlers (robots.txt)
14 bots expliciet toegestaan: Googlebot, Google-Extended, anthropic-ai, ClaudeBot, GPTBot, ChatGPT-User, OAI-SearchBot, PerplexityBot, Meta-ExternalAgent, Applebot, Applebot-Extended, Amazonbot, cohere-ai, YouBot, CCBot, Bytespider, Diffbot.

### Overig
- Canonical URL op alle pagina's
- hreflang `nl` + `x-default`
- Open Graph + Twitter Card (incl. `og:image` — zie TODO hieronder)
- Hugo genereert automatisch `/sitemap.xml`

---

## Deploy naar Cloudflare Pages

1. Push naar GitHub: `git push origin main`
2. Cloudflare Pages bouwt automatisch

**Build settings:**
```
Build command:          hugo
Build output directory: public
Environment variable:   HUGO_VERSION = 0.128.2
```

---

## Nieuwe blog post toevoegen

```markdown
---
title: "Titel van de post"
description: "Korte beschrijving (ook voor meta en OG)"
date: 2025-04-01
emoji: "🚀"
category: "AI"
---

Post inhoud hier in Markdown.
```

Bestand aanmaken in `content/blog/[slug].md` → Hugo pikt het automatisch op.

---

## Contactformulier

Het contactformulier in `layouts/contact/single.html` gebruikt [Formspree](https://formspree.io). Vervang de placeholder:

```html
<form action="https://formspree.io/f/JOUW_FORM_ID" method="POST">
```

Gratis account op formspree.io → nieuw formulier → ID kopiëren.

---

## Openstaande taken

- [ ] `static/img/social-preview.png` aanmaken (1200×630px) voor Open Graph / Twitter Card
- [ ] Formspree form-ID invullen in `layouts/contact/single.html`
- [ ] KvK-nummer toevoegen aan `content/over.md` en Schema.org in `head.html`
- [ ] Google Search Console koppelen na live gaan
- [ ] Plausible Analytics snippet toevoegen in `layouts/partials/head.html`

---

## Werkwijze

Wijzigingen → GitHub Desktop → committen → pushen → Cloudflare bouwt automatisch.
