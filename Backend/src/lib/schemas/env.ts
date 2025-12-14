import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  PORT: z.string(),
  BASE_URL: z.url(),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRE: z.string(),
  RESEND_KEY: z.string(),
  EMAIL_VERIFICATION_URL: z.string(),
  EMAIL_VERIFICATION_EXPIRE: z.string()
});

type Env = z.infer<typeof envSchema>;

export const ENV: Env = envSchema.parse(process.env);