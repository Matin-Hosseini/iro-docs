import { userInfoFormSchema } from "@/validation/schemas/user";
import { z } from "zod";

export type userInfoDTO = z.infer<typeof userInfoFormSchema>;
