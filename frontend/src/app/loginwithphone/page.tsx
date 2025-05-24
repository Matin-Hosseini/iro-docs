import { z } from "zod";
import OtpForm from "./components/otpForm";
import Typography from "@mui/material/Typography";
import { phoneRegex } from "@/validation/regexes/phoneNumber";
import { redirect } from "next/navigation";

const searchParamsSchema = z.object({
  mobileNo: z.string().min(1).regex(phoneRegex),
  request_id: z.string().min(1),
});

export default async function LoginWithPhonePage({
  searchParams,
}: {
  searchParams: Promise<{ mobileNo: string; request_id: string }>;
}) {
  const searchParameters = await searchParams;

  const result = searchParamsSchema.safeParse(searchParameters);

  if (!result.success) return redirect("/login");
  return (
    <div className="h-dvh flex items-center justify-center">
      <div className="max-w-md lg:max-w-lg w-full">
        <div className="text-center mb-5">
          <Typography component={"h1"} className="text-3xl">
            سامانه جامع ایران اورجینال
          </Typography>
          <Typography component={"h3"}>
            کد ارسال شده به شماره {result.data.mobileNo} را وارد کنید.{" "}
          </Typography>
          <OtpForm
            mobileNo={result.data.mobileNo}
            request_id={result.data.request_id}
          />
        </div>
      </div>
    </div>
  );
}
