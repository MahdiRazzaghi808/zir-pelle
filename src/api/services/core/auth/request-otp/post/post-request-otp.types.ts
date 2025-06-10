import { z } from "zod";
import { postRequestOtpSchema } from "./post-request-otp.schema";

// Request
export type PostRequestOtpRequest = z.input<typeof postRequestOtpSchema.request>;

export type PostRequestOtpRequestTransofrmed = z.infer<
  typeof postRequestOtpSchema.request
>;

// Response
export type PostRequestOtpResponse = z.input<typeof postRequestOtpSchema.response>;

export type PostRequestOtpResponseTransformed = z.infer<
  typeof postRequestOtpSchema.response
>;
