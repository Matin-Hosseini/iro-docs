"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const uploadDocumentsAction = async (formData: FormData) => {
  const cookieStore = await cookies();

  const authToken = cookieStore.get("auth_token");

  if (!authToken?.value) return redirect("/");

  const response = await fetch(
    `${process.env.BACKEND_BASE_URL}/document/upload`,
    {
      body: formData,
      method: "POST",
      headers: { Authorization: `Bearer ${authToken.value}` },
    }
  );

  console.log(response);
};
