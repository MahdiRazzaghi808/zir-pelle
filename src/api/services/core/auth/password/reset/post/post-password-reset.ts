import { coreApi } from "@/api/instance/core-api";
import type { ApiResponse } from "@/api/types/api.types";
import { requestHandler } from "@/api/utils/request-handler";
import t from '@/json/fa.json';
import path from "path";
import { toast } from 'sonner';
import { postPasswordResetSchema as schema } from "./post-password-reset.schema";
import type {
  PostPasswordResetRequest,
  PostPasswordResetResponseTransformed,
} from "./post-password-reset.types";

export const postPasswordResetURL = () => 
  path.join("/auth/password/reset");

export const postPasswordReset = async (
  props?: PostPasswordResetRequest,
): Promise<ApiResponse<PostPasswordResetResponseTransformed>> => {
  const payloadParsed = schema.request.parse(props);

  const URL = postPasswordResetURL();

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
