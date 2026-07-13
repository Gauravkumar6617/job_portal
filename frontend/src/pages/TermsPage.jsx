const sections = [
  {
    title: "Using JobNest",
    body: "By creating an account, you agree to provide accurate information and to use the platform only for legitimate job seeking or hiring purposes.",
  },
  {
    title: "Accounts",
    body: "You are responsible for keeping your login credentials secure and for all activity that happens under your account.",
  },
  {
    title: "Acceptable use",
    body: "You agree not to misuse the platform, including posting misleading job listings, submitting false information, or attempting to access accounts that aren't yours.",
  },
  {
    title: "Content",
    body: "You retain ownership of the content you submit, such as your profile and resume, and grant JobNest permission to use it to operate the service, such as showing your profile to employers you apply to.",
  },
  {
    title: "Changes to these terms",
    body: "We may update these terms from time to time. Continued use of JobNest after changes means you accept the updated terms.",
  },
];

export default function TermsPage() {
  return (
    <div className="section py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Terms of Service
        </h1>
        <p className="mt-3 text-sm text-slate-500">
          These terms govern your use of JobNest. Please read them carefully.
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
