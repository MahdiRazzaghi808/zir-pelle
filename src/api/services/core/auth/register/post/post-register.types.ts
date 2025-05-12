import { z } from "zod";
import { postRegisterSchema } from "./post-register.schema";

// Request
export type PostRegisterRequest = z.input<typeof postRegisterSchema.request>;

export type PostRegisterRequestTransofrmed = z.infer<
  typeof postRegisterSchema.request
>;

// Response
export type PostRegisterResponse = z.input<typeof postRegisterSchema.response>;

export type PostRegisterResponseTransformed = z.infer<
  typeof postRegisterSchema.response
>;
