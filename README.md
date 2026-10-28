# JACC Design Prototypes

Public, clickable **Career Hub** design review for JA Africa stakeholders.

**Live:** https://junior-achievement-africa.github.io/JACC-Design-Prototypes/  
**Repo:** https://github.com/Junior-Achievement-Africa/JACC-Design-Prototypes

## What’s in this review build

- **Shared JA colours** across every theme — only layout / type / density change  
- **Concept 1** — soft 3-column foundations · **Concept 2 / 4** — full-width layouts · **Concept 3** — centred editorial · **Concept 5** — lively motion-first  

- **Features backlog** on the gallery home — phased list (Phase 1–3 + Later) that development will ship against; items link into prototype screens where available  
- **Persona switcher**, Moodle **cohort gate**, **AI CV studio**, organise / employer flows  
- **Feedback pins** with a **Team** tab backed by GitHub Issues (`design-feedback` label)

Mentorship is listed under **Later** and is **out of this prototype**.

## How to review

1. Open the live site → pick a **design concept** (start with Concept 1).  
2. Use the **persona bar** to switch roles.  
3. Try **Locked** vs **Alumni** to feel cohort access.  
4. As **Admin**, open **Plugin** settings and **Cohorts access**.  
5. As **Alumni**, open **CV studio** → Upload & AI-parse.  
6. Pin feedback with the floating **Feedback** button — leave **Share with the JA team** checked so notes appear for everyone under **Team**.

## Shared feedback (so the JA team can see pins)

Browser storage alone is per-device. Shared notes use GitHub Issues labeled `design-feedback`.

**Without a token (works today):** reviewers keep “Share with the JA team” checked → GitHub opens a pre-filled issue → they click **Submit**. Anyone can then see those pins on the live site under **Feedback → Team** (and as pins on the matching screen).

**Automatic share (no GitHub login for reviewers):** create a [fine-grained PAT](https://github.com/settings/personal-access-tokens/new) with **Issues: Read and write** on **only** `JACC-Design-Prototypes`, paste it into `js/feedback-config.js` as `githubToken`, commit, and deploy. Rotate/delete the token after the review window.

Optional: set `formEndpoint` in the same file to a Formspree/Web3Forms URL to also email an inbox.

## Local

```bash
cd JACC-Design-Prototypes
python3 -m http.server 8080
```

After clone, enable commit hooks so Cursor co-author trailers are stripped:

```bash
git config core.hooksPath .githooks
```

## Note

Static HTML/CSS/JS only. Production remains the Moodle plugin `local_jacc` in the private JACC-3.0 repo.
