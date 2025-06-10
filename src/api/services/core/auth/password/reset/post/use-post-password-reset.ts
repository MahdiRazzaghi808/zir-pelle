import type {
  ApiError,
  ApiResponse,
  UseMutationProps,
} from "@/api/types/api.types";
import { useMutation } from "@tanstack/react-query";
import { postPasswordReset } from "./post-password-reset";
import {} from "./post-password-reset.schema";
import type {
  PostPasswordResetRequest,
  PostPasswordResetResponseTransformed,
} from "./post-password-reset.types";

export type UsePostPasswordResetProps = UseMutationProps<
  ApiResponse<PostPasswordResetResponseTransformed>,
  ApiError,
  PostPasswordResetRequest
>;

export const postPasswordResetMutationKey = () => ["postPasswordReset"];

export const usePostPasswordReset = (props?: UsePostPasswordResetProps) => {
  const mutation = useMutation<
    ApiResponse<PostPasswordResetResponseTransformed>,
    ApiError,
    PostPasswordResetRequest
  >({
    mutationKey: postPasswordResetMutationKey(),
    mutationFn: (data) => postPasswordReset(data),
    ...props,
  });

  return mutation;
};
