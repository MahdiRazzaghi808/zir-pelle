import path from "path";
import { toast } from 'sonner';
import t from '@/json/fa.json';
import { coreApi } from "@/api/instance/core-api";
import type { ApiResponse } from "@/api/types/api.types";
import { requestHandler } from "@/api/utils/request-handler";
import { postVerifyOtpSchema as schema } from "./post-verify-otp.schema";
import type {
  PostVerifyOtpRequest,
  PostVerifyOtpResponseTransformed,
} from "./post-verify-otp.types";
import { AxiosRequestConfig } from "axios";

export const postVerifyOtpURL = () =>
  path.join("/auth/verify-otp");

export const postVerifyOtp = async (
  props?: PostVerifyOtpRequest,
  option?: AxiosRequestConfig,
): Promise<ApiResponse<PostVerifyOtpResponseTransformed>> => {
  const payloadParsed = schema.request.parse(props);

  const URL = postVerifyOtpURL();

  const response = await requestHandler(
    () => coreApi.post(URL, payloadParsed),
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
