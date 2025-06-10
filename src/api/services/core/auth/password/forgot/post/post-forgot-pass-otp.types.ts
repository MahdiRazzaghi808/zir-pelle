import { z } from "zod";
import { postForgotPassOtpSchema } from "./post-forgot-pass-otp.schema";

// Request
export type PostForgotPassOtpRequest = z.input<typeof postForgotPassOtpSchema.request>;

export type PostForgotPassOtpRequestTransofrmed = z.infer<
  typeof postForgotPassOtpSchema.request
>;

// Response
export type PostForgotPassOtpResponse = z.input<typeof postForgotPassOtpSchema.response>;

export type PostForgotPassOtpResponseTransformed = z.infer<
  typeof postForgotPassOtpSchema.response
>;
