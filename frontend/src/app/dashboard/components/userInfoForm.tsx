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
import GradeScoreDialog from "./GradeScoreDialog";
import { useState } from "react";
import { updateUserInfoAction } from "@/actions/user";
import { toast } from "sonner";

import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import "dayjs/locale/fa";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";

import dayjs from "dayjs";

import { faIR } from "@mui/x-date-pickers/locales";
import { useRouter } from "next/navigation";

export default function UserInformationForm({
  defaultValues,
}: {
  defaultValues: userInfoDTO;
}) {
  const router = useRouter();

  const {
    register,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(userInfoFormSchema),
    defaultValues: { ...defaultValues },
  });

  const userInfoSubmitHandler = async (data: userInfoDTO) => {
    console.log("submitting");
    const result = await updateUserInfoAction(data);

    if (!result?.isSuccess) {
      return toast.error(result.msg);
    }

    toast.success("اطلاعات شما ثبت شد.");
    router.replace("/dashboard/loan/request/new/identity-documents");
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
          error={!!errors.national_id}
          {...register("national_id")}
          label="کد ملی"
          fullWidth
          helperText={!!errors.national_id && errors.national_id.message}
        />

        <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
          <Controller
            name="birth_date"
            control={control}
            render={({ field, fieldState }) => (
              <DatePicker
                label="تاریخ تولد"
                sx={{
                  ".MuiPickersSectionList-root": {
                    justifyContent: "flex-end",
                  },
                }}
                localeText={{
                  ...faIR.components.MuiLocalizationProvider.defaultProps
                    .localeText,
                  okButtonLabel: "ثبت",
                }}
                slotProps={{
                  textField: {
                    error: !!fieldState.error,
                    helperText: fieldState.error?.message,
                  },
                }}
                defaultValue={dayjs(String(field.value)).toDate() || null}
                onAccept={field.onChange}
              />
            )}
          />
        </LocalizationProvider>

        <TextField
          error={!!errors.fathers_name}
          {...register("fathers_name")}
          label="نام پدر"
          fullWidth
          helperText={!!errors.fathers_name && errors.fathers_name.message}
        />

        {/* <TextField
          error={!!errors.requested_product}
          {...register("requested_product")}
          label="کالای درخواستی"
          fullWidth
          helperText={
            !!errors.requested_product && errors.requested_product.message
          }
        /> */}
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

        {/* <Controller
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
                <MenuItem dir="rtl" value={"D"}>
                  D
                </MenuItem>
                <MenuItem dir="rtl" value={"E"}>
                  E
                </MenuItem>
              </Select>

              <FormHelperText error={!!errors.grade_score}>
                <span>{errors.grade_score?.message}</span>
              </FormHelperText>
              <FormHelperText>
                <span
                  className="cursor-pointer"
                  onClick={() => setDialogOpen(true)}
                >
                  رتبه اعتباری چیست؟
                </span>
                <GradeScoreDialog
                  open={dialogOpen}
                  onClose={() => setDialogOpen(false)}
                />
              </FormHelperText>
            </FormControl>
          )}
        /> */}
      </div>
      <SubmitBtn isSubmitting={isSubmitting}>ثبت و ادامه</SubmitBtn>
    </form>
  );
}
