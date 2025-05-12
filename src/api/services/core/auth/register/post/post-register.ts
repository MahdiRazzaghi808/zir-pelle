import path from "path";
import { toast } from 'sonner';
import t from '@/json/fa.json';
import { coreApi } from "@/api/instance/core-api"; 
import type { ApiResponse } from "@/api/types/api.types";
import { requestHandler } from "@/api/utils/request-handler";
import { postRegisterSchema as schema } from "./post-register.schema";
import type {
  PostRegisterRequest,
  PostRegisterResponseTransformed,
} from "./post-register.types";

export const postRegisterURL = () => 
  path.join("/register");

export const postRegister = async (
  props?: PostRegisterRequest,
): Promise<ApiResponse<PostRegisterResponseTransformed>> => {
  const payloadParsed = schema.request.parse(props);

  const URL = postRegisterURL();

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
