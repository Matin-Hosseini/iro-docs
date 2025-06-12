import api from "@/lib/axios";
import secretApi from "@/lib/secretApi";
import { getMe } from "@/utils/funcs/me";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoanRequestInfoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { isSuccess, userInfo } = await getMe();

  if (!isSuccess) return redirect("/");

  const { id } = await params;

  const cookieStores = await cookies();
  const authToken = cookieStores.get("auth_token");

  if (!authToken) return redirect("/");

  const getLoanInfo = async () => {
    const reqBody = { tracking_code: id };

    try {
      const res = await api.post("/loan/info", reqBody, {
        headers: { Authorization: `Bearer ${authToken.value}` },
      });

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  await getLoanInfo();

  return (
    <div>
      <h1>this is the loan request page {id}</h1>
    </div>
  );
}
