import { getMe } from "@/utils/funcs/me";
import { redirect } from "next/navigation";
import SectionContainer from "../components/SectionContainer";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { IoSadOutline } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";

import { red } from "@mui/material/colors";
import Link from "next/link";

export default async function DashboardPage() {
  const { isSuccess, userInfo } = await getMe();

  if (!isSuccess) return redirect("/");

  return (
    <div>
      <SectionContainer>
        <Typography component={"p"} sx={{ fontSize: 24, mb: 2 }}>
          تسهیلات درخواستی شما
        </Typography>

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
            <IoSadOutline className="text-5xl mb-3"/>
            <Typography>شما هیچ تسهیلاتی درخواست نداده اید.</Typography>
          </Box>
        </Box>
        <Link href={"/dashboard/loan-request/new"}>
          <Button variant="contained" fullWidth startIcon={<IoIosAdd />}>
            درخواست جدید تسهیلات خرید کالا
          </Button>
        </Link>
      </SectionContainer>
    </div>
  );
}
