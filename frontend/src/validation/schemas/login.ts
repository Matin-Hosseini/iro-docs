import { z } from "zod";
import { phoneRegex } from "../regexes/phoneNumber";

export const loginSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, "شماره موبایل خود را وارد کنید.")
    .regex(phoneRegex, "شماره موبایل نامغتبر می باشد."),
});

export const otpSchema = z.object({
  code: z
    .string()
    .min(1, "لطفا کد ارسال شده را وارد کنید.")
    .max(5, "کد وارد شده نمیتواند بیشتر از 5 عدد باشد.")
    .regex(/^\d+$/, "کد باید فقط شامل اعداد باشد."),
});


