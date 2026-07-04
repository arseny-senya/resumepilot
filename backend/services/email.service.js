import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = async ({ email, name }) => {
  if (!process.env.RESEND_API_KEY) return;

  await resend.emails.send({
    from: process.env.EMAIL_FROM || "Resume Pilot <onboarding@resend.dev>",
    to: email,
    subject: "Welcome to Resume Pilot 🎉",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
        <h1 style="color:#111;">Welcome to Resume Pilot 🎉</h1>

        <p>Hi ${name || "there"},</p>

        <p>Your account has been created successfully.</p>

        <p>You can now create professional resumes, choose templates and download your resume as a PDF.</p>

        <a href="https://resumepilotonline.com"
          style="display:inline-block; margin-top:16px; padding:12px 18px; background:#6c7bff; color:#fff; text-decoration:none; border-radius:10px;">
          Open Resume Pilot
        </a>

        <p style="margin-top:24px; color:#666; font-size:13px;">
          Best regards,<br />
          Resume Pilot
        </p>
      </div>
    `,
  });
};
