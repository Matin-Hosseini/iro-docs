import SectionContainer from "@/app/dashboard/components/SectionContainer";
import Typography from "@mui/material/Typography";
import IdentityDocumentsUpload from "./components/identityDocuments";
import { getMe } from "@/utils/funcs/me";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import api from "@/lib/axios";
import { getUserIdentityDocuments } from "@/dal/identity-documents";

export default async function IdentityDocumentsPage() {
  const { isSuccess, userInfo } = await getMe();

  if (!isSuccess) return redirect("/");

  const { isSuccess: isDocumentsSuccess, documents } =
    await getUserIdentityDocuments();

  if (!isDocumentsSuccess) return redirect("/");

  return (
    <SectionContainer>
      <Typography>بارگزاری مدارک هویتی</Typography>
      <IdentityDocumentsUpload documents={documents} />
    </SectionContainer>
  );
}
