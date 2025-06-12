"use client";

import SectionContainer from "@/app/dashboard/components/SectionContainer";
import { IoDocumentAttach } from "react-icons/io5";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { BsThreeDots } from "react-icons/bs";
import React, { useState } from "react";
import { blue, red } from "@mui/material/colors";
import { IoClose } from "react-icons/io5";

import { IoCheckmarkSharp } from "react-icons/io5";
import ThreeDotsLoading from "@/components/loadings/ThreeDots";
import { Button, Dialog, DialogContent } from "@mui/material";
import { identityDocumentStatusAction } from "@/actions/document-status";
import {
  generateStatusColors,
  generateStatusText,
} from "../../../request/new/identity-documents/components/identityDocuments";

const StatusActionItem = ({
  children,
  itemId,
  status,
}: //   onStatus,
{
  children: React.ReactNode;
  itemId: string;
  status: string;
  //   onStatus: (itemId: string, status: string) => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleClick = async () => {
    console.log(itemId, status);

    setIsSubmitting(true);

    const result = await identityDocumentStatusAction(itemId, status);

    setIsSubmitting(false);
  };

  return (
    <>
      <MenuItem sx={{ width: "400px", height: 36 }} onClick={handleClick}>
        {children}
      </MenuItem>

      <Dialog open={isSubmitting} fullWidth maxWidth={"xs"}>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <ThreeDotsLoading />
            <Typography>در حال ارسال اطلاعات</Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

const StatusActionMenu = ({ item }: { item: any }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton
        id="actions-button"
        onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
          setAnchorEl(event.currentTarget)
        }
      >
        <BsThreeDots />
      </IconButton>
      <Menu
        sx={{ boxShadow: "none" }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        slotProps={{
          list: {
            "aria-labelledby": "actions-button",
          },
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <StatusActionItem itemId={item._id} status="approved">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              color: blue[500],
            }}
          >
            <IoCheckmarkSharp />
            تایید
          </Box>
        </StatusActionItem>
        <StatusActionItem itemId={item._id} status="rejected">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              color: red[500],
            }}
          >
            <IoClose />
            رد
          </Box>
        </StatusActionItem>
      </Menu>
    </>
  );
};

export default function IdentityDocuments({ documents }: { documents: any }) {
  return (
    <SectionContainer className="mb-3">
      <div className="mb-3 flex items-center gap-2">
        <IoDocumentAttach className="text-3xl text-green-700" />
        <Typography>مدارک هویتی</Typography>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {documents.map((item: any, index: number) => {
          console.log(item._id);

          return (
            <Box key={item._id}>
              <Card variant="outlined" sx={{ padding: 1 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    height: "100%",
                  }}
                >
                  <div className="bg-slate-300 flex justify-center rounded-md mb-3 h-[250px]">
                    <img
                      src={item.fileLink}
                      alt={item.title}
                      className="max-w-[250px] max-h-[250px] w-full h-full object-cover"
                    />
                  </div>
                  <Typography
                    component={"h3"}
                    sx={{ fontSize: 13, textAlign: "center" }}
                  >
                    {item.title}
                    {item._id}
                  </Typography>
                </Box>
                {item.status === "pending" ? (
                  <StatusActionMenu item={item} />
                ) : (
                  <Button
                    fullWidth
                    sx={{
                      background: generateStatusColors(item.status),
                      color: "white",
                      mt: 1,
                    }}
                  >
                    {generateStatusText(item.status)}
                  </Button>
                )}
              </Card>
            </Box>
          );
        })}
      </div>
    </SectionContainer>
  );
}
