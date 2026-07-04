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
