import { z } from 'zod';
import { coreApiMutationResponseSchema } from '@/api/instance/core-api';
import t from '@/json/fa.json';

// Request
export const postForgotPassOtpRequestSchemaTransformed = z
  .object({
    phone_number: z
      .string({ required_error: "لطفا شماره موبایل را وارد کنید" })
      .regex(/^09\d{9}$/, { message: "شماره موبایل معتبر نیست" }),
  })
  .transform((data) => data);

// Response
export const postForgotPassOtpResponseSchemaTransofrmed =
  coreApiMutationResponseSchema().transform((data) => data);

export const postForgotPassOtpSchema = {
  request: postForgotPassOtpRequestSchemaTransformed,
  response: postForgotPassOtpResponseSchemaTransofrmed,
};