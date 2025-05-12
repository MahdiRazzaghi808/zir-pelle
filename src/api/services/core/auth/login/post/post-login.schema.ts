import { z } from "zod";
import { coreApiMutationResponseSchema } from "@/api/instance/core-api";
import t from "@/json/fa.json";

// Request
export const postLoginRequestSchemaTransformed = z
  .object({
    email: z.string().min(3).max(255),
    password: z.string().min(4).max(255),
  })
  .transform((data) => data);

// Response
export const postLoginResponseSchemaTransofrmed =
  coreApiMutationResponseSchema().transform((data) => data);

export const postLoginSchema = {
  request: postLoginRequestSchemaTransformed,
  response: postLoginResponseSchemaTransofrmed,
};
