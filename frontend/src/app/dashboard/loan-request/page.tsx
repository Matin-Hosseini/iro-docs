import { getMe } from "@/utils/funcs/me";
import { redirect } from "next/navigation";
import SectionContainer from "../components/SectionContainer";
import UserInformationForm from "../components/userInfoForm";

export default async function DashboardPage() {
  const { isSuccess, userInfo } = await getMe();

  if (!isSuccess) return redirect("/");

  return (
    <div>
      <SectionContainer>
        <p className="text-2xl mb-3">مشخصات فردی:</p>
        <UserInformationForm defaultValues={userInfo} />
      </SectionContainer>
    </div>
  );
}
