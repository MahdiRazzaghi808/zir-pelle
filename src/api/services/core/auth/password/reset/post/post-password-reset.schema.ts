import { z } from 'zod';
import { coreApiMutationResponseSchema } from '@/api/instance/core-api';
import t from '@/json/fa.json';

// Request
export const postPasswordResetRequestSchemaTransformed = z
  .object({
    phone_number: z.string(),
    otp: z.string(),
    password: z.string(),
    password_confirmation: z.string(),
  })
  .transform((data) => data);

// Response
export const postPasswordResetResponseSchemaTransofrmed = 
  coreApiMutationResponseSchema().transform((data) => data);

export const postPasswordResetSchema = {
  request: postPasswordResetRequestSchemaTransformed,
  response: postPasswordResetResponseSchemaTransofrmed,
};