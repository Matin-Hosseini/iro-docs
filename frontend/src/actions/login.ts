"use server";

import { cookies } from "next/headers";

import { loginDTO } from "@/types/login/login";
import { loginSchema } from "@/validation/schemas/login";

export const loginAction = async (data: loginDTO) => {
  const validation = loginSchema.safeParse(data);

  const res = await fetch(`${process.env.BACKEND_BASE_URL}/auth/otp`, {
    method: "POST",
    body: JSON.stringify({
      phone: validation.data?.phoneNumber,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });

  const resData = await res.json();
  console.log(resData);

  const result = { ...resData, isSuccess: true };

  return result;
};

export const optAction = async (
  formData: any,
  mobileNo: string,
  request_id: string
) => {
  const res = await fetch(`${process.env.BACKEND_BASE_URL}/auth/otp/validate`, {
    method: "POST",
    body: JSON.stringify({
      otpCode: formData.code,
      phone: mobileNo,
      reqId: request_id,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });
  const resData = await res.json();
  console.log(resData);

  const cookieStore = await cookies();
  cookieStore.set({
    name: "auth_token",
    value: resData.token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 روز
  });
  const result = { isSuccess: true };

  return result;
};
