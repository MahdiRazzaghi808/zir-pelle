import path from "path";
import { toast } from 'sonner';
import t from '@/json/fa.json';
import { coreApi } from "@/api/instance/core-api"; 
import type { ApiResponse } from "@/api/types/api.types";
import { requestHandler } from "@/api/utils/request-handler";
import { postPasswordResetSchema as schema } from "./post-password-reset.schema";
import type {
  PostPasswordResetRequest,
  PostPasswordResetResponseTransformed,
} from "./post-password-reset.types";
import { AxiosRequestConfig } from "axios";

export const postPasswordResetURL = (id: PostPasswordResetRequest['id']) => 
  path.join("/AuthPasswordReset", `${id}`);

export const postPasswordReset = async (
  props?: PostPasswordResetRequest,
  option?: AxiosRequestConfig, 
): Promise<ApiResponse<PostPasswordResetResponseTransformed>> => {
  const payloadParsed = schema.request.parse(props);

  const URL = postPasswordResetURL(payloadParsed.id);

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
