import { getMe } from "@/utils/funcs/me";
import { redirect } from "next/navigation";
import SectionContainer from "../../components/SectionContainer";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { IoSadOutline } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";

import { red } from "@mui/material/colors";
import Link from "next/link";
import { cookies } from "next/headers";
import api from "@/lib/axios";
import LoanRequestTable from "../../loan-request/components/LoanRequestTable";

export default async function DashboardPage() {
  const { isSuccess, userInfo } = await getMe();

  if (!isSuccess) return redirect("/");

  const cookieStore = await cookies();

  const authToken = cookieStore.get("auth_token");

  const getUserLoanRequests = async () => {
    try {
      const res = await api.get("/loan/request/all", {
        headers: { Authorization: `Bearer ${authToken?.value}` },
      });

      return { isSuccess: true, requestedLoans: res.data.requestedLoans };
    } catch (error) {
      return { isSuccess: false };
    }
  };

  const { isSuccess: reqLoansSuccess, requestedLoans } =
    await getUserLoanRequests();

  if (!reqLoansSuccess) return redirect("/");

  return (
    <div>
      <SectionContainer>
        <Typography component={"p"} sx={{ fontSize: 24, mb: 2 }}>
          تسهیلات درخواستی شما
        </Typography>

        {!!requestedLoans.length ? (
          <LoanRequestTable requestedLoans={requestedLoans} />
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px dashed",
              borderColor: red[500],
              color: red[500],
              mb: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "4rem 0",
              }}
            >
              <IoSadOutline className="text-5xl mb-3" />
              <Typography>شما هیچ تسهیلاتی درخواست نداده اید.</Typography>
            </Box>
          </Box>
        )}

        <Link href={"/dashboard/loan/request/new/personal-info"}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<IoIosAdd />}
            sx={{ py: 1, mt: 2 }}
          >
            درخواست جدید تسهیلات خرید کالا
          </Button>
        </Link>
      </SectionContainer>
    </div>
  );
}
