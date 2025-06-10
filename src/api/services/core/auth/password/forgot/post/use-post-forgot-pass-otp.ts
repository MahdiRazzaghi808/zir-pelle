import type {
  ApiError,
  ApiResponse,
  UseMutationProps,
} from "@/api/types/api.types";
import { useMutation } from "@tanstack/react-query";
import { postForgotPassOtp } from "./post-forgot-pass-otp";
import type {
  PostForgotPassOtpRequest,
  PostForgotPassOtpResponseTransformed,
} from "./post-forgot-pass-otp.types";

export type UsePostForgotPassOtpProps = UseMutationProps<
  ApiResponse<PostForgotPassOtpResponseTransformed>,
  ApiError,
  PostForgotPassOtpRequest
>;

export const postForgotPassOtpMutationKey = () => ["postForgotPassOtp"];

export const usePostForgotPassOtp = (props?: UsePostForgotPassOtpProps) => {
  const mutation = useMutation<
    ApiResponse<PostForgotPassOtpResponseTransformed>,
    ApiError,
    PostForgotPassOtpRequest
  >({
    mutationKey: postForgotPassOtpMutationKey(),
    mutationFn: (data) => postForgotPassOtp(data),
    ...props,
  });

  return mutation;
};
