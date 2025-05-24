import api from "@/lib/axios";
import { cookies } from "next/headers";
import UserInformationForm from "./components/userInfoForm";

export default async function DashboardPage() {
  const cookiestore = await cookies();

  const token = cookiestore.get("auth_token")?.value || null;

  const res = await api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(res.data);

  return (
    <div>
      <h1>این صفحه داشبورد است</h1>
      {res.data.user.firstName}
      <UserInformationForm />
    </div>
  );
}
