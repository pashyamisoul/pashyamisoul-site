# PashyamiSoul Site: handover (2026-11-21)

Written for whoever holds this next, on the assumption they have never seen
the project. It is a static personal site — no build step, no framework,
no server code beyond one Vercel function.

## What it is

Personal identity and portfolio site for **Amith Rajolkar**
(github.com/pashyamisoul). Two pages:

- **`index.html`** — bio landing page: photo, typing-effect tagline, social
  links, theme toggle. No nav.
- **`portfolio.html`** — full portfolio: nav, hero, about, experience
  timeline, skills, education, contact, footer.

Styling is a single hand-written stylesheet (`css/style.css`) using CSS
variables with a light/dark theme (`body.dark-mode`, toggled by
`js/theme.js`, persisted in localStorage). Fonts: Cormorant Garamond
(display) + DM Sans (body) from Google Fonts.

## Live resources

| Thing | Value |
| --- | --- |
| Live site | https://pashyamisoul-site.vercel.app |
| Repo | https://github.com/pashyamisoul/pashyamisoul-site (public GitHub account `pashyamisoul`) |
| Hosting | Vercel, auto-deploys on push to `main`; typically live within ~1 minute |
| Serverless | `api/cv.js` (protected CV endpoint) |
| Resume file | `resume/Amith-Rajolkar-Resume.pdf` |

Deploy flow: commit to `main`, push, done. There is no staging environment.

## Brand & logo (added 2026-11-21)

The site logo is the **Pushya nakshatra lotus mark**: a lotus on water
beneath three stars, with a golden bindu at the flower's heart. "Pashyami"
(पश्यामि) is Sanskrit for "I see"; Pushya is the nakshatra of nourishment.
The mark was designed on a Claude design canvas (two concepts, lockups,
monogram, app icon, favicon scales):
https://claude.ai/artifact/Ac17kAt5Ee5AhscSCKRFHA (private to Amith's
Claude account).

Where the logo lives in the code:

- **`images/logo-mark.svg`** — standalone mark, light backgrounds
  (ink `#1C1C1E` strokes, accent `#8B7355` gold).
- **`images/logo-mark-dark.svg`** — standalone mark, dark backgrounds
  (cream `#f5f1eb` strokes, `#C4A882` gold).
- **`images/favicon.svg`** — ink rounded tile with cream lotus; linked from
  both pages' `<head>`. Deliberately has no stars (unreadable at 16–24px).
- **`portfolio.html` nav** — the mark is **inlined SVG**, not an `<img>`,
  so its colors use CSS variables (`--ink`, `--accent`, `--bg-primary`) and
  flip automatically with the theme. Sized by `.nav-mark` (32px tall).
- **`portfolio.html` footer** — smaller inline copy next to
  "PashyamiSoul · Amith Rajolkar", muted (`--ink-muted`,
  `--bg-secondary` petal fills), sized by `.footer-mark` (20px).
- **CSS** — `.nav-logo` / `.footer-logo` are inline-flex with a gap; the
  wordmark text is wrapped in `.nav-logo-text` because bare text nodes in a
  flex container get split by the gap (that bug shipped briefly and was
  fixed the same day).

If you edit the mark: the petal paths carry background-colored fills so the
flower occludes the water behind it — keep those fills in sync with the
background the mark sits on.

Relevant commits: `dbc3db0` (nav logo, favicon, SVG assets), `964cc95`
(footer mark).

## Analytics & traffic (checked 2026-10-16)

- **Vercel Web Analytics is enabled** on the project. There is no analytics
  snippet in the repo code — Vercel injects the tracker automatically into
  deployed pages, so don't go looking for a `<script>` to maintain.
- Hobby-plan limits: 30 days of viewable history, 50,000 events/month,
  no custom events (those are Pro features).
- As of 2026-10-16, the trailing 30 days showed **1 visitor / 1 page view**
  (Germany, Mac desktop — almost certainly Amith himself). The site works
  but has effectively no outside traffic; the levers are discoverability,
  not code: link it from LinkedIn/GitHub/resume, consider a custom domain
  and SEO/meta tags.
- Dashboard: Vercel → `amith-rajolkar-s-projects` → `pashyamisoul-site`
  → Analytics.

## Title wording (2026-11-10)

The job title on the site is **"IT Engineer" / "Senior IT Engineer"** —
never "IT Support Engineer". Renamed site-wide in commit `6d1fd22`
(hero eyebrow, experience-card role, and about paragraph in
`portfolio.html`; `index.html` already used "IT Engineer"). The untracked
`mockups/ghibli-portfolio.html` was fixed locally too, and the resume PDF
was checked — it contains no "Support Engineer". Keep new copy consistent
with this.

## Hobby Projects section (2026-11-21)

`portfolio.html` now has a "Hobby Projects" section (`id="projects"`)
between Education and Contact, plus a "Projects" nav link. Three cards:

| Card | Live link | Repo |
| --- | --- | --- |
| Shivani & Aniruddh (wedding site) | https://shivani-aniruddh-wedding.vercel.app | private |
| Akshay & Aishwarya (wedding site) | https://akshayaishwaryawedding.vercel.app | private |
| TailorBack (ATS resume/cover-letter builder) | https://tailorback.com | github.com/pashyamisoul/tailorback |
| FirstLink (laptop store, Bengaluru) | https://firstlink.in | github.com/pashyamisoul/firstlink-website |
| Srimanasa (financial services rebuild) | not deployed yet; srimanasa.in still runs the original site, so the card links to GitHub only | github.com/pashyamisoul/srimanasa-rebuild |

FirstLink and Srimanasa were added on 2026-11-21 after a scan of the
pashyamisoul GitHub account. Other public repos (keyfob-kiosk, the
Google Calendar guidelines add-on) were considered and left off the
site for now. If the Srimanasa rebuild gets deployed (GitHub Pages or
Vercel), add a Visit Site link back to its card.

Implementation notes:

- Card markup uses new CSS classes in `css/style.css`: `.projects-grid`,
  `.project-card`, `.project-type`, `.project-name`, `.project-desc`,
  `.project-links`; tag pills reuse the existing `.core-pill`.
- Colors come from CSS variables, so the cards theme correctly in dark
  mode with no extra rules.
- Adding a sixth nav link made the menu overlap the logo at tablet
  widths; a media query (769px to 1120px) tightens nav padding and lets
  the links wrap. Keep it in mind if more nav items are added.
- Relevant commits: `57d1e12` (section), `a3e316b` (TailorBack live link).

## Copy style rule

Amith does not want em dashes in any copy, docs, or commit messages
written for him. Use commas, colons, or periods instead. (This file
predates the rule in places; new text must follow it.)

## Local development

No tooling required. Serve statically from the repo root, e.g.:

```bash
python3 -m http.server 8787
```

(`api/cv.js` only works on Vercel; everything else works statically.)

## Open items

- `index.html` (bio page) has the favicon but no visible logo — the mark
  could be added above the name if wanted.
- `mockups/` (design explorations), `.claude/` (local launch config) and
  `.DS_Store` files are untracked — deliberately, per Amith (2026-07-23);
  don't commit them. A `.gitignore` for `.DS_Store` would still be tidy.
- Traffic is near zero (see Analytics section); discoverability work
  (profile links, custom domain, SEO meta tags) is the open lever.
- `README.md` describes the project history; this file is the operational
  handover.
