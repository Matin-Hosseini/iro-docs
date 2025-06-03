"use server";

import api from "@/lib/axios";
import { cookies } from "next/headers";

const getMe = async () => {
  const cookiestore = await cookies();

  const token = cookiestore.get("auth_token")?.value || null;

  try {
    const res = await api.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      isSuccess: true,
      userInfo: res.data.user,
      permissions: res.data.permissions,
    };
  } catch (error: any) {
    return { isSuccess: false, msg: error.response.data };
  }
};

export { getMe };
