import dotenv from "dotenv"
import { success, z } from "zod";
dotenv.config();


const envSchema = z.object({
//  enviroment type
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
// port
    PORT: z.string().transform((val) => parseInt(val, 10).default(5000)),
// database url and filter
    DATABASE_URL: z.string().url({ message: "DATABASE URL must be a valid URL" }).refine((url) => url.startsWith('postgres://') || url.startsWith('postgresql://'), { message: "DATABASE URL must start with postgres:// or postgresql://" }),
// redis url
    REDIS_URL: z.string().url({ message: "REDIS URL must be a valid URL" }).refine((url) => url.startsWith('redis://'), { message: "REDIS URL must start with redis://" }),
    REDIS_PASSWORD: z.string().optional(),
});


const _env = envSchema.safeParse(process.env);

if(!_env.success){
    console.log("Envirment Variable failed")
    console.log(JSON.stringify(_env.error.format(), null, 4));
    process.exit(1 )
}

export const env = _env.data;