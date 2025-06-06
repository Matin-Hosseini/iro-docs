import { newLoanRequestSchema } from "@/validation/schemas/loan/request";
import { z } from "zod";

export type loanRequestDTO = z.infer<typeof newLoanRequestSchema>;
