"use client";

import { useEffect, useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormHelperText from "@mui/material/FormHelperText";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import { conditions } from "@/config/data";

import { z } from "zod";
import calculate from "@/utils/installment-calculator";

export default function CalculatorForm() {
  const [activeRepaymentID, setActiveRepaymentID] = useState(0);

  const formSchema = z.object({
    price: z.string().min(1, "لطفا قیمت کالا را وارد کنید."),
    prePayment: z.string(),
    condition: z.string().min(1, "لطفا نحوه پرداخت را انتخاب کنید."),
  });

  const {
    handleSubmit,
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: "",
      prePayment: "",
      condition: "",
    },
  });

  const submitHandler = (e: any) => {
    // console.log(conditions[selectedCondition][activeRepaymentID]);

    calculate(
      selectedCondition,
      conditions[selectedCondition][activeRepaymentID],
      {
        price: +price.trim().split(",").join(""),
        prePayment: +prePayment.trim().split(",").join(""),
      }
    );
  };

  const price = watch("price");
  const prePayment = watch("prePayment");
  const selectedCondition = watch("condition");

  const formatNumber = (value: string) => {
    const priceWithoutChars = value.replace(/[^0-9]/g, "");

    const splittedValue = priceWithoutChars.split(",");

    const numberedValue = Number(splittedValue.join(""));

    if (numberedValue === 0) return "";

    return numberedValue.toLocaleString();
  };

  useEffect(() => {
    const formattedNumber = formatNumber(price);
    setValue("price", formattedNumber);
  }, [price, setValue]);

  useEffect(() => {
    const formattedNumber = formatNumber(prePayment);
    setValue("prePayment", formattedNumber);
  }, [prePayment, setValue]);

  useEffect(() => {
    setActiveRepaymentID(0);
  }, [selectedCondition]);

  // useEffect(() => {
  //   if (!selectedCondition) return;

  //   console.log(conditions[selectedCondition][activeRepaymentID]);
  // }, [activeRepaymentID, selectedCondition]);

  return (
    <Box component={"form"} onSubmit={handleSubmit(submitHandler)}>
      <TextField
        margin="dense"
        fullWidth
        id="product-price"
        label="قیمت محصول"
        placeholder="به تومان وارد کنید."
        variant="outlined"
        {...register("price")}
        error={!!errors.price}
        helperText={!!errors.price && errors.price?.message}
      />

      <TextField
        margin="dense"
        fullWidth
        id="pre-payment"
        label="پیش پرداخت"
        placeholder="به تومان وارد کنید."
        variant="outlined"
        inputMode="decimal"
        className="text-xs"
        {...register("prePayment")}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "orange", // رنگ کادر معمولی
            },
            "&:hover fieldset": {
              borderColor: "orange", // موقع هاور
            },
            "&.Mui-focused fieldset": {
              borderColor: "blue", // موقع فوکوس
            },
          },
          "& .MuiInputLabel-root": {
            color: "gray", // رنگ لیبل معمولی
          },
          "& .Mui-focused.MuiInputLabel-root": {
            color: "blue", // رنگ لیبل موقع فوکوس
          },
        }}
      />

      <Controller
        name="condition"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth margin="dense">
            <InputLabel id="conditions-select-form">نحوه پرداخت</InputLabel>
            <Select
              labelId="conditions-select-form"
              id="conditions-select"
              label="شرایط پرداخت"
              {...field}
              error={!!errors.condition}
            >
              <MenuItem dir="rtl" value={"bank-loan-check-guarantee"}>
                فروش اقساطی با تسهیلات بانکی
              </MenuItem>
              <MenuItem dir="rtl" value={"bank-loan-promissory-guarantee"}>
                فروش با سفته
              </MenuItem>
              <MenuItem dir="rtl" value={"company"}>
                فروش چکی (هر دو ماه یک چک)
              </MenuItem>
            </Select>
            {!!errors.condition && (
              <FormHelperText error={!!errors.condition}>
                {errors.condition.message}
              </FormHelperText>
            )}
          </FormControl>
        )}
      />

      {!selectedCondition ||
        (selectedCondition !== "none" && (
          <div className="mb-2">
            <Typography>بازه پرداخت</Typography>
            <div className=" items-center justify-start gap-3 overflow-auto">
              {conditions[selectedCondition].map((item: any, index: number) => {
                return (
                  <Button
                    sx={{
                      padding: "0.4rem 1rem",
                      whiteSpace: "nowrap",
                    }}
                    key={item.id}
                    variant={
                      activeRepaymentID === index ? "contained" : "outlined"
                    }
                    onClick={() => setActiveRepaymentID(index)}
                  >
                    {item.repayment} ماهه {item.desc ? `(${item.desc})` : ""}
                  </Button>
                );
              })}
            </div>
          </div>
        ))}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ padding: "0.5rem 0" }}
      >
        محاسبه اقساط
      </Button>
    </Box>
  );
}
