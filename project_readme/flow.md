<!-- Desgin by claude -->

╔══════════════════════════════════════════════════════════════════════════════════════╗
║ HIREFLOW - COMPLETE SYSTEM DIAGRAM ║
║ (Multi-Recruiter Company + Full Portal Flow) ║
╚══════════════════════════════════════════════════════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ENTRY POINT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

                          ┌─────────────────────────┐
                          │     hireflow.com         │
                          │   Landing / Home Page    │
                          │  Search bar  |  Sign In  │
                          └────────────┬────────────┘
                                       │
                          ┌────────────▼────────────┐
                          │       REGISTER           │
                          │  name, email, password   │
                          │                          │
                          │  Select Role:            │
                          │  ┌──────┐  ┌──────────┐ │
                          │  │ 👤   │  │    🏢    │ │
                          │  │ Job  │  │Recruiter │ │
                          │  │Seeker│  │          │ │
                          │  └──┬───┘  └────┬─────┘ │
                          └─────┼───────────┼───────┘
                                │           │
               ┌────────────────┘           └──────────────────────┐
               │                                                    │
               ▼                                                    ▼

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
JOB SEEKER SIDE RECRUITER SIDE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌──────────────────────────┐ ┌────────────────────────────────────────┐
│ SEEKER PROFILE SETUP │ │ RECRUITER ONBOARDING │
│ │ │ │
│ • Full name │ │ Q: Do you have a company? │
│ • Profile photo │ │ │
│ • Headline │ │ ┌──────────────┐ ┌────────────────┐ │
│ • Location │ │ │ YES → │ │ NO → │ │
│ • Skills (tags) │ │ │ Enter invite │ │ Create new │ │
│ • Work experience │ │ │ code/link │ │ company │ │
│ • Education │ │ └──────┬───────┘ └───────┬────────┘ │
│ • Resume PDF upload │ │ │ │ │
│ • Open to Work toggle │ └─────────┼───────────────────┼──────────┘
│ • Profile completion % │ │ │
└────────────┬─────────────┘ │ │
│ ▼ ▼
│ ┌────────────────┐ ┌───────────────────────┐
│ │ JOIN COMPANY │ │ CREATE COMPANY │
│ │ │ │ │
│ │ Token verified │ │ • Company name │
│ │ → linked as │ │ • Logo upload │
│ │ Recruiter │ │ • Industry │
│ │ or Manager │ │ • Company size │
│ └───────┬────────┘ │ • Website │
│ │ │ • Description │
│ │ │ • Location │
│ │ │ │
│ │ │ You become → OWNER │
│ │ └──────────┬────────────┘
│ │ │
│ └──────────┬───────────┘
│ │
│ ▼
│ ┌─────────────────────────────────────────┐
│ │ COMPANY PROFILE │
│ │ │
│ │ Acme Corp │
│ │ ⭐ 4.2 | 500-1000 employees │
│ │ Software • Bangalore, India │
│ │ │
│ │ [Members Tab] [Jobs Tab] │
│ │ │
│ │ MEMBERS: │
│ │ 👤 Rahul (Owner) │
│ │ 👤 Priya (Manager) │
│ │ 👤 Amit (Recruiter) │
│ │ │
│ │ [+ Invite Recruiter] button │
│ └──────────────┬──────────────────────────┘
│ │
│ ┌──────────────▼──────────────────────────┐
│ │ INVITE FLOW │
│ │ │
│ │ Owner/Manager enters colleague email │
│ │ │ │
│ │ ▼ │
│ │ 📧 Invite email sent (Nodemailer) │
│ │ "Join Acme Corp on HireFlow" │
│ │ │ │
│ │ ▼ │
│ │ Colleague clicks link → registers │
│ │ → auto-joined as Recruiter │
│ └──────────────┬──────────────────────────┘
│ │
▼ ▼

┌──────────────────────────┐ ┌─────────────────────────────────────────┐
│ SEEKER DASHBOARD │ │ RECRUITER DASHBOARD │
│ │ │ │
│ 📊 Profile: 80% │ │ Company: Acme Corp │
│ 🔔 3 Notifications │ │ Your Role: Manager │
│ 📝 5 Applications │ │ 🔔 2 new applicants today │
│ ♡ 2 Saved Jobs │ │ 📋 4 Active Jobs │
└────────────┬─────────────┘ └──────────────┬──────────────────────────┘
│ │
┌───────┴────────┐ ┌──────────┴───────────┐
│ │ │ │
▼ ▼ ▼ ▼

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CORE ACTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌──────────────────────────┐ ┌─────────────────────────────────────────┐
│ SEARCH JOBS │ │ POST A JOB │
│ │ │ │
│ 🔍 [React Developer ] │ │ Job Title: ********\_\_\_\_******** │
│ │ │ Description: (rich text editor) │
│ Filters: │ │ Skills: [React] [Node] [+add] │
│ ├ Remote / Onsite │ │ Salary: ₹8L ──●────────── ₹20L │
│ ├ Experience: 0-2y │ │ Type: ● Full-time ○ Part ○ Intern │
│ ├ Salary: ₹5L - ₹15L │ │ Experience: ○ 0-2y ● 2-5y ○ 5y+ │
│ ├ Job Type: Full-time │ │ Location: ****\_**** ☐ Remote OK │
│ ├ Company Size │ │ Openings: [3] │
│ └ Date Posted │ │ Deadline: [dd/mm/yyyy] │
│ │ │ Status: ● Active ○ Paused │
│ Recommended for you 🎯 │ │ │
└────────────┬─────────────┘ │ Posted by: Amit (Recruiter) │
│ │ Company: Acme Corp │
▼ └──────────────┬──────────────────────────┘
┌──────────────────────────┐ │
│ JOB LISTING │ ▼
│ │ ┌─────────────────────────────────────────┐
│ ┌────────────────────┐ │ │ RECRUITER JOB LIST │
│ │ 🏢 Acme Corp │ │ │ │
│ │ React Developer │ │ │ ● React Developer 42 applicants │
│ │ Bangalore • ₹12LPA │ │ │ ● Node.js Backend 18 applicants │
│ │ 2 days ago ♡ Save │ │ │ ◌ UI Designer (Paused) 7 applicants │
│ └────────────────────┘ │ │ ✕ DevOps (Closed) 31 applicants │
│ │ │ │
│ ┌────────────────────┐ │ │ [+ Post New Job] │
│ │ 🏢 TechStart │ │ └──────────────┬──────────────────────────┘
│ │ Full Stack Dev │ │ │
│ │ Remote • ₹15LPA │ │ ▼
│ │ 1 day ago ♡ Save │ │ ┌─────────────────────────────────────────┐
│ └────────────────────┘ │ │ APPLICANT PIPELINE │
└────────────┬─────────────┘ │ (React Developer • 42 total) │
│ │ │
▼ │ ┌────────┐┌─────────┐┌────────────┐ │
┌──────────────────────────┐ │ │Applied ││Shortlist││ Interview │ │
│ JOB DETAIL PAGE │ │ │ (18) ││ (12) ││ (8) │ │
│ │ │ ├────────┤├─────────┤├────────────┤ │
│ React Developer │ │ │👤 Rahul││👤 Sneha ││👤 Karan │ │
│ Acme Corp • Bangalore │ │ │2y exp ││3y exp ││4y exp │ │
│ ₹10L-₹14L • Full-time │ │ │85% match│80% match││90% match │ │
│ │ │ ├────────┤├─────────┤├────────────┤ │
│ About the role... │ │ │👤 Priya││👤 Aryan ││👤 Meera │ │
│ Requirements... │ │ │1y exp ││2y exp ││3y exp │ │
│ Skills: React Node SQL │ │ └────────┘└─────────┘└────────────┘ │
│ │ │ │
│ 🏢 About Acme Corp │ │ ┌──────────┐ ┌──────────┐ │
│ ⭐ 4.2 • 500 employees │ │ │ Offered │ │ Rejected │ │
│ │ │ │ (3) │ │ (1) │ │
│ Similar Jobs ▼ │ │ └──────────┘ └──────────┘ │
│ │ │ │
│ ┌──────────────────┐ │ │ ← drag cards across stages → │
│ │ APPLY NOW → │ │ └──────────────┬──────────────────────────┘
│ └─────────┬────────┘ │ │
└────────────┼─────────────┘ ▼
│ ┌─────────────────────────────────────────┐
▼ │ CANDIDATE DETAIL VIEW │
┌──────────────────────────┐ │ │
│ APPLY MODAL │ │ 👤 Sneha Sharma │
│ │ │ React Developer • 3 yrs exp │
│ Resume: │ │ Pune → Open to Relocate │
│ ● Use profile resume │ │ │
│ ○ Upload new │ │ Skills match: ████████░░ 80% │
│ │ │ [React ✓] [Node ✓] [SQL ✓] [AWS ✗] │
│ Cover Letter: │ │ │
│ ┌──────────────────┐ │ │ Experience: │
│ │ (optional) │ │ │ • XYZ Corp • 2 yrs • React Dev │
│ └──────────────────┘ │ │ │
│ │ │ 📄 [View Resume PDF] │
│ Phone: +91 ****\_\_**** │ │ │
│ │ │ 📝 Internal Notes: │
│ [SUBMIT APPLICATION] │ │ "Strong frontend, weak on system │
└────────────┬─────────────┘ │ design. Schedule round 2." │
│ │ │
│ │ Move to: [Shortlist ▼] [Reject] │
│ │ [📅 Schedule Interview] │
│ └──────────────┬──────────────────────────┘
│ │
│ ▼
│ ┌─────────────────────────────────────────┐
│ │ SCHEDULE INTERVIEW │
│ │ │
│ │ Candidate: Sneha Sharma │
│ │ Date: [15 Aug 2025] │
│ │ Time: [11:00 AM ] │
│ │ Mode: ● Online ○ Offline │
│ │ Link: meet.google.com/xyz │
│ │ Notes: "Bring portfolio" │
│ │ │
│ │ [CONFIRM & NOTIFY CANDIDATE] │
│ │ │ │
│ │ ▼ │
│ │ 📧 Email to Sneha (Nodemailer) │
│ │ 🔔 Notification to Sneha (Socket.io) │
│ └─────────────────────────────────────────┘
│
▼

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
APPLICATION STATUS TRACKER (SEEKER VIEW)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌──────────────────────────────────────────────────────────────────────────────────┐
│ MY APPLICATIONS │
│ │
│ 🏢 Acme Corp • React Developer │
│ Applied: 10 Aug ──●────────────────────────────────── 🟡 Shortlisted 🔔 │
│ [Applied]──[Viewed]──[Shortlisted]──[Interview]──[Offered]──[Hired] │
│ ▲ │
│ You are here │
│ │
│ 🏢 TechStart • Full Stack Dev │
│ Applied: 8 Aug ──●──●──────────────────────────────── ⚪ Under Review │
│ [Applied]──[Viewed]──... │
│ │
│ 🏢 Startup X • Node Developer │
│ Applied: 5 Aug ──●──●──●──●──●────────────────────── 🔴 Rejected │
│ │
│ 🏢 BigCo • Senior Dev │
│ Applied: 1 Aug ──●──●──●──●──●──●──────────────────── 🟢 Offer Received! 🎉 │
└──────────────────────────────────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NOTIFICATION SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SEEKER receives 🔔: RECRUITER receives 🔔:
┌──────────────────────────────┐ ┌──────────────────────────────────┐
│ • Application submitted ✅ │ │ • New applicant on Job X │
│ • Recruiter viewed resume 👁 │ │ • Candidate withdrew application │
│ • Moved to Shortlist 🎯 │ │ • Interview confirmed by seeker │
│ • Interview scheduled 📅 │ │ │
│ • Offer extended 🎉 │ │ (per job, not per company — │
│ • Application rejected 😔 │ │ recruiter only sees their own │
└──────────────────────────────┘ │ jobs unless Manager/Owner) │
└──────────────────────────────────┘

Channel: Socket.io (real-time) + Nodemailer (email digest)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
COMPANY ROLES & PERMISSIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────────┬────────────┬──────────┬───────────┐
│ Action │ Owner │ Manager │ Recruiter │
├─────────────────────┼────────────┼──────────┼───────────┤
│ Edit company profile│ ✅ │ ✅ │ ❌ │
│ Invite members │ ✅ │ ✅ │ ❌ │
│ Remove members │ ✅ │ ❌ │ ❌ │
│ Post new job │ ✅ │ ✅ │ ✅ │
│ See ALL jobs │ ✅ │ ✅ │ ❌ │
│ See own jobs only │ ✅ │ ✅ │ ✅ │
│ Move any applicant │ ✅ │ ✅ │ ❌ │
│ Move own applicants │ ✅ │ ✅ │ ✅ │
│ Delete company │ ✅ │ ❌ │ ❌ │
└─────────────────────┴────────────┴──────────┴───────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DATABASE RELATIONSHIPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

         ┌──────────┐        ┌──────────────────┐        ┌──────────┐
         │  users   │        │  company_members  │        │companies │
         │──────────│1      *│──────────────────│*      1│──────────│
         │ id       ├────────┤ user_id (FK)      ├────────┤ id       │
         │ name     │        │ company_id (FK)   │        │ name     │
         │ email    │        │ member_role       │        │ logo     │
         │ password │        │ status            │        │ industry │
         │ role     │        │ invited_by (FK)   │        │ size     │
         └────┬─────┘        └──────────────────┘        └────┬─────┘
              │                                               │
              │1                                              │1
              │                                               │
              │*                                              │*
         ┌────▼─────┐                                   ┌────▼─────┐
         │ profiles │                                   │   jobs   │
         │──────────│                                   │──────────│
         │ user_id  │                                   │ id       │
         │ headline │                                   │company_id│
         │ location │                                   │posted_by │←─ user_id
         │ skills[] │                                   │ title    │
         │ resume   │                                   │ skills[] │
         │ open_to  │                                   │ salary   │
         │ _work    │                                   │ status   │
         └────┬─────┘                                   └────┬─────┘
              │                                              │
              │1                                             │1
              │                                              │
              └──────────────┐  ┌───────────────────────────┘
                             │  │
                             │* │*
                       ┌─────▼──▼──────┐
                       │  applications  │
                       │───────────────│
                       │ id            │
                       │ job_id (FK)   │
                       │ seeker_id(FK) │
                       │ resume_url    │
                       │ cover_letter  │
                       │ status        │
                       │ applied_at    │
                       └───────┬───────┘
                               │1
                               │
                               │*
                   ┌───────────▼──────────┐
                   │   application_logs    │
                   │──────────────────────│
                   │ application_id (FK)  │
                   │ from_status          │
                   │ to_status            │
                   │ changed_by (FK)      │
                   │ changed_at           │
                   │ note                 │
                   └──────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ADMIN PANEL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

          ┌────────────────────────────────────────────────────┐
          │                 ADMIN DASHBOARD                    │
          │                                                    │
          │  📊 Total Users: 1,240  |  Jobs: 320  |  Apps: 892│
          │                                                    │
          │  ┌──────────────┐  ┌──────────────┐  ┌─────────┐  │
          │  │    USERS     │  │   COMPANIES  │  │  JOBS   │  │
          │  │              │  │              │  │         │  │
          │  │ Verify ✅    │  │ Verify ✅    │  │Approve  │  │
          │  │ Ban 🚫       │  │ Suspend 🚫   │  │Flag 🚩  │  │
          │  │ View profile │  │ View members │  │Remove   │  │
          │  └──────────────┘  └──────────────┘  └─────────┘  │
          │                                                    │
          │  ┌──────────────────────────────────────────────┐  │
          │  │           FEATURED JOBS (paid)               │  │
          │  │  Mark jobs as ★ Featured → shown at top     │  │
          │  └──────────────────────────────────────────────┘  │
          └────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FULL REQUEST FLOW SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Recruiter creates company
│
├──→ Invites team members via email
│ └──→ Members join → linked to company with role
│
└──→ Posts jobs (linked to company + posted_by recruiter)
│
▼
Seeker searches → finds job → applies
│
▼
Application created (status: Applied)
│
├──→ 🔔 Recruiter notified: "New applicant"
│
▼
Recruiter opens pipeline → reviews candidate
│
├──→ Rejected → 🔔 Seeker notified
│
└──→ Shortlisted → 🔔 Seeker notified
│
▼
Interview Scheduled
│
├──→ 📧 Email to seeker
└──→ 🔔 Real-time notification
│
▼
Offer Extended → 🎉
│
▼
HIRED ✅
