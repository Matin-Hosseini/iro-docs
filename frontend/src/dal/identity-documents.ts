"use server";

import api from "@/lib/axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getUserIdentityDocuments = async () => {
  const cookiestore = await cookies();

  const token = cookiestore.get("auth_token")?.value || null;

  if (!token) return redirect("/");

  try {
    const res = await api.get("/user/identity-documents", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { isSuccess: true, documents: res.data.documents };
  } catch (error: any) {
    return { isSuccess: false, msg: error.response.data };
  }
};
