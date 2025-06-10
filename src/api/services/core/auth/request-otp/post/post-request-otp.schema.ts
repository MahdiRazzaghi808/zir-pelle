import { z } from 'zod';
import { coreApiMutationResponseSchema } from '@/api/instance/core-api';
import t from '@/json/fa.json';

// Request
export const postRequestOtpRequestSchemaTransformed = z
  .object({
    phone_number: z
      .string({ required_error: "لطفا شماره موبایل را وارد کنید" })
      .regex(/^09\d{9}$/, { message: "شماره موبایل معتبر نیست" }),
  })
  .transform((data) => data);

// Response
export const postRequestOtpResponseSchemaTransofrmed =
  coreApiMutationResponseSchema().transform((data) => data);

export const postRequestOtpSchema = {
  request: postRequestOtpRequestSchemaTransformed,
  response: postRequestOtpResponseSchemaTransofrmed,
};