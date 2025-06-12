"use server";

import axios from "axios";
import { cookies } from "next/headers";

const getCookie = async (name: string) => {
  const cookieStore = await cookies();

  const cookie = cookieStore.get(name);

  if (!cookie?.value) return undefined;

  return cookie.value;
};

const secretApi = axios.create({
  baseURL: process.env.BACKEND_BASE_URL,
  headers: {
    "x-api-key": process.env.API_KEY,
    Authorization: `Bearer ${await getCookie("auth_token")}`,
  },
});

export default secretApi;
