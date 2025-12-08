import { inngest } from "@/lib/inngest";
import { sendEmailWelcome } from "@/features/auth/emails/send-email-welcome";
import { signInPath } from "@/paths";

export type SignupWelcomeFunctionArgs = {
  data: {
    user: { firstName: string; lastName: string; email: string };
  };
};

export const signupWelcomeFunction = inngest.createFunction(
  { id: "send-signup-welcome" },
  { event: "app/signup.signup-welcome" },
  async ({ event, step }) => {
    await step.sleep("delay-welcome", "1 minute");

    await step.run("send-signup-welcome", async () => {
      const { firstName, lastName, email } = event.data.user;

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
    return {ok:true}
  },
);
