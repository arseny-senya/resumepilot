import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail({ email, name }) {
  return resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "🎉 Welcome to Resume Pilot",

    html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
</head>

<body style="
margin:0;
padding:0;
background:#f5f7ff;
font-family:Arial,Helvetica,sans-serif;
">

<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td align="center">

<table
width="620"
cellpadding="0"
cellspacing="0"
style="
background:white;
margin:40px 0;
border-radius:18px;
overflow:hidden;
box-shadow:0 10px 40px rgba(0,0,0,.08);
">

<tr>
<td
style="
background:linear-gradient(135deg,#6c63ff,#4d7dff);
padding:45px;
text-align:center;
color:white;
">

<h1
style="
margin:0;
font-size:34px;
font-weight:700;
">
Resume Pilot
</h1>

<p
style="
margin-top:15px;
font-size:18px;
opacity:.95;
">
Welcome aboard 🚀
</p>

</td>
</tr>

<tr>

<td style="padding:45px;">

<h2
style="
margin-top:0;
font-size:28px;
color:#222;
">
Hi ${name || "there"} 👋
</h2>

<p
style="
font-size:17px;
line-height:1.8;
color:#555;
">
Your account has been successfully created.
</p>

<p
style="
font-size:17px;
line-height:1.8;
color:#555;
">
You can now create professional resumes,
download PDF files and access all free features of Resume Pilot.
</p>

<table
width="100%"
style="
margin:35px 0;
background:#f7f8ff;
border-radius:14px;
padding:25px;
">

<tr>

<td style="font-size:17px;line-height:2;color:#333;">

✅ Professional resume templates<br>

✅ Fast PDF export<br>

✅ Save your account<br>

⭐ Upgrade to PRO anytime

</td>

</tr>

</table>

<div style="text-align:center;">

<a
href="https://resumepilotonline.com"
style="
display:inline-block;
padding:16px 34px;
background:#6c63ff;
color:white;
text-decoration:none;
border-radius:12px;
font-size:17px;
font-weight:bold;
">

Open Resume Pilot

</a>

</div>

<p
style="
margin-top:40px;
font-size:15px;
color:#888;
line-height:1.8;
">

Thank you for choosing Resume Pilot.
We wish you success in your job search!

</p>

</td>

</tr>

<tr>

<td
style="
padding:25px;
text-align:center;
background:#fafafa;
font-size:13px;
color:#999;
">

© ${new Date().getFullYear()} Resume Pilot

</td>

</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`,
  });
}
export async function sendResetPasswordEmail({ email, name, resetUrl, lang }) {
  const isRu = lang === "ru";

  return resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: isRu
      ? "Восстановление пароля | Resume Pilot"
      : "Reset your password | Resume Pilot",

    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
        <h1 style="color:#111;">
          ${isRu ? "Восстановление пароля" : "Reset your password"}
        </h1>

        <p>
          ${isRu ? `Здравствуйте${name ? `, ${name}` : ""}!` : `Hi${name ? `, ${name}` : ""}!`}
        </p>

        <p>
          ${
            isRu
              ? "Мы получили запрос на восстановление пароля для вашего аккаунта Resume Pilot."
              : "We received a request to reset the password for your Resume Pilot account."
          }
        </p>

        <p>
          ${
            isRu
              ? "Нажмите на кнопку ниже, чтобы создать новый пароль. Ссылка будет действительна ограниченное время."
              : "Click the button below to create a new password. This link will be valid for a limited time."
          }
        </p>

        <p style="text-align:center; margin: 30px 0;">
          <a href="${resetUrl}"
            style="display:inline-block; padding:14px 22px; background:#6c7bff; color:#fff; text-decoration:none; border-radius:10px; font-weight:bold;">
            ${isRu ? "Сбросить пароль" : "Reset password"}
          </a>
        </p>

        <p style="color:#666; font-size:14px;">
          ${
            isRu
              ? "Если вы не запрашивали восстановление пароля, просто проигнорируйте это письмо."
              : "If you did not request a password reset, you can safely ignore this email."
          }
        </p>

        <p style="color:#999; font-size:13px; margin-top:30px;">
          Resume Pilot
        </p>
      </div>
    `,
  });
}
