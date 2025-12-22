import { CardCompact } from "@/components/card-compact";
import { EmailVerificationForm } from "@/features/auth/components/email-verification-form";
import { EmailVerificationResendForm } from "@/features/auth/components/email-verification-resend-form";


const EmailVerificationPage = () => {
  return (
    <div className="flex-1 flex flex-col justify-start items-center mt-[20vh]">
      <CardCompact
        title="Verify Email"
        description="Please verify your email to continue"
        classname="w-full max-w-[420px]  animate-fade-from-top"
        content={<div className="flex flex-col gap-y-2">
          <EmailVerificationForm />
          <EmailVerificationResendForm /></div>}
      />
    </div>
  );
};

export default EmailVerificationPage;
