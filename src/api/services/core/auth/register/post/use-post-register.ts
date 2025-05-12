import type {
  ApiError,
  ApiResponse,
  UseMutationProps,
} from "@/api/types/api.types";
import { useMutation } from "@tanstack/react-query";
import { postRegister } from "./post-register";
import {} from "./post-register.schema";
import type {
  PostRegisterRequest,
  PostRegisterResponseTransformed,
} from "./post-register.types";

export type UsePostRegisterProps = UseMutationProps<
  ApiResponse<PostRegisterResponseTransformed>,
  ApiError,
  PostRegisterRequest
>;

export const postRegisterMutationKey = () => ["postRegister"];

export const usePostRegister = (props?: UsePostRegisterProps) => {
  const mutation = useMutation<
    ApiResponse<PostRegisterResponseTransformed>,
    ApiError,
    PostRegisterRequest
  >({
    mutationKey: postRegisterMutationKey(),
    mutationFn: (data) => postRegister(data),
    ...props,
  });

  return mutation;
};
