import { Link } from "react-router-dom";
import { ArrowRight, Building2, UserRound } from "lucide-react";
import { ROUTES } from "../../utils/constants.js";

const audiences = [
  {
    icon: UserRound,
    title: "For Job Seekers",
    description:
      "Build a profile, discover roles that match your skills, and apply in just a few clicks. Track every application from one dashboard.",
    cta: "Find your next role",
    to: ROUTES.REGISTER,
    accent: "from-brand-600 to-indigo-600",
  },
  {
    icon: Building2,
    title: "For Employers",
    description:
      "Post open roles, review candidates efficiently, and manage your hiring pipeline without the busywork.",
    cta: "Start hiring",
    to: ROUTES.REGISTER,
    accent: "from-indigo-600 to-purple-600",
  },
];

export default function AudienceSection() {
  return (
    <section className="section py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
          Built for both sides of hiring
        </h2>
        <p className="mt-3 text-slate-600">
          Whether you're looking for your next opportunity or your next
          hire, JobNest keeps the process simple.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {audiences.map(({ icon: Icon, title, description, cta, to, accent }) => (
          <div
            key={title}
            className="card group relative overflow-hidden p-8 transition-shadow hover:shadow-md"
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${accent} text-white shadow-sm`}
            >
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-xl font-bold text-slate-900">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {description}
            </p>
            <Link
              to={to}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-transform group-hover:gap-2.5 group-hover:text-brand-700"
            >
              {cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
