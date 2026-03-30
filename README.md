# afdeling.ai — Website

Hugo statische site voor afdeling.ai. Dezelfde stack als faridbouchdak.com.

## Tech stack
- **Generator:** Hugo (statische site)
- **Hosting:** Cloudflare Pages
- **Deploy:** Automatisch bij push naar `main`
- **Domein:** `afdeling.ai`

## Lokaal draaien

```bash
hugo server -D
```
Ga naar http://localhost:1313

## Bouwen

```bash
hugo
```
Output staat in `/public`.

## Sitemap

| URL | Pagina |
|---|---|
| `/` | Homepage |
| `/lisa` | Lisa — AI Offertespecialist |
| `/thomas` | Thomas — AI Klantenservice |
| `/sarah` | Sarah — AI Social Media Manager |
| `/blog` | Blog overzicht |
| `/blog/[slug]` | Blog post |
| `/over` | Over afdeling.ai |
| `/contact` | Contact |
| `/privacy` | Privacybeleid |
| `/voorwaarden` | Algemene voorwaarden |

## Deploy naar Cloudflare Pages

1. Push naar GitHub (org: `afdeling-ict`, repo: `afdeling.ai`)
2. Cloudflare Pages bouwt automatisch
3. Stel custom domain `afdeling.ai` in bij Cloudflare Pages

### Cloudflare Pages build settings:
- **Build command:** `hugo`
- **Build output directory:** `public`
- **Environment variable:** `HUGO_VERSION = 0.128.2`

## Nieuwe blog post toevoegen

Maak een bestand aan in `content/blog/[slug].md`:

```markdown
---
title: "Titel van de post"
description: "Korte beschrijving"
date: 2025-04-01
emoji: "🚀"
category: "AI"
---

Post inhoud hier.
```

## Design

- **Fonts:** Plus Jakarta Sans (display/body) + DM Mono (mono/labels)
- **Kleuren:** `#FAFAF7` achtergrond, `#0D0D0D` tekst
- **Highlighter accents:** geel `#FFE566`, groen `#B8F5A0`, roze `#FFB3D9`, blauw `#A8DCFF`
- **Design inspiratie:** Basecamp, Statamic, Fizzy

## Contactformulier

Het contactformulier gebruikt [Formspree](https://formspree.io). Vervang de placeholder URL in `layouts/contact/single.html`:

```html
<form action="https://formspree.io/f/JOUW_FORM_ID" method="POST">
```
