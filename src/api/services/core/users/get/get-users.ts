import path from "path";
import { toast } from 'sonner';
import t from '@/json/fa.json';
import { coreApi } from "@/api/instance/core-api"; 
import type { ApiResponse } from "@/api/types/api.types";
import { requestHandler } from "@/api/utils/request-handler";
import { getUsersSchema as schema } from "./get-users.schema";
import type {
  GetUsersRequest,
  GetUsersResponse,
  GetUsersResponseTransformed,
} from "./get-users.types";
import { AxiosRequestConfig } from "axios";

const getUsersURL = () => path.join("users");

export const getUsers = async (
  props?: GetUsersRequest,
  options?: AxiosRequestConfig, 
): Promise<ApiResponse<GetUsersResponseTransformed>> => {
  const payloadParsed = schema.request.parse(props);
  const URL = getUsersURL();

  const response = await requestHandler(
    () => coreApi.get<GetUsersResponse>(URL, { params: payloadParsed , ...options}),
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
