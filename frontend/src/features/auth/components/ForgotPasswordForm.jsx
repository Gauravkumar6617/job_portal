import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MailCheck } from "lucide-react";
import Input from "../../../components/ui/Input.jsx";
import { forgotPasswordSchema } from "../validation.js";
import { requestPasswordReset } from "../../../services/auth.service.js";

export default function ForgotPasswordForm() {
  const [submittedEmail, setSubmittedEmail] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(forgotPasswordSchema) });

  const onSubmit = async ({ email }) => {
    try {
      await requestPasswordReset({ email });
      setSubmittedEmail(email);
    } catch (error) {
      setError("email", {
        message:
          error.response?.data?.message ||
          "Couldn't send the reset link. Please try again.",
      });
    }
  };

  if (submittedEmail) {
    return (
      <div className="rounded-xl border border-brand-100 bg-brand-50 p-5 text-center">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-600 shadow-sm">
          <MailCheck className="h-5 w-5" />
        </div>
        <h3 className="mt-3 text-sm font-semibold text-slate-900">
          Check your inbox
        </h3>
        <p className="mt-1.5 text-sm text-slate-600">
          If an account exists for <strong>{submittedEmail}</strong>, we've
          sent a link to reset your password.
        </p>
      </div>
    );
  }

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

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
        {isSubmitting ? "Sending link..." : "Send reset link"}
      </button>
    </form>
  );
}
