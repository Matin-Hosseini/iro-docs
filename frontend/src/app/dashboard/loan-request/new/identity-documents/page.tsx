import SectionContainer from "@/app/dashboard/components/SectionContainer";
import Typography from "@mui/material/Typography";
import IdentityDocumentsUpload from "./components/identityDocuments";
import { getMe } from "@/utils/funcs/me";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import api from "@/lib/axios";
import { getUserIdentityDocuments } from "@/dal/identity-documents";
import Alert from "@mui/material/Alert";

export default async function IdentityDocumentsPage() {
  const { isSuccess, userInfo } = await getMe();

  if (!isSuccess) return redirect("/");

  const { isSuccess: isDocumentsSuccess, documents } =
    await getUserIdentityDocuments();

  if (!isDocumentsSuccess) return redirect("/");

  return (
    <SectionContainer>
      <Typography sx={{ fontSize: 24, mb: 2 }}>بارگزاری مدارک هویتی</Typography>
      <Alert severity="warning">
        <Typography component={"p"} sx={{ fontSize: 18, mb: 1 }}>
          حین بارگزاری مدارک موارد زیر را رعایت کنید. در غیر این صورت مدارک شما
          رد خواهد شد.
        </Typography>
        <Typography component={"p"} sx={{ fontSize: 14 }}>
          1- عکس های باید واضح و با کیفیت باشد.
        </Typography>
        <Typography component={"p"} sx={{ fontSize: 14 }}>
          2- عکس ها تار نباشد.
        </Typography>
        <Typography component={"p"} sx={{ fontSize: 14 }}>
          3- فرمت عکس ها حتما باید jpg, png یا webp باشد.
        </Typography>
        <Typography component={"p"} sx={{ fontSize: 14 }}>
          4- حداکثر حجم مجاز عکس 2 مگابایت می باشد.
        </Typography>
        <Typography component={"p"} sx={{ fontSize: 14 }}>
          5- پیشنهاد می شود از نرم افزاری مانند camscanner استفاده کنید.
        </Typography>
      </Alert>
      <IdentityDocumentsUpload documents={documents} />
    </SectionContainer>
  );
}
