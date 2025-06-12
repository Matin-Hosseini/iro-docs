"use client";

import { newLoanRequestAction } from "@/actions/laon-request";
import SubmitBtn from "@/components/SubmitBtn";
import { loanRequestDTO } from "@/types/loan/request";
import { newLoanRequestSchema } from "@/validation/schemas/loan/request";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function LoanRequestedProduct() {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({ resolver: zodResolver(newLoanRequestSchema) });

  const router = useRouter();

  const submitHandler = async (data: loanRequestDTO) => {
    console.log(data);

    const result = await newLoanRequestAction(data);

    if (!result?.isSuccess) return;

    const params = new URLSearchParams({
      req_id: result.req_id,
    });

    router.replace(`/dashboard/loan/request/new/loan-documents?${params}`);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-2"
    >
      <TextField
        {...register("product_name")}
        fullWidth
        label="نام کالای درخواستی"
        error={!!errors.product_name}
        helperText={!!errors.product_name && errors.product_name.message}
      />
      <SubmitBtn isSubmitting={isSubmitting}>ثبت</SubmitBtn>
    </form>
  );
}
