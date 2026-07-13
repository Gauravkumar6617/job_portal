import { ClipboardCheck, Send, UserPlus } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create your profile",
    description:
      "Sign up in minutes and tell us about your skills, experience, and what you're looking for.",
  },
  {
    icon: ClipboardCheck,
    title: "Get matched",
    description:
      "We surface roles that fit your profile, so you spend less time searching and more time applying.",
  },
  {
    icon: Send,
    title: "Apply & track",
    description:
      "Submit applications and follow their status from a single dashboard, start to finish.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-20">
      <div className="section">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            How JobNest works
          </h2>
          <p className="mt-3 text-slate-600">
            Three simple steps to your next opportunity.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {steps.map(({ icon: Icon, title, description }, index) => (
            <div key={title} className="relative text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                <Icon className="h-6 w-6" />
              </div>
              <span className="mt-4 block text-xs font-bold uppercase tracking-wider text-brand-500">
                Step {index + 1}
              </span>
              <h3 className="mt-2 text-lg font-bold text-slate-900">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
