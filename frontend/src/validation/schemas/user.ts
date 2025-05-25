import { z } from "zod";
import {
  nationalIDRegex,
  onlyEnglishWordsRegex,
  postalCodeRegex,
} from "../regexes";

export const userInfoFormSchema = z.object({
  firstName: z
    .string()
    .regex(onlyEnglishWordsRegex, "عبارات انگلیسی معتبر نمی باشند."),
  lastName: z
    .string()
    .regex(onlyEnglishWordsRegex, "عبارات انگلیسی  خانوادگی معتبر نمی باشند."),
  natinal_id: z.string().regex(nationalIDRegex, "کد ملی نا معتبر می باشد."),
  fathers_name: z
    .string()
    .regex(onlyEnglishWordsRegex, "عبارات انگلیسی معتبر نمی باشند."),
  requested_product: z.string(),
  postal_code: z.string().regex(postalCodeRegex, "کد پستی نا معتبر می باشد."),
  address: z.string(),
  grade_score: z.string(),
});
