import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Briefcase, UserRound } from "lucide-react";
import Input from "../../../components/ui/Input.jsx";
import PasswordInput from "../../../components/ui/PasswordInput.jsx";
import { registerSchema } from "../validation.js";
import { registerUser } from "../../../services/auth.service.js";
import { ROUTES } from "../../../utils/constants.js";

const roleOptions = [
  {
    value: "candidate",
    label: "I'm looking for a job",
    icon: UserRound,
  },
  {
    value: "recruiter",
    label: "I'm hiring talent",
    icon: Briefcase,
  },
];

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: "candidate", agreeToTerms: false },
  });
  const navigate = useNavigate();
  const selectedRole = watch("role");

  const onSubmit = async (values) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const { confirmPassword, agreeToTerms, ...payload } = values;
      await registerUser(payload);
      toast.success("Account created! You can now sign in.");
      navigate(ROUTES.LOGIN, { replace: true });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Couldn't create your account. Please try again.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <span className="label-text">I am joining as</span>
        <div className="grid grid-cols-2 gap-3">
          {roleOptions.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => setValue("role", value, { shouldValidate: true })}
              className={`flex flex-col items-center gap-2 rounded-xl border px-3 py-4 text-center text-xs font-semibold transition-colors ${
                selectedRole === value
                  ? "border-brand-500 bg-brand-50 text-brand-700"
                  : "border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </button>
          ))}
        </div>
        {errors.role && <p className="field-error">{errors.role.message}</p>}
      </div>

      <Input
        label="Full name"
        autoComplete="name"
        placeholder="Jordan Lee"
        error={errors.name?.message}
        {...register("name")}
      />

      <Input
        label="Email address"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Phone number"
        type="tel"
        autoComplete="tel"
        placeholder="+1 555 123 4567"
        error={errors.phone?.message}
        {...register("phone")}
      />

      <PasswordInput
        label="Password"
        autoComplete="new-password"
        placeholder="Create a password"
        error={errors.password?.message}
        {...register("password")}
      />

      <PasswordInput
        label="Confirm password"
        autoComplete="new-password"
        placeholder="Re-enter your password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <div>
        <label className="flex items-start gap-2.5 text-sm text-slate-600">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            {...register("agreeToTerms")}
          />
          <span>
            I agree to the{" "}
            <Link to={ROUTES.TERMS} className="font-semibold text-brand-600 hover:text-brand-700">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to={ROUTES.PRIVACY} className="font-semibold text-brand-600 hover:text-brand-700">
              Privacy Policy
            </Link>
          </span>
        </label>
        {errors.agreeToTerms && (
          <p className="field-error">{errors.agreeToTerms.message}</p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}
