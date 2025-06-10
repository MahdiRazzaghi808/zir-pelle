import path from "path";
import { toast } from 'sonner';
import t from '@/json/fa.json';
import { coreApi } from "@/api/instance/core-api";
import type { ApiResponse } from "@/api/types/api.types";
import { requestHandler } from "@/api/utils/request-handler";
import { postRequestOtpSchema as schema } from "./post-request-otp.schema";
import type {
  PostRequestOtpRequest,
  PostRequestOtpResponseTransformed,
} from "./post-request-otp.types";
import { AxiosRequestConfig } from "axios";

export const postRequestOtpURL = () =>
  path.join("/auth/request-otp");

export const postRequestOtp = async (
  props?: PostRequestOtpRequest,
  option?: AxiosRequestConfig,
): Promise<ApiResponse<PostRequestOtpResponseTransformed>> => {
  const payloadParsed = schema.request.parse(props);

  const URL = postRequestOtpURL();

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
