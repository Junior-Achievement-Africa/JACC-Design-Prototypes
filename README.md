# JACC Design Prototypes

Public, clickable **Career Hub** design review for JA Africa stakeholders.

**Live:** https://junior-achievement-africa.github.io/JACC-Design-Prototypes/  
**Repo:** https://github.com/Junior-Achievement-Africa/JACC-Design-Prototypes

## What’s in this review build

- **Shared JA colours** across every theme — only layout / type / density change  
- **Concept 1** — soft 3-column foundations · **Concept 2 / 4** — full-width layouts · **Concept 3** — centred editorial · **Concept 5** — lively motion-first  

- **Persona switcher**, Moodle **cohort gate**, **AI CV studio**, organise / employer flows  
- **Feedback pins** for client comments → GitHub Issues  

Mentorship is **out of this prototype**.

## How to review

1. Open the live site → pick a **design concept** (start with Concept 1).  
2. Use the **persona bar** to switch roles.  
3. Try **Locked** vs **Alumni** to feel cohort access.  
4. As **Admin**, open **Plugin** settings and **Cohorts access**.  
5. As **Alumni**, open **CV studio** → Upload & AI-parse.  
6. Pin feedback with the floating **Feedback** button.

## Local

```bash
cd JACC-Design-Prototypes
python3 -m http.server 8080
```

## Note

Static HTML/CSS/JS only. Production remains the Moodle plugin `local_jacc` in the private JACC-3.0 repo.
