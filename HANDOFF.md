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

## Local development

No tooling required. Serve statically from the repo root, e.g.:

```bash
python3 -m http.server 8787
```

(`api/cv.js` only works on Vercel; everything else works statically.)

## Open items

- `index.html` (bio page) has the favicon but no visible logo — the mark
  could be added above the name if wanted.
- `mockups/` (design explorations) and `.DS_Store` files are untracked;
  consider a `.gitignore` for `.DS_Store`.
- `README.md` describes the project history; this file is the operational
  handover.
