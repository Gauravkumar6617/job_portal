import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ForgotPasswordForm from "../components/ForgotPasswordForm.jsx";
import { ROUTES } from "../../../utils/constants.js";

export default function ForgotPasswordPage() {
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-slate-900">
        Reset your password
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Enter the email associated with your account and we'll send you a
        link to reset your password.
      </p>

      <div className="mt-8">
        <ForgotPasswordForm />
      </div>

      <Link
        to={ROUTES.LOGIN}
        className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-brand-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to sign in
      </Link>
    </div>
  );
}
