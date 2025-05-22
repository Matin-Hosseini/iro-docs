"use client";
import { loginAction } from "@/actions/login";
import { loginDTO } from "@/types/login/login";
import { loginSchema } from "@/validation/schemas/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  const loginSubmitHandler = async (data: loginDTO) => {
    const reqResult = await loginAction(data);

    if (!reqResult.isSuccess) return;

    const params = new URLSearchParams({
      mobileNo: reqResult.phone,
      request_id: reqResult.request_id,
    });

    const url = `/login/loginwithphone?${params}`;
    router.push(url);
  };

  return (
    <div className="h-dvh flex items-center justify-center">
      <div className="max-w-md lg:max-w-lg w-full">
        <div className="text-center mb-5">
          <h1 className="text-3xl">سامانه جامع ایران اورجینال</h1>
          <h3>خوش آمدید!</h3>
        </div>
        <form onSubmit={handleSubmit(loginSubmitHandler)}>
          <TextField
            error={!!errors.phoneNumber}
            margin="normal"
            fullWidth
            id="phone-number"
            label="شماره موبایل"
            variant="outlined"
            placeholder="مثال: 09123456789"
            {...register("phoneNumber")}
            helperText={!!errors.phoneNumber && errors.phoneNumber.message}
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
      </div>
    </div>
  );
}
