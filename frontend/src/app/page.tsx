"use client";
import { loginAction } from "@/actions/login";
import SubmitBtn from "@/components/SubmitBtn";
import { loginDTO } from "@/types/login/login";
import { loginSchema } from "@/validation/schemas/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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

    if (!reqResult.isSuccess) {
      toast.error(reqResult.error.msg);
      return;
    }

    toast.success("کد ورود با موفقیت ارسال شد.");

    const params = new URLSearchParams({
      mobileNo: reqResult.phone,
      request_id: reqResult.request_id,
    });

    const url = `/loginwithphone?${params}`;
    router.push(url);
  };

  return (
    <div className="flex justify-center items-center  h-dvh">
      <div className="max-w-md lg:max-w-xl w-full">
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

          <SubmitBtn
            isSubmitting={isSubmitting}
            variant="contained"
            fullWidth
            sx={{ padding: "0.7rem 0" }}
          >
            ورود
          </SubmitBtn>
        </form>
      </div>
    </div>
  );
}
