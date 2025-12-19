import { Resend } from 'resend';
import { ENV } from '../lib/schemas/env.js';

const resend = new Resend(ENV.RESEND_KEY);

export const sendEmail = async (email:string, message: string, subject:string) =>  {
  const { data, error } = await resend.emails.send({
    from: 'Shopora <info@talakkinash.live>',
    to: email,
    subject: subject,
    html: message,
  });

  if (error) throw new Error(error.message)
}