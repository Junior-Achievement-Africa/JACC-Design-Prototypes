# JACC Design Prototypes

Public, clickable **Career Hub** design review for JA Africa stakeholders.

**Live:** https://junior-achievement-africa.github.io/JACC-Design-Prototypes/  
**Repo:** https://github.com/Junior-Achievement-Africa/JACC-Design-Prototypes

## What’s new in this review build

- **Baobab = phase-0/foundations** — feed home, spaces rail, bento stats, nav pill, match rings  
- **Persona switcher** — assume Guest, Pending, Locked (wrong cohort), Alumni, Mentor, Employer, Events coordinator, Hub admin, or M&E and see that role’s nav + home  
- **Moodle cohort gate** — plugin settings to choose which cohorts can open the Career Hub  
- **AI CV parser** — upload → animated parse → review extract → CV studio / health / share (from Career Connect)  
- **Organise desk**, employer **pipeline**, mentor verify/notes, legacy forum/courses/surveys for parity  
- **Feedback pins** for client comments → GitHub Issues  

## How to review

1. Open the live site → pick a **theme** (start with Baobab).  
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
