import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Mail, MessageSquare } from "lucide-react";
import Input from "../components/ui/Input.jsx";
import api from "../api/axios.js";
import { ENDPOINTS } from "../api/endpoints.js";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().email("Enter a valid email address"),
  subject: z.string().trim().min(3, "Subject must be at least 3 characters"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long"),
});

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (values) => {
    try {
      await api.post(ENDPOINTS.CONTACT.SEND, values);
      toast.success("Message sent! We'll get back to you soon.");
      reset();
    } catch {
      toast.error("Couldn't send your message right now. Please try again.");
    }
  };

  return (
    <div className="section py-16 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Get in touch
        </h1>
        <p className="mt-3 text-slate-600">
          Questions, feedback, or partnership ideas — we'd love to hear from
          you.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="card p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <Mail className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-slate-900">
              Email us
            </h3>
            <a
              href="mailto:hello@jobnest.example"
              className="mt-1 block text-sm text-brand-600 hover:text-brand-700"
            >
              hello@jobnest.example
            </a>
          </div>

          <div className="card mt-6 p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <MessageSquare className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-slate-900">
              Support
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              We aim to respond to every message as quickly as we can.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card space-y-5 p-6 md:col-span-3"
          noValidate
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Input
              label="Your name"
              placeholder="Jordan Lee"
              error={errors.name?.message}
              {...register("name")}
            />
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register("email")}
            />
          </div>

          <Input
            label="Subject"
            placeholder="How can we help?"
            error={errors.subject?.message}
            {...register("subject")}
          />

          <div>
            <label htmlFor="message" className="label-text">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Tell us more..."
              className={`input-field resize-none ${errors.message ? "input-error" : ""}`}
              {...register("message")}
            />
            {errors.message && (
              <p className="field-error">{errors.message.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full sm:w-auto"
          >
            {isSubmitting ? "Sending..." : "Send message"}
          </button>
        </form>
      </div>
    </div>
  );
}
