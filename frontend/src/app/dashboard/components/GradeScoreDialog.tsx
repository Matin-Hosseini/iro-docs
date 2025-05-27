"use client";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Link from "next/link";

export default function GradeScoreDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog
      dir="rtl"
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">رتبه اعتبار سنجی بانکی</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          رتبه اعتبای نشان دهنده سوابق مالی شما بر اساس انجام تعهدات بانکی و
          پرداخت به موقع وام بانکی می باشد. شما می توانید با استفاده از{" "}
          <Button>
            <Link href={"https://etebarito.nics24.ir/login"} target="_blank">
              سامانه اعتباریتو
            </Link>
          </Button>{" "}
          رتبه اعتباری و سوابق پرداختی وام های خود را دریافت کنید. تسهیلات
          دریافتی شما از بانک های و موسستات مالی مختلف دریافت می شود و با توجه
          به نحوه پرداخت اقساطتان رتبه اعتباری به شما اعطا می گردد. طبیعتاً
          پرداخت اقساط به موقع و بدون تاخیر باشد، رتبه اعتباریتان نیز بالاتر
          خواهد بود.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          خواندم
        </Button>
      </DialogActions>
    </Dialog>
  );
}
