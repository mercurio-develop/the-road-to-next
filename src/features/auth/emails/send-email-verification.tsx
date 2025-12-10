import { resend } from "@/lib/resend";
import EmailVerification from "@/emails/auth/email-verification";

export const sendEmailVerification = async (
  username: string,
  email: string,
  code: string,
) => {
  return (await resend.emails.send({
    from:"no-reply@ticketbounty.dev",
    to:email,
    subject: "Email Verification from TicketBounty",
    react: <EmailVerification toName={username} code={code}/>,
  }))
};
