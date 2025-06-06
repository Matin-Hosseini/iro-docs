import { z } from "zod";

export const newLoanRequestSchema = z.object({
  product_name: z.string().min(1, "کالای درخواستی خود را وارد کنید."),
});
