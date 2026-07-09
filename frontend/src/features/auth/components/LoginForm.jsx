import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../../components/ui/Input.jsx";
import PasswordInput from "../../../components/ui/PasswordInput.jsx";
import { loginSchema } from "../validation.js";
import { loginUser } from "../../../services/auth.service.js";
import { useAuth } from "../../../hooks/useAuth.js";
import { ROUTES } from "../../../utils/constants.js";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (values) => {
    try {
      const data = await loginUser(values);
      login(data);
      toast.success("Welcome back!");
      navigate(location.state?.from || ROUTES.HOME, { replace: true });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Couldn't sign you in. Check your details and try again.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <Input
        label="Email address"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="label-text">
            Password
          </label>
          <Link
            to={ROUTES.FORGOT_PASSWORD}
            className="mb-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700"
          >
            Forgot password?
          </Link>
        </div>
        <PasswordInput
          id="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register("password")}
        />
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
