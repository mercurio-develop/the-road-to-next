import { CardCompact } from "@/components/card-compact";
import { PasswordChangeForm } from "@/features/password/components/password-change-form";
import { Heading } from "@/components/heading";
import { AccountTabs } from "@/app/(authenticated)/account/_navigation/components/account-tabs";

const PasswordPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8 ml-10">
      <Heading
        title="Password"
        description="Keep your account secure"
        tabs={<AccountTabs />}
      />{" "}
      <div className="flex-1 flex flex-col justify-start items-center mt-[10vh]">
        <CardCompact
          title="Change Password"
          description="Enter your current password"
          classname="w-full max-w-[420px]  animate-fade-from-top"
          content={<PasswordChangeForm />}
        />
      </div>

    </div>
  );
};

export default PasswordPage;
