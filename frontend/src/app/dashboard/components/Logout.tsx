"use client";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useState } from "react";
import { logoutAction } from "@/actions/logout";

export default function Logout() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const logoutHandler = () => {
    logoutAction();
  };

  return (
    <>
      <Button
        onClick={() => setDialogOpen(true)}
        variant="outlined"
        color="error"
        fullWidth
      >
        خروج از حساب کاربری
      </Button>

      <Dialog onClose={() => setDialogOpen(false)} dir="rtl" open={dialogOpen}>
        <DialogTitle>خروج از حساب کاربری</DialogTitle>
        <DialogContent>
          <p>آیا از خروج از حساب کاربری خود اطمینان دارید؟</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} variant="outlined">
            خیر
          </Button>
          <Button onClick={logoutHandler} variant="contained" color="error">
            بله
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
