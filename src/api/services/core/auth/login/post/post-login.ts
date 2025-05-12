import path from "path";
import { toast } from "sonner";
import t from "@/json/fa.json";
import { coreApi } from "@/api/instance/core-api";
import type { ApiResponse } from "@/api/types/api.types";
import { requestHandler } from "@/api/utils/request-handler";
import { postLoginSchema as schema } from "./post-login.schema";
import type {
  PostLoginRequest,
  PostLoginResponseTransformed,
} from "./post-login.types";

export const postLoginURL = () => path.join("/login");

export const postLogin = async (
  props?: PostLoginRequest
): Promise<ApiResponse<PostLoginResponseTransformed>> => {
  const payloadParsed = schema.request.parse(props);

  const URL = postLoginURL();

  const response = await requestHandler(
    () => coreApi.post(URL, payloadParsed),
    schema.response._def.schema,
    {
      isMock: false,
    }
  );

  try {
    response.data = schema.response.parse(response.data);
  } catch {
    toast.error(t.toast.error.parseResponse);
  }

  return response;
};
