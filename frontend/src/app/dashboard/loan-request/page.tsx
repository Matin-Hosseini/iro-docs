import { getMe } from "@/utils/funcs/me";
import { redirect } from "next/navigation";
import SectionContainer from "../components/SectionContainer";
import UserInformationForm from "../components/userInfoForm";
import DocumentUpload from "../components/DocumentUpload";

export default async function DashboardPage() {
  const { isSuccess, userInfo } = await getMe();

  if (!isSuccess) return redirect("/");

  return (
    <div>
      <SectionContainer className="mb-3">
        <p className="text-2xl mb-6">مشخصات فردی:</p>
        <UserInformationForm defaultValues={userInfo} />
      </SectionContainer>
      <SectionContainer>
        <p className="text-2xl mb-6">بارگزاری مدارک:</p>
        <DocumentUpload />
      </SectionContainer>
    </div>
  );
}
