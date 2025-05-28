import { z } from "zod";
import {
  nationalIDRegex,
  onlyEnglishWordsRegex,
  postalCodeRegex,
} from "../regexes";

export const userInfoFormSchema = z.object({
  firstName: z
    .string()
    .min(1, "نام خود را وارد کنید.")
    .regex(onlyEnglishWordsRegex, "از عبارات فارسی استفاده کنید."),
  lastName: z
    .string()
    .min(1, "نام خانوادگی خود را وارد کنید.")
    .regex(onlyEnglishWordsRegex, "از عبارات فارسی استفاده کنید."),
  national_id: z
    .string()
    .min(1, "کد ملی خود را وارد کنید.")
    .regex(nationalIDRegex, "کد ملی نا معتبر می باشد."),
  fathers_name: z
    .string()
    .min(1, "نام پدر خود را وارد کنید.")
    .regex(onlyEnglishWordsRegex, "از عبارات فارسی استفاده کنید."),
  requested_product: z.string().min(1, "نام محصول درخواستی خود را وارد کنید."),
  postal_code: z
    .string()
    .min(1, "کد پستی را وارد کنید.")
    .regex(postalCodeRegex, "کد پستی نا معتبر می باشد."),
  address: z
    .string()
    .min(1, "آدرس محل سکونت خود را وارد کنید.")
    .regex(onlyEnglishWordsRegex, "از عبارات فارسی استفاده کنید."),
  grade_score: z.string().min(1, "رتبه اعتباری خود را انتخاب کنید."),
});
