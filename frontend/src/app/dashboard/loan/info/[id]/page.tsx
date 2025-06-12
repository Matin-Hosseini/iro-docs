import SectionContainer from "@/app/dashboard/components/SectionContainer";
import api from "@/lib/axios";
import { getMe } from "@/utils/funcs/me";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Typography from "@mui/material/Typography";
import { Box, Card, TextField } from "@mui/material";
import { blue } from "@mui/material/colors";
import { getDate } from "@/utils/funcs/date/date";
import { IoIosPerson } from "react-icons/io";
import { RiShoppingCartFill } from "react-icons/ri";
import { IoDocumentAttach } from "react-icons/io5";
import Image from "next/image";
import IdentityDocuments from "./components/identity-Documents";

export default async function LoanRequestInfoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { isSuccess, userInfo, permissions } = await getMe();

  if (!isSuccess) return redirect("/");

  const { id } = await params;
  if (!id) return redirect("/");

  const cookieStores = await cookies();
  const authToken = cookieStores.get("auth_token");

  if (!authToken) return redirect("/");

  const getLoanInfo = async () => {
    try {
      const res = await api.get(`/loan/info/${id}`, {
        headers: { Authorization: `Bearer ${authToken.value}` },
      });

      return {
        loan: res.data.loan,
        loanDocuments: res.data.loanDocuments,
        identityDocuments: res.data.identityDocuments,
      };
    } catch (error) {
      return { loan: undefined };
    }
  };

  const { loan, loanDocuments, identityDocuments } = await getLoanInfo();
  console.log(identityDocuments);

  const UserInfoFields = ({ userInfo }: { userInfo: any }) => {
    const fieldsData = [
      {
        id: 1,
        label: "نام",
        value: userInfo.firstName,
      },
      {
        id: 2,
        label: "نام خانوادگی",
        value: userInfo.lastName,
      },
      {
        id: 3,
        label: "تاریخ تولد",
        value: getDate(new Date(userInfo.birth_date)).getCompleteFormat(),
      },
      { id: 4, label: "کد ملی", value: userInfo.national_id },
      { id: 5, label: "نام پدر", value: userInfo.fathers_name },
      { id: 6, label: "کد پستی", value: userInfo.postal_code },
      { id: 7, label: "آدرس محل سکونت", value: userInfo.address },
    ];

    if (!userInfo) return <></>;

    return fieldsData.map((item) => (
      <TextField
        key={item.id}
        label={item.label}
        value={item.value}
        fullWidth
        slotProps={{
          input: {
            readOnly: true,
          },
        }}
      />
    ));
  };

  return (
    <div>
      {loan ? (
        <>
          <SectionContainer className="mb-3">
            <Typography sx={{ color: blue[700], textAlign: "center" }}>
              جزئیات درخواست تسهیلات
            </Typography>
          </SectionContainer>

          <SectionContainer className="mb-3">
            <div className="flex items-center gap-2">
              <RiShoppingCartFill className="text-3xl text-violet-700" />
              <Typography>کالای درخواستی: {loan.product_name}</Typography>
            </div>
          </SectionContainer>

          <SectionContainer className="mb-3">
            <div className="mb-3 flex items-center gap-2">
              <IoIosPerson className="text-3xl text-blue-700" />
              <Typography>مشخصات درخواست دهنده </Typography>
            </div>
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              <UserInfoFields userInfo={userInfo} />
            </div>
          </SectionContainer>

          <IdentityDocuments documents={identityDocuments} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
