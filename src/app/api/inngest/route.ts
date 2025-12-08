import { serve } from "inngest/next"
import { inngest } from "@/lib/inngest"
import { passwordResetFunction } from "@/features/password/events/event-password-reset";
import { signupWelcomeFunction } from "@/features/auth/events/event-signup";

export const { GET, POST, PUT } = serve({
  client:inngest,
  functions:[passwordResetFunction, signupWelcomeFunction]
})