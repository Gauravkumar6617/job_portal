import { Link } from "react-router-dom";
import { ArrowLeft, SearchX } from "lucide-react";
import { ROUTES } from "../utils/constants.js";

export default function NotFoundPage() {
  return (
    <div className="section flex min-h-[70vh] flex-col items-center justify-center py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
        <SearchX className="h-8 w-8" />
      </div>
      <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900">
        404
      </h1>
      <p className="mt-2 text-lg font-semibold text-slate-700">
        Page not found
      </p>
      <p className="mt-2 max-w-sm text-sm text-slate-500">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link to={ROUTES.HOME} className="btn-primary mt-8">
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>
    </div>
  );
}
