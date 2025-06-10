import { z } from "zod";
import { postVerifyOtpSchema } from "./post-verify-otp.schema";

// Request
export type PostVerifyOtpRequest = z.input<typeof postVerifyOtpSchema.request>;

export type PostVerifyOtpRequestTransofrmed = z.infer<
  typeof postVerifyOtpSchema.request
>;

// Response
export type PostVerifyOtpResponse = z.input<typeof postVerifyOtpSchema.response>;

export type PostVerifyOtpResponseTransformed = z.infer<
  typeof postVerifyOtpSchema.response
>;
