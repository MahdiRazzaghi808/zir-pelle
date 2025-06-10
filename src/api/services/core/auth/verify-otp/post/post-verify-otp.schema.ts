import { z } from 'zod';
import { coreApiMutationResponseSchema } from '@/api/instance/core-api';
import t from '@/json/fa.json';

// Request
export const postVerifyOtpRequestSchemaTransformed = z
  .object({
    phone_number: z.string(),
    otp: z.string(),
  })
  .transform((data) => data);

// Response
export const postVerifyOtpResponseSchemaTransofrmed =
  coreApiMutationResponseSchema().transform((data) => data);

export const postVerifyOtpSchema = {
  request: postVerifyOtpRequestSchemaTransformed,
  response: postVerifyOtpResponseSchemaTransofrmed,
};