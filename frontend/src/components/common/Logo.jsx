import { Link } from "react-router-dom";
import { Briefcase } from "lucide-react";
import { APP_NAME, ROUTES } from "../../utils/constants.js";

export default function Logo({ className = "" }) {
  return (
    <Link
      to={ROUTES.HOME}
      className={`inline-flex items-center gap-2 font-bold text-slate-900 ${className}`}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm">
        <Briefcase className="h-5 w-5" strokeWidth={2.25} />
      </span>
      <span className="text-lg tracking-tight">{APP_NAME}</span>
    </Link>
  );
}
