import { z } from "zod";
import { postPasswordResetSchema } from "./post-password-reset.schema";

// Request
export type PostPasswordResetRequest = z.input<typeof postPasswordResetSchema.request>;

export type PostPasswordResetRequestTransofrmed = z.infer<
  typeof postPasswordResetSchema.request
>;

// Response
export type PostPasswordResetResponse = z.input<typeof postPasswordResetSchema.response>;

export type PostPasswordResetResponseTransformed = z.infer<
  typeof postPasswordResetSchema.response
>;
