"use client";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema } from "@/validation/schemas/login";
import { otpDTO } from "@/types/login/login";

export default function OtpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(otpSchema),
  });

  const otpSubmitHandler = (data: otpDTO) => {};

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
