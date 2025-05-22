"use server";

import { loginDTO } from "@/types/login/login";
import { loginSchema } from "@/validation/schemas/login";

export const loginAction = async (data: loginDTO) => {
  const validation = loginSchema.safeParse(data);

  const res = await fetch(`${process.env.BACKEND_BASE_URL}/auth/login`, {
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
