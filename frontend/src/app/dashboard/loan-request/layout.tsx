import { Alert } from "@mui/material";
import SectionContainer from "../components/SectionContainer";

export default function LoanRequestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SectionContainer className="mb-3">
        <Alert severity="info">
          جهت دریافت تسهیلات خرید کالا اطلاعات خواسته شده را تکمیل کنید.پس از
          بررسی مدارک نتیجه به صورت پیامک برایتان ارسال خواهد شد{" "}
        </Alert>
      </SectionContainer>
      {children}
    </>
  );
}
