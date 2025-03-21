"use server";

import { signIn } from "@/auth";

export async function handleSignIn(formData: FormData) {
  try {
    await signIn("resend", formData, {
      callbackUrl: "http://localhost:3000/auth/create-account",
    });
  } catch (error) {
    console.error("Failed to sign in", error);
  }
}
