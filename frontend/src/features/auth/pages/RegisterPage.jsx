import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm.jsx";
import { ROUTES } from "../../../utils/constants.js";

export default function RegisterPage() {
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-slate-900">
        Create your account
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        It only takes a minute to get started.
      </p>

      <div className="mt-8">
        <RegisterForm />
      </div>

      <p className="mt-8 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          to={ROUTES.LOGIN}
          className="font-semibold text-brand-600 hover:text-brand-700"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
