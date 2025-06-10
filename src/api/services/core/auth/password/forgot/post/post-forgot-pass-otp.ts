import path from "path";
import { toast } from 'sonner';
import t from '@/json/fa.json';
import { coreApi } from "@/api/instance/core-api"; 
import type { ApiResponse } from "@/api/types/api.types";
import { requestHandler } from "@/api/utils/request-handler";
import { postForgotPassOtpSchema as schema } from "./post-forgot-pass-otp.schema";
import type {
  PostForgotPassOtpRequest,
  PostForgotPassOtpResponseTransformed,
} from "./post-forgot-pass-otp.types";
import { AxiosRequestConfig } from "axios";

export const postForgotPassOtpURL = (id: PostForgotPassOtpRequest['id']) => 
  path.join("/AuthPasswordForgot", `${id}`);

export const postForgotPassOtp = async (
  props?: PostForgotPassOtpRequest,
  option?: AxiosRequestConfig, 
): Promise<ApiResponse<PostForgotPassOtpResponseTransformed>> => {
  const payloadParsed = schema.request.parse(props);

  const URL = postForgotPassOtpURL(payloadParsed.id);

  const response = await requestHandler(
    () => coreApi.post(URL, payloadParsed, , ...options),
    schema.response._def.schema,
    {
      isMock: false,
    },
  );

  try {
    response.data = schema.response.parse(response.data);
  } catch {
    toast.error(t.toast.error.parseResponse);
  }

  return response;
};
