import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ROUTES } from "../../utils/constants.js";

export default function CtaBanner() {
  return (
    <section className="section pb-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-700 to-indigo-900 px-8 py-16 text-center shadow-xl sm:px-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to take the next step?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-100">
            Join JobNest today — it's free to get started, for job seekers
            and employers alike.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to={ROUTES.REGISTER}
              className="btn bg-white text-brand-700 hover:bg-brand-50 focus-visible:ring-white"
            >
              Get started free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to={ROUTES.CONTACT}
              className="btn border border-white/30 text-white hover:bg-white/10 focus-visible:ring-white"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
