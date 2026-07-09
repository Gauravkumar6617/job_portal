const sections = [
  {
    title: "Information we collect",
    body: "When you create an account, we collect your name, email address, phone number, and any profile or application details you choose to provide, such as your resume, work history, and job preferences.",
  },
  {
    title: "How we use your information",
    body: "We use your information to operate your account, match you with relevant opportunities or candidates, communicate with you about your applications, and improve our platform.",
  },
  {
    title: "How we protect your information",
    body: "Passwords are stored using industry-standard hashing, and access to personal data is restricted to what is necessary to provide our services.",
  },
  {
    title: "Sharing your information",
    body: "We share your profile and application details with employers only when you apply to their listings. We do not sell your personal information to third parties.",
  },
  {
    title: "Your choices",
    body: "You can review, update, or delete your account information at any time. Contact us if you'd like help managing your data.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="section py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          This policy explains what information JobNest collects and how it
          is used.
        </p>

        <div className="mt-10 space-y-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-bold text-slate-900">
                {section.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
