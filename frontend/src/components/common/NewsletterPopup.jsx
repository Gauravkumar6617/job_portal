import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, X } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../api/axios.js";
import { ENDPOINTS } from "../../api/endpoints.js";

const SESSION_KEY = "job_portal_newsletter_dismissed";
const SHOW_DELAY_MS = 6000;

const newsletterSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
});

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(newsletterSchema) });

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const timer = setTimeout(() => setIsOpen(true), SHOW_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setIsOpen(false);
    sessionStorage.setItem(SESSION_KEY, "1");
  };

  const onSubmit = async ({ email }) => {
    try {
      await api.post(ENDPOINTS.NEWSLETTER.SUBSCRIBE, { email });
      toast.success("You're subscribed! Watch your inbox for updates.");
      reset();
      close();
    } catch {
      toast.error("Couldn't subscribe right now. Please try again later.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="newsletter-heading"
      onClick={close}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close newsletter popup"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          <Mail className="h-6 w-6" />
        </div>

        <h2
          id="newsletter-heading"
          className="mt-4 text-xl font-bold text-slate-900"
        >
          Never miss the right opportunity
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          Subscribe to get curated job openings and hiring tips delivered
          straight to your inbox.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6"
          noValidate
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="you@example.com"
            className={`input-field ${errors.email ? "input-error" : ""}`}
            {...register("email")}
          />
          {errors.email && (
            <p className="field-error">{errors.email.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary mt-4 w-full"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-slate-400">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
