import { z } from "zod";
import { coreApiMutationResponseSchema } from "@/api/instance/core-api";

// Request
export const postRegisterRequestSchemaTransformed = z
  .object({
    username: z.string().min(3).max(255),
    password: z.string().min(4).max(255),
    role: z.string().min(1).max(255),
  })
  .transform((data) => data);

// Response
export const postRegisterResponseSchemaTransofrmed =
  coreApiMutationResponseSchema().transform((data) => data);

export const postRegisterSchema = {
  request: postRegisterRequestSchemaTransformed,
  response: postRegisterResponseSchemaTransofrmed,
};
