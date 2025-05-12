import { z } from 'zod';
import {
  coreApiPaginatedRequestSchema,
  coreApiPaginatedResponseSchema,
} from '@/api/instance/core-api';

// Request
export const getUsersRequestSchemaTransformed =
  coreApiPaginatedRequestSchema();

// Response
export const getUsersResponseSchemaTransofrmed = 
  coreApiPaginatedResponseSchema(
    z
      .object({
        username: z.string(),
      })
      .passthrough()
      .transform((data) => data),
  );

export const getUsersSchema = {
  request: getUsersRequestSchemaTransformed,
  response: getUsersResponseSchemaTransofrmed,
};