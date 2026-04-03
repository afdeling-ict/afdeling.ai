# CLAUDE.md — afdeling.ai

Instructies voor Claude bij het werken aan dit project.

## Wat is dit project?

Hugo statische site voor **afdeling.ai** — "De AI Afdeling voor MKB". Rebranding van afdeling-ict.nl.

Het product: Nederlandse MKB-bedrijven huren AI-werknemers in als maandabonnement:
- **Lisa** (€297/mnd) — AI Offertespecialist
- **Thomas** (€497/mnd) — AI Klantenservice Assistent
- **Sarah** (€397/mnd) — AI Social Media Manager

**Eigenaar:** Farid Bouchdak (hallo@afdeling.ai) — ook eigenaar van faridbouchdak.com

---

## Tech stack & werkwijze

- **Generator:** Hugo (statisch, geen database, geen server-side rendering)
- **Taal:** Uitsluitend Nederlands (geen multilingual setup)
- **Deploy:** Cloudflare Pages — automatisch bij push naar `main`
- **Fonts:** Plus Jakarta Sans + DM Mono (via Google Fonts)
- **CSS:** Één bestand: `static/css/main.css` — geen preprocessors, geen build tools

Bij wijzigingen: bestand aanpassen → `git add` → `git commit` → `git push` → Cloudflare bouwt.

---

## Layout routing (hoe Hugo pagina's kiest)

| content type | Hugo zoekt naar |
|---|---|
| `type: product` (lisa, thomas, sarah) | `layouts/_default/single.html` → roept `partials/product-page.html` aan |
| `type: over` | `layouts/over/single.html` |
| `type: contact` | `layouts/contact/single.html` |
| `Section: blog`, single | `layouts/blog/single.html` |
| `Section: blog`, list | `layouts/blog/list.html` |
| Homepage | `layouts/index.html` |
| Overig (privacy, voorwaarden) | `layouts/_default/single.html` → slug-check |

---

## Productpagina's (Lisa / Thomas / Sarah)

Elke productpagina heeft uitgebreide front matter in het `.md` bestand. Verplichte velden:

```yaml
title: "Lisa"
description: "..."         # meta description + product hero subkop
type: "product"
productClass: "lisa"       # CSS klasse (lisa | thomas | sarah)
emoji: "📋"
role: "AI Offertespecialist"
firstName: "Lisa"          # gebruikt in CTA-teksten
price: "297"               # prijs zonder €-teken, zonder /maand
quickanswer: "..."         # GEO: fact-dense 2-3 zinnen, boven de fold
featuresHeading: "..."     # h2 boven features grid
featuresSub: "..."         # subtekst onder featuresHeading
features:                  # lijst van feature-items (icon, title, description)
  - icon: "📥"
    title: "..."
    description: "..."
visual: |                  # HTML-blok voor de rechterkolom in de hero
  <div ...>...</div>
```

---

## Schema.org / SEO / GEO

Alle structured data zit in `layouts/partials/head.html`. Per pagina-type is er een andere set JSON-LD blokken. **Nooit** structured data buiten `head.html` plaatsen.

GEO quick-answer blokken worden gerenderd via `layouts/partials/geo-quickanswer.html`. Dit blok leest `.Params.quickanswer` uit de front matter. Altijd boven de fold, altijd fact-dense (prijs, setup-tijd, kenmerken).

Bij het toevoegen van een nieuwe AI-werknemer: ook `quickanswer` front matter invullen, en de `ItemList` + `OfferCatalog` in `head.html` uitbreiden.

---

## Kleurconventies (CSS variabelen)

```css
--hl-yellow:   #FFE566   /* Lisa — offertes */
--hl-blue:     #A8DCFF   /* Thomas — klantenservice */
--hl-pink:     #FFB3D9   /* Sarah — social media */
--hl-green:    #B8F5A0   /* algemeen positief / how-it-works */
--hl-orange:   #FFC89A   /* secundair accent */
```

Highlighter-kleuren worden gebruikt als: tekstmarkering (`.hl` class), badge/tag achtergrond, product card hover-states, en product hero accent.

---

## Copy & tone of voice

- **Taal:** Nederlands, informeel maar professioneel ("jij/je", niet "u")
- **Stijl:** Direct, concreet, zonder jargon — zoals Basecamp
- **Cijfers eerst:** "€297/maand", "48 uur", "2 minuten" — altijd concreet
- **Geen buzzwords:** niet "innovatief", "toonaangevend", "state-of-the-art"
- **CTA's:** actiegericht — "Plan een gesprek →", "Meer over Lisa →"

---

## Wat NIET te doen

- Geen multilingual setup toevoegen — de site is en blijft Nederlandstalig
- Geen externe CSS frameworks (Tailwind, Bootstrap) — alles staat in `main.css`
- Geen JavaScript frameworks — vanilla JS in `static/js/main.js`
- Geen `.env` bestanden committen
- Geen `public/` map committen (dat is Hugo's build output)
- Geen Hugo template syntax (`{{ }}`) in `.md` content files — dat werkt niet

---

## Prijzen aanpassen

Prijzen staan op **één plek**: `data/producten.toml`. Dit bestand is de single source of truth.
Alle templates lezen hieruit via `site.Data.producten.lisa.prijs` (etc.). Na een wijziging volstaat één commit.

Uitzondering: de `quickanswer` front matter in productpagina's bevat soms een hardcoded prijs als proza — die handmatig bijwerken bij een prijswijziging.

---

## Bestanden die regelmatig worden bijgewerkt

| Bestand | Wanneer |
|---|---|
| `data/producten.toml` | **Prijswijziging** — dit is de enige plek |
| `content/blog/[slug].md` | Nieuwe blogpost |
| `static/llms.txt` + `static/llms-full.txt` | Bij nieuwe producten of belangrijke wijzigingen |
| `layouts/partials/head.html` | Bij nieuwe Schema.org types of SEO-verbeteringen |
| `static/robots.txt` | Bij nieuwe AI-crawlers |
| `static/css/main.css` | Designwijzigingen |

---

## Openstaande TODOs

- [x] `static/img/social-preview.png` aanmaken (1200×630px)
- [x] Formspree form-ID invullen in `layouts/contact/single.html` — `mjgpavyv`
- [x] KvK-nummer toevoegen aan over-pagina en Schema.org — `30221015`
- [ ] Plausible Analytics toevoegen in `head.html`
- [x] Google Search Console instellen na live gaan
