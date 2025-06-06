"use server";

import { loanRequestDTO } from "@/types/loan/request";
import { newLoanRequestSchema } from "@/validation/schemas/loan/request";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import api from "@/lib/axios";

export const newLoanRequestAction = async (data: loanRequestDTO) => {
  const validationResult = newLoanRequestSchema.safeParse(data);

  if (validationResult.error)
    return { isSuccess: false, msg: "اطلاعات ورودی نامعتبر است" };

  const cookieStore = await cookies();

  const authToken = cookieStore.get("auth_token");

  if (!authToken?.value) return redirect("/");

  try {
    const res = await api.post("/loan/request", validationResult.data, {
      headers: { Authorization: `Bearer ${authToken.value}` },
    });

    return { isSuccess: true, req_id: res.data.req_id };
  } catch (error) {}
};
