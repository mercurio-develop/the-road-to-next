"use server";

import { z } from "zod";
import {
  ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/components/form/utils/to-action-state";
import { prisma } from "@/lib/prisma";
import { setCookieByKey } from "@/actions/cookies";
import { Prisma } from ".prisma/client";
import { getAuthOrRedirect } from "@/features/auth/queries/get-auth-or-redirect";
import { validateEmailVerificationCode } from "@/features/auth/utils/validate-email-verification-code";

// Schema for updating profile
const updateProfileSchema = z.object({
  firstName: z.string().min(1).max(191),
  lastName: z.string().min(1).max(191),
  username: z
    .string()
    .min(1)
    .max(191)
    .refine(
      (value) => !value.includes(" "),
      "Username cannot contain spaces",
    ),
  email: z.email().min(1, { message: "Is Required" }).max(191),
  code: z.string().optional(),
});

export const updateProfile = async (
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const { user } = await getAuthOrRedirect({ checkEmailVerified: false });

  try {
    const { username, email, firstName, lastName, code } =
      await updateProfileSchema.parseAsync(Object.fromEntries(formData));

    const emailChanged = email !== user.email;

    // If email changed, code is REQUIRED
    if (emailChanged && !code) {
      return toActionState(
        "ERROR",
        "Verification code is required when changing email",
        formData,
      );
    }

    // Validate code if email changed
    if (emailChanged && code) {
      if (code.length !== 8) {
        return toActionState(
          "ERROR",
          "Verification code must be 8 characters",
          formData,
        );
      }

      const validCode = await validateEmailVerificationCode(
        user.id,
        email,
        code,
      );

      if (!validCode) {
        return toActionState(
          "ERROR",
          "Invalid or expired verification code",
          formData,
        );
      }
    }

    // Update profile
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        firstName,
        lastName,
        username,
        email,
      },
    });

    await setCookieByKey("toast", "Profile updated successfully");

    return toActionState("SUCCESS", "Profile updated successfully", formData);
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return toActionState(
        "ERROR",
        "Either email or username is already in use",
        formData,
      );
    }

    return fromErrorToActionState(error, formData);
  }
};
