┌─────────────────────────────────────────────────────────────────┐
│ BULLMQ QUEUE MAP │
└─────────────────────────────────────────────────────────────────┘

Queue 1: email_queue
─────────────────────
Triggered by:
• User registers → send welcome email
• Invite sent → send invite link email
• Application submitted → confirm to seeker
• Status changed → notify seeker
• Interview scheduled → send details to seeker
• Offer extended → congratulations email

Why queue? → Nodemailer is slow/blocking.
Fire and forget via BullMQ ✅

─────────────────────────────────────────────────────────────────

Queue 2: resume_parse_queue
────────────────────────────
Triggered by:
• Seeker uploads resume PDF

Jobs:
→ Extract text from PDF
→ Send to AI (OpenAI/Gemini)
→ Parse skills, experience, education
→ Update profile in DB
→ Notify seeker "Profile updated from resume ✅"

Why queue? → PDF parsing + AI call can take 3-10 seconds.
Don't block HTTP response ✅

─────────────────────────────────────────────────────────────────

Queue 3: notification_queue
────────────────────────────
Triggered by:
• Any application status change
• Interview scheduled
• New applicant on recruiter's job

Jobs:
→ Save notification to DB
→ Emit via Socket.io to online user
→ If user offline → store, send on next login

Why queue? → Batch notifications, avoid duplicate fires ✅

─────────────────────────────────────────────────────────────────

Queue 4: match_score_queue
───────────────────────────
Triggered by:
• Seeker submits application

Jobs:
→ Fetch job required skills
→ Fetch seeker skills from profile
→ AI calculates match %
→ Update application record with score
→ Recruiter sees score on pipeline card

Why queue? → Non-blocking, runs after apply response sent ✅

─────────────────────────────────────────────────────────────────

Queue 5: digest_queue (CRON based)
─────────────────────────────────────
Runs: Every day at 8 AM

Jobs:
→ For each seeker with job alerts ON
→ Find new jobs matching their skills (posted last 24h)
→ Send "Jobs for you today" email digest

Why queue? → Scheduled batch job, not triggered by user ✅
