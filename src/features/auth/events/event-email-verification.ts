import { inngest } from "@/lib/inngest";
import { sendEmailWelcome } from "@/features/auth/emails/send-email-welcome";
import { signInPath } from "@/paths";
import { sendEmailVerification } from "@/features/auth/emails/send-email-verification";
import { generateEmailVerificationCode } from "@/features/auth/utils/generate-email-verification-code";
import { prisma } from "@/lib/prisma";

export type EmailVerificationFunctionArgs = {
  data: {
    userId: string;
  };
};

export const emailVerificationFunction = inngest.createFunction(
  { id: "email-verification" },
  { event: "app/auth.signup" },
  async ({ event, step }) => {
    const { userId } = event.data;

    const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
    const { firstName, lastName, email, id, username } = user;

    await step.run("send-email-verify-account", async () => {
      const verificationCode = await generateEmailVerificationCode(id, email);

      const result = await sendEmailVerification(
        username,
        email,
        verificationCode,
      );
      if (result.error) {
        throw new Error(`${result.error.name}:${result.error.message}`);
      }
      return { event, body: result };
    });

    await step.run("send-signup-welcome", async () => {
      const appBaseUrl =
        process.env.NEXT_PUBLIC_APP_URL ||
        process.env.APP_URL ||
        "http://localhost:3000";

      const loginUrl = `${appBaseUrl}${signInPath()}`;

      const toName = `${firstName} ${lastName}`.trim();

      const result = await sendEmailWelcome(toName, email, loginUrl);

      if (result.error) {
        throw new Error(`${result.error.name}:${result.error.message}`);
      }
      return { event, body: result };
    });
    return { ok: true };
  },
);
