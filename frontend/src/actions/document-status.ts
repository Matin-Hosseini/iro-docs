"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import api from "@/lib/axios";

export const identityDocumentStatusAction = async (
  id: string,
  status: string
) => {
  const cookieStore = await cookies();

  const authToken = cookieStore.get("auth_token");

  if (!authToken?.value) return redirect("/");

  try {
    const res = await api.patch(
      `/user/identity-documents/${id}`,
      { status },
      { headers: { Authorization: `Bearer ${authToken.value}` } }
    );

    console.log(res.data);
  } catch (error) {}
};
