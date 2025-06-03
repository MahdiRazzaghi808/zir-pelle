import { z } from "zod";
import { coreApiMutationResponseSchema } from "@/api/instance/core-api";

// Request
export const postLoginRequestSchemaTransformed = z
  .object({
    phoneNumber: z
      .string({ required_error: "لطفا شماره موبایل را وارد کنید" })
      .regex(/^09\d{9}$/, { message: "شماره موبایل معتبر نیست" }),
  })
  .transform((data) => data);

// Response
export const postLoginResponseSchemaTransofrmed =
  coreApiMutationResponseSchema().transform((data) => data);

export const postLoginSchema = {
  request: postLoginRequestSchemaTransformed,
  response: postLoginResponseSchemaTransofrmed,
};
