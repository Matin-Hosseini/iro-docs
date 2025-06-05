"use server";

import api from "@/lib/axios";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const data = await req.formData();

  const cookieStore = await cookies();

  const authToken = cookieStore.get("auth_token");

  if (!authToken?.value)
    return new Response("ابتدا وارد پنل کاربری خود شوید", {
      status: 401,
    });

  try {
    const response = await api.post(
      `${process.env.BACKEND_BASE_URL}/user/identity-documents`,
      data,
      {
        headers: {
          Authorization: `Bearer ${authToken.value}`,
          "x-api-key": process.env.API_KEY,
        },
      }
    );

    return new Response(response.data.msg, { status: 200 });
  } catch (error: any) {
    console.log("api error");
    return new Response(error.response.data.msg, { status: 500 });
  }
}
