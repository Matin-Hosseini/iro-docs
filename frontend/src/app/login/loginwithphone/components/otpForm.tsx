"use client";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema } from "@/validation/schemas/login";
import { otpDTO } from "@/types/login/login";
import { optAction } from "@/actions/login";

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
      <Button
        variant="contained"
        fullWidth
        sx={{ padding: "0.7rem 0" }}
        type="submit"
      >
        {isSubmitting ? "..." : "ورود"}
      </Button>
    </form>
  );
}
