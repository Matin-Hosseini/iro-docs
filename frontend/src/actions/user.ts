"use server";

import api from "@/lib/axios";
import { userInfoDTO } from "@/types/user";
import { userInfoFormSchema } from "@/validation/schemas/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const updateUserInfoAction = async (
  data: userInfoDTO
): Promise<{ isSuccess: boolean; msg: string }> => {
  const validatedData = userInfoFormSchema.safeParse(data);

  if (!validatedData.success)
    return { isSuccess: false, msg: "اطلاعات وارد شده معتبر نمی باشد." };

  const cookieStore = await cookies();

  const authToken = cookieStore.get("auth_token");

  if (!authToken?.value) {
    return redirect("/");
  }

  try {
    await api.put("/user/info", validatedData.data, {
      headers: { Authorization: `Bearer ${authToken.value}` },
    });

    return { isSuccess: true, msg: "تغییرات با موفقیت ثبت شد." };
  } catch (error: any) {
    return { isSuccess: false, msg: error.response.data.msg };
  }
};
