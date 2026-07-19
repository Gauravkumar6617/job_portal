┌─────────────────────────────────────────────────────────────────┐
│ AI FEATURES MAP │
└─────────────────────────────────────────────────────────────────┘

1. RESUME PARSER (on upload)
   Seeker uploads PDF
   │
   ▼
   BullMQ Job: parse_resume
   │
   ▼
   AI extracts → name, skills, experience, education
   │
   ▼
   Auto-fills profile fields ✅

2. JOB MATCH SCORE (on apply)
   Seeker applies to job
   │
   ▼
   AI compares seeker skills[] vs job skills[]
   │
   ▼
   Generates match % → shown on recruiter pipeline card
   "Sneha — 85% match 🎯"

3. JOB DESCRIPTION GENERATOR (recruiter side)
   Recruiter fills: title + skills + experience level
   │
   ▼
   [✨ Generate Description] button
   │
   ▼
   AI writes full JD → recruiter edits & posts

4. SMART JOB RECOMMENDATIONS (seeker dashboard)
   Based on seeker profile skills + past applications
   │
   ▼
   AI ranks jobs → "Recommended for you" section

5. COVER LETTER GENERATOR (apply modal)
   Seeker clicks [✨ Auto-write cover letter]
   │
   ▼
   AI uses: job title + company + seeker profile
   │
   ▼
   Generates personalized cover letter → editable

6. CANDIDATE RANKING (recruiter pipeline)
   Recruiter opens applicant list
   │
   ▼
   AI sorts candidates by fit score
   (skills match + experience level + location)
   │
   ▼
   Top candidates shown first 🥇
