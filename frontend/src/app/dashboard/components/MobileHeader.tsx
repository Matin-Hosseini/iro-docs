"use client";

import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import SectionContainer from "./SectionContainer";
import { IoMenu } from "react-icons/io5";
import { useEffect, useState } from "react";
import { DashboardSideBarContent } from "./DashboardSidebar";
import Box from "@mui/material/Box";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function MobileHeader() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const pathName = usePathname();

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathName]);

  return (
    <header className="lg:hidden mb-3">
      <SectionContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <IconButton onClick={() => setDrawerOpen(true)}>
              <IoMenu />
            </IconButton>
            <Drawer
              sx={{ width: 400 }}
              dir="rtl"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            >
              <Box sx={{ width: 250, height: "100%" }}>
                <DashboardSideBarContent />
              </Box>
            </Drawer>
          </Box>
          <Image
            width={100}
            height={100}
            src={"/images/logo/gray.webp"}
            alt="ایران اورجینال"
            className="ml-6"
          />
          <Box></Box>
        </Box>
      </SectionContainer>
    </header>
  );
}
