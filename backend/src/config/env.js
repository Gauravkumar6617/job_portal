import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

const envSchema = z.object({
  //  enviroment type
  NODE_ENV: z
    .enum(["development", "test", "production"]),
  // port
  PORT: z.coerce.number().default(5000),
  // database url and filter
  DATABASE_URL: z
    .string()
    .url({ message: "DATABASE URL must be a valid URL" })
    .refine(
      (url) => url.startsWith("postgres://") || url.startsWith("postgresql://"),
      { message: "DATABASE URL must start with postgres:// or postgresql://" },
    ),
  // redis url
  REDIS_HOST: z.string().min(1, "REDIS_HOST is required"),

  REDIS_PORT: z.coerce.number().int().min(1).max(65535),

  REDIS_USERNAME: z.string().min(1, "REDIS_USERNAME is required"),

  REDIS_PASSWORD: z.string().min(1, "REDIS_PASSWORD is required"),

  JWT_ACCESS_SECRET: z.string().min(1, "JWT_ACCESS_SECRET is required"),

  JWT_REFRESH_SECRET: z.string().min(1, "JWT_REFRESH_SECRET is required"),

  TWILIO_ACCOUNT_SID: z.string().min(1, "TWILIO_ACCOUNT_SID is required"),

  TWILIO_AUTH_TOKEN: z.string().min(1, "TWILIO_AUTH_TOKEN is required"),

  TWILIO_WHATSAPP_FROM: z.string().min(1, "TWILIO_WHATSAPP_FROM is required"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.log("Envirment Variable failed");
  console.log(JSON.stringify(_env.error.format(), null, 4));
  process.exit(1);
}

export const env = _env.data;
