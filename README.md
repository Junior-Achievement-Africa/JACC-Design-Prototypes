# JACC Design Prototypes

Public, clickable **Career Hub** design review site for JA Africa stakeholders.

- Five themes (Baobab, Horizon, Verdant, Pulse, Atlas) — JA Worldwide palette only  
- All Release‑1 screens from the stakeholder requirements  
- **Interactive feedback**: pin comments on any UI, export, or open a GitHub Issue  

**Live site:** https://junior-achievement-africa.github.io/JACC-Design-Prototypes/

## For reviewers (clients)

1. Open the live site and pick a theme.
2. Browse screens (use **Screens ▾** in the top bar).
3. Tap **Feedback** → **Add pin on this screen** → click the UI → write your note  
   (Suggestion / Issue / Love / Question).
4. Enter your name so comments are attributable.
5. When done, either:
   - **Send as GitHub Issue** (preferred — lands in this repo’s Issues), or  
   - **Export Markdown / JSON** / **Copy report** and email the file.

Feedback is stored in your browser until you export or submit an issue.

## For the delivery team

1. Watch [Issues](https://github.com/Junior-Achievement-Africa/JACC-Design-Prototypes/issues) labelled by reviewers.  
2. Or collect exported Markdown from workshops.  
3. Use `FIGMA-STITCH-PROMPT.md` when generating high-fidelity Figma / Stitch frames.

## Local preview

```bash
cd JACC-Design-Prototypes
python3 -m http.server 8080
# http://localhost:8080
```

## Themes

| Theme | Intent |
|-------|--------|
| **Baobab** | Current product direction — calm, Apple-like |
| **Horizon** | Bold teal full-bleed |
| **Verdant** | Forest / cream editorial |
| **Pulse** | Night aqua glass |
| **Atlas** | Dense ops / admin |

## Repo layout

```
css/     themes, base UI, feedback chrome
js/      data, screens, router, feedback
assets/  hero / story images
```

This repo is **design-only** (static HTML/CSS/JS). The Moodle plugin lives in the private JACC-3.0 codebase.
