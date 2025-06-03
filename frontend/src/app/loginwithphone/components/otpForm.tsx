"use client";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema } from "@/validation/schemas/login";
import { otpDTO } from "@/types/login/login";
import { optAction } from "@/actions/login";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import SubmitBtn from "@/components/SubmitBtn";

export default function OtpForm({
  mobileNo,
  request_id,
}: {
  mobileNo: string;
  request_id: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(otpSchema),
  });

  const otpSubmitHandler = async (data: otpDTO) => {
    const result = await optAction(data, mobileNo, request_id);

    if (!result.isSuccess) {
      toast.error(result.error.msg);

      return;
    }

    toast.success(`خوش آمدید. \n  در حال انتقال به پنل کاربری خود هستید...`);
    redirect("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(otpSubmitHandler)}>
      <TextField
        error={!!errors.code}
        margin="normal"
        fullWidth
        id="phone-number"
        label="کد ارسال شده"
        variant="outlined"
        {...register("code")}
        helperText={!!errors.code && errors.code.message}
      />

      <SubmitBtn
        isSubmitting={isSubmitting}
        variant="contained"
        fullWidth
        sx={{ padding: "0.7rem 0" }}
      >
        ورود
      </SubmitBtn>
    </form>
  );
}
