"use client";

import SubmitBtn from "@/components/SubmitBtn";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { userInfoDTO } from "@/types/user";
import { userInfoFormSchema } from "@/validation/schemas/user";

export default function UserInformationForm({
  defaultValues,
}: {
  defaultValues: userInfoDTO;
}) {
  const {
    register,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({ resolver: zodResolver(userInfoFormSchema), defaultValues });

  const userInfoSubmitHandler = async (data: userInfoDTO) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(userInfoSubmitHandler)}>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-4">
        <TextField
          error={!!errors.firstName}
          {...register("firstName")}
          label="نام"
          placeholder="مطابق شناسنامه"
          fullWidth
          helperText={!!errors.firstName && errors.firstName.message}
        />
        <TextField
          error={!!errors.lastName}
          {...register("lastName")}
          label="نام خانوادگی"
          placeholder="مطابق شناسنامه"
          fullWidth
          helperText={!!errors.lastName && errors.lastName.message}
        />
        <TextField
          error={!!errors.natinal_id}
          {...register("natinal_id")}
          label="کد ملی"
          fullWidth
          helperText={!!errors.natinal_id && errors.natinal_id.message}
        />
        <TextField
          error={!!errors.fathers_name}
          {...register("fathers_name")}
          label="نام پدر"
          fullWidth
          helperText={!!errors.fathers_name && errors.fathers_name.message}
        />

        <TextField
          error={!!errors.requested_product}
          {...register("requested_product")}
          label="کالای درخواستی"
          fullWidth
          helperText={
            !!errors.requested_product && errors.requested_product.message
          }
        />
        <TextField
          error={!!errors.postal_code}
          {...register("postal_code")}
          label="کد پستی"
          fullWidth
          helperText={!!errors.postal_code && errors.postal_code.message}
        />
        <TextField
          error={!!errors.address}
          {...register("address")}
          label="آدرس محل سکونت"
          multiline
          fullWidth
          helperText={!!errors.address && errors.address.message}
        />

        <Controller
          name="grade_score"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="gradeScore-select-form">رتبه اعتباری</InputLabel>
              <Select
                labelId="gradeScore-select-form"
                id="gradeScore-select"
                label="رتبه اعتباری"
                {...field}
                error={!!errors.grade_score}
              >
                <MenuItem dir="rtl" value={"A"}>
                  A
                </MenuItem>
                <MenuItem dir="rtl" value={"B"}>
                  B
                </MenuItem>
                <MenuItem dir="rtl" value={"C"}>
                  C
                </MenuItem>
              </Select>

              <FormHelperText error={!!errors.grade_score}>
                <span>{errors.grade_score?.message}</span>
              </FormHelperText>
              <FormHelperText>
                <span
                  className="cursor-pointer"
                  onClick={() => console.log("hello")}
                >
                  رتبه اعتباری چیست؟
                </span>
              </FormHelperText>
            </FormControl>
          )}
        />
      </div>
      <SubmitBtn isSubmitting={isSubmitting}>تکمیل اطلاعات</SubmitBtn>
    </form>
  );
}
