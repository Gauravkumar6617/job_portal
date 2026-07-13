import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[a-z]/, "Include at least one lowercase letter")
  .regex(/[A-Z]/, "Include at least one uppercase letter")
  .regex(/[0-9]/, "Include at least one number");

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(255, "Name is too long"),
    email: z.string().trim().email("Enter a valid email address"),
    phone: z
      .string()
      .trim()
      .regex(/^[0-9+\-\s]{7,15}$/, "Enter a valid phone number"),
    role: z.enum(["candidate", "recruiter"], {
      errorMap: () => ({ message: "Select an account type" }),
    }),
    password: passwordSchema,
    confirmPassword: z.string(),
    agreeToTerms: z.boolean().refine((v) => v === true, {
      message: "You must accept the terms to continue",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
});
