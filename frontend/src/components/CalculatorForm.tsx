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

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import Alert from "@mui/material/Alert";

import "swiper/css";
import InstallMentInfo from "./InstallMentInfo";

export default function CalculatorForm() {
  const [activeRepaymentID, setActiveRepaymentID] = useState(0);
  const [minPrePaymentError, setMinPrePaymentError] = useState<any>(null);

  const [installmentsInfo, setInstallmentsInfo] = useState<any>(null);

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

  const submitHandler = (data: any) => {
    const price = +data.price.trim().split(",").join("");
    const prePayment = +data.prePayment.trim().split(",").join("");

    if (prePayment >= price) {
      setMinPrePaymentError({
        text: "پیش پرداخت نمی تواند بیشتر یا برابر مبلغ کالا باشد.",
      });
      return;
    }

    const calculatedData = calculate(
      selectedCondition,
      conditions[selectedCondition][activeRepaymentID],
      {
        price,
        prePayment,
      }
    );

    if (!calculatedData.success) {
      setMinPrePaymentError({
        minPrePayment: calculatedData.minPrePayment,
        text: ` با توجه به شرایط انتخابی شما حداقل پیش پرداخت ${Math.ceil(
          calculatedData.minPrePayment
        ).toLocaleString()} تومان می باشد.`,
      });
      return;
    }

    setMinPrePaymentError(null);

    setInstallmentsInfo({ condition: selectedCondition, ...calculatedData });
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

  //number formatter on change for price number
  useEffect(() => {
    const formattedNumber = formatNumber(price);
    setValue("price", formattedNumber);
  }, [price, setValue]);

  //number formatter on change for prePayment number
  useEffect(() => {
    const formattedNumber = formatNumber(prePayment);
    setValue("prePayment", formattedNumber);
  }, [prePayment, setValue]);

  useEffect(() => {
    setActiveRepaymentID(0);
  }, [selectedCondition]);

  useEffect(() => {
    if (!selectedCondition) return;

    const NumberedPrice = +price.trim().split(",").join("");
    const NumberedPrePayment = +prePayment.trim().split(",").join("");

    if (NumberedPrice === 0) {
      setMinPrePaymentError(null);
      return;
    }

    if (NumberedPrePayment >= NumberedPrice) {
      setMinPrePaymentError({
        text: "پیش پرداخت نمی تواند بیشتر یا برابر مبلغ کالا باشد.",
      });
      return;
    }

    const repaymentInfo =
      conditions[selectedCondition][activeRepaymentID] ||
      conditions[selectedCondition][0];

    const calculated = calculate(selectedCondition, repaymentInfo, {
      price: NumberedPrice,
      prePayment: NumberedPrePayment,
    });

    if (calculated.success) {
      setMinPrePaymentError(null);
      return;
    }

    setMinPrePaymentError({
      minPrePayment: calculated.minPrePayment,
      text: ` با توجه به شرایط انتخابی شما حداقل پیش پرداخت ${Math.ceil(
        calculated.minPrePayment
      ).toLocaleString()} تومان می باشد.`,
    });
  }, [activeRepaymentID, selectedCondition, prePayment, price]);

  return (
    <>
      <Alert severity="info" sx={{ mb: 2 }}>
        پس از اعمال تغییرات مورد نظر حتما گزینه محاسبه را بزنید.
      </Alert>
      <Box
        component={"form"}
        onSubmit={handleSubmit(submitHandler)}
        sx={{ display: "flex", flexDirection: "column", gap: 1 }}
      >
        <TextField
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
          fullWidth
          id="pre-payment"
          label="پیش پرداخت"
          placeholder="به تومان وارد کنید."
          variant="outlined"
          inputMode="decimal"
          className="text-xs"
          {...register("prePayment")}
          error={minPrePaymentError}
          helperText={
            minPrePaymentError && (
              <span className="flex items-center gap-3">
                <span>{minPrePaymentError.text}</span>
                {/* <Button
                variant="contained"
                color="success"
                onClick={() =>
                  setValue(
                    "prePayment",
                    formatNumber(minPrePaymentError.minPrePayment.toString()),
                    {
                      shouldDirty: true,
                      shouldValidate: true,
                    }
                  )
                }
              >
                اعمال حداقل پیش پرداخت
              </Button> */}
              </span>
            )
          }
          sx={
            {
              // "& .MuiOutlinedInput-root": {
              //   "& fieldset": {
              //     borderColor: "orange", // رنگ کادر معمولی
              //   },
              //   "&:hover fieldset": {
              //     borderColor: "orange", // موقع هاور
              //   },
              //   "&.Mui-focused fieldset": {
              //     borderColor: "blue", // موقع فوکوس
              //   },
              // },
              // "& .MuiInputLabel-root": {
              //   color: "gray", // رنگ لیبل معمولی
              // },
              // "& .Mui-focused.MuiInputLabel-root": {
              //   color: "blue", // رنگ لیبل موقع فوکوس
              // },
            }
          }
        />

        <Controller
          name="condition"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
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
              <Swiper
                modules={[FreeMode]}
                spaceBetween={5}
                slidesPerView={"auto"}
                freeMode={true}
                grabCursor={true}
              >
                {conditions[selectedCondition].map(
                  (item: any, index: number) => {
                    return (
                      <>
                        <SwiperSlide style={{ width: "auto" }} key={item.id}>
                          <Button
                            sx={{
                              height: "45px",
                              whiteSpace: "nowrap",
                            }}
                            variant={
                              activeRepaymentID === index
                                ? "contained"
                                : "outlined"
                            }
                            onClick={() => setActiveRepaymentID(index)}
                          >
                            {item.repayment} ماهه{" "}
                            {item.desc ? `(${item.desc})` : ""}
                          </Button>
                        </SwiperSlide>
                      </>
                    );
                  }
                )}
              </Swiper>
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

      {installmentsInfo && (
        <div className="mt-4">
          <InstallMentInfo info={installmentsInfo} />
        </div>
      )}
    </>
  );
}
