"use server";

import { cookies } from "next/headers";

import { loginDTO } from "@/types/login/login";
import { loginSchema } from "@/validation/schemas/login";
import api from "@/lib/axios";

export const loginAction = async (data: loginDTO) => {
  const validation = loginSchema.safeParse(data);
  try {
    const resData = await api.post("/auth/otp", {
      phone: validation.data?.phoneNumber,
    });

    return { ...resData.data, isSuccess: true };
  } catch (error: any) {
    return { isSuccess: false, error: error.response.data };
  }
};

export const optAction = async (
  formData: any,
  mobileNo: string,
  request_id: string
) => {
  try {
    const res = await api.post("/auth/otp/validate", {
      otpCode: formData.code,
      phone: mobileNo,
      reqId: request_id,
    });

    const data = res.data;

    const cookieStore = await cookies();
    cookieStore.set({
      name: "auth_token",
      value: data.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return { isSuccess: true, data };
  } catch (error: any) {
    return { isSuccess: false, error: error.response.data };
  }
};
