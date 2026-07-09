import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm.jsx";
import { ROUTES } from "../../../utils/constants.js";

export default function LoginPage() {
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
      <p className="mt-2 text-sm text-slate-500">
        Sign in to continue to your account.
      </p>

      <div className="mt-8">
        <LoginForm />
      </div>

      <p className="mt-8 text-center text-sm text-slate-500">
        Don't have an account?{" "}
        <Link
          to={ROUTES.REGISTER}
          className="font-semibold text-brand-600 hover:text-brand-700"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
