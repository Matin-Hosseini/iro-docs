import { getMe } from "@/utils/funcs/me";
import { redirect } from "next/navigation";
import SectionContainer from "../../components/SectionContainer";
import UserInformationForm from "../../components/userInfoForm";
import DocumentUpload from "../../components/DocumentUpload";
import CalculatorForm from "@/components/CalculatorForm";

import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { grey } from "@mui/material/colors";

export default async function NewLoanRequestPage() {
  const { isSuccess, userInfo } = await getMe();

  if (!isSuccess) return redirect("/");

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
        <Typography component={"p"} sx={{ fontSize: 24 }}>
          تسهیلات شما
        </Typography>
      </SectionContainer>

      <SectionContainer className="mb-3">
        <Typography component={"p"} sx={{ fontSize: 24 }}>
          محاسبه گر اقساط
        </Typography>

        <Typography
          component={"p"}
          sx={{ fontSize: 15, mb: 2, color: grey[600] }}
        >
          از شرایط و نحوه پرداخت متنوع اقساط خود مطلع شوید.
        </Typography>

        <Typography component={"p"}></Typography>
        <CalculatorForm />
      </SectionContainer>

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
