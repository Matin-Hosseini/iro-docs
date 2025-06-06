import { getMe } from "@/utils/funcs/me";
import { redirect } from "next/navigation";
import SectionContainer from "../../components/SectionContainer";
import UserInformationForm from "../../components/userInfoForm";
import DocumentUpload from "../../components/DocumentUpload";

import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import IdentityDocuments from "./identity-documents/components/identityDocuments";
import StepperTest from "@/components/stepper";
import api from "@/lib/axios";
import { cookies } from "next/headers";
import LoanRequestedProduct from "./components/RequestdProduct";

export default async function NewLoanRequestPage() {
  const { isSuccess, userInfo } = await getMe();

  if (!isSuccess) return redirect("/");

  const cookiestore = await cookies();

  const token = cookiestore.get("auth_token")?.value || null;

  try {
    const res = await api.get("/user/identity-documents", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(res.data);
  } catch (error: any) {
    console.log(error);
  }

  return (
    <div>
      <SectionContainer className="mb-3">
        <Alert>
          <Typography component={"p"}>
            جهت دریافت تسهیلات خرید کالا فرم های زیر را تکمیل کنید.
          </Typography>
          <Typography component={"p"}>
            پس از تکمیل موارد خواسته شده، اطلاعات توسط کارشناسان بررسی و نتیجه
            اعلام خواهد شد.
          </Typography>
        </Alert>
      </SectionContainer>

      <SectionContainer className="mb-3">
        <LoanRequestedProduct />
      </SectionContainer>

      <SectionContainer className="mb-3">
        <StepperTest />
      </SectionContainer>

      <SectionContainer className="mb-3">
        <p className="text-2xl mb-6">مشخصات فردی:</p>
        <UserInformationForm defaultValues={userInfo} />
      </SectionContainer>

      <SectionContainer>
        <SectionContainer className="mb-3">
          <Typography component={"p"} sx={{ fontSize: 24 }}>
            بارگزاری مدارک هویتی
          </Typography>
          <IdentityDocuments />
        </SectionContainer>

        <p className="text-2xl mb-6">بارگزاری مدارک:</p>
        <DocumentUpload />
      </SectionContainer>
    </div>
  );
}
