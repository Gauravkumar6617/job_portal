import { Link } from "react-router-dom";
import { Compass, HeartHandshake, ShieldCheck, Target } from "lucide-react";
import { ROUTES } from "../utils/constants.js";

const values = [
  {
    icon: Target,
    title: "Purposeful matching",
    description:
      "We focus on connecting the right people with the right roles, not just filling volume.",
  },
  {
    icon: ShieldCheck,
    title: "Trust & transparency",
    description:
      "Clear application statuses and honest communication, for candidates and employers alike.",
  },
  {
    icon: HeartHandshake,
    title: "Built for people",
    description:
      "Behind every application is a person. We design for clarity, respect, and speed.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="section py-16 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
            <Compass className="h-3.5 w-3.5" />
            About JobNest
          </span>
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Making the job search feel less like a job
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            JobNest is a platform built to simplify hiring — for people
            looking for their next opportunity, and for teams trying to find
            great talent. No clutter, no noise. Just a clear path from
            profile to offer.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="section">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              What we stand for
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="card p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">
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

      <section className="section py-16 text-center sm:py-20">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Want to be part of it?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-600">
          Create your free account and see what JobNest can do for your
          career or your team.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to={ROUTES.REGISTER} className="btn-primary">
            Get started
          </Link>
          <Link to={ROUTES.CONTACT} className="btn-secondary">
            Contact us
          </Link>
        </div>
      </section>
    </div>
  );
}
