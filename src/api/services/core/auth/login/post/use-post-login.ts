import type {
  ApiError,
  ApiResponse,
  UseMutationProps,
} from "@/api/types/api.types";
import { useMutation } from "@tanstack/react-query";
import { postLogin } from "./post-login";
import {} from "./post-login.schema";
import type {
  PostLoginRequest,
  PostLoginResponseTransformed,
} from "./post-login.types";

export type UsePostLoginProps = UseMutationProps<
  ApiResponse<PostLoginResponseTransformed>,
  ApiError,
  PostLoginRequest
>;

export const postLoginMutationKey = () => ["postLogin"];

export const usePostLogin = (props?: UsePostLoginProps) => {
  const mutation = useMutation<
    ApiResponse<PostLoginResponseTransformed>,
    ApiError,
    PostLoginRequest
  >({
    mutationKey: postLoginMutationKey(),
    mutationFn: (data) => postLogin(data),
    ...props,
  });

  return mutation;
};
