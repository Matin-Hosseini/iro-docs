import { loginSchema, otpSchema } from "@/validation/schemas/login";
import { z } from "zod";

export type loginDTO = z.infer<typeof loginSchema>;

export type otpDTO = z.infer<typeof otpSchema>;
