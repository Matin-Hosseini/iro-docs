import SectionContainer from "@/app/dashboard/components/SectionContainer";
import UserInformationForm from "@/app/dashboard/components/userInfoForm";
import { getMe } from "@/utils/funcs/me";
import { redirect } from "next/navigation";

export default async function PersonalInfoPage() {
  const { isSuccess, userInfo } = await getMe();

  if (!isSuccess) return redirect("/");

  return (
    <>
      <div>
        <SectionContainer className="mb-3">
          <p className="text-2xl mb-6">مشخصات فردی:</p>
          <UserInformationForm defaultValues={userInfo} />
        </SectionContainer>
      </div>
    </>
  );
}
