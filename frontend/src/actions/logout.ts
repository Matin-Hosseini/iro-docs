"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logoutAction = async () => {
  const cookieStore = await cookies();

  cookieStore.set("auth_token", "", {
    httpOnly: true,
    secure: true,
    path: "/",
    expires: new Date(0),
  });

  return redirect("/");
};
