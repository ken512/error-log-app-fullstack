"use server";

import { signOut } from "@/utils/auth/auth";

export const logout = async () => {
  await signOut({
    redirectTo: "/login"
  });
};