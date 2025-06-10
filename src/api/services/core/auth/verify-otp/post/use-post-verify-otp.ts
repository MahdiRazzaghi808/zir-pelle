import type {
  ApiError,
  ApiResponse,
  UseMutationProps,
} from "@/api/types/api.types";
import { useMutation } from "@tanstack/react-query";
import { postVerifyOtp } from "./post-verify-otp";
import {} from "./post-verify-otp.schema";
import type {
  PostVerifyOtpRequest,
  PostVerifyOtpResponseTransformed,
} from "./post-verify-otp.types";

export type UsePostVerifyOtpProps = UseMutationProps<
  ApiResponse<PostVerifyOtpResponseTransformed>,
  ApiError,
  PostVerifyOtpRequest
>;

export const postVerifyOtpMutationKey = () => ["postVerifyOtp"];

export const usePostVerifyOtp = (props?: UsePostVerifyOtpProps) => {
  const mutation = useMutation<
    ApiResponse<PostVerifyOtpResponseTransformed>,
    ApiError,
    PostVerifyOtpRequest
  >({
    mutationKey: postVerifyOtpMutationKey(),
    mutationFn: (data) => postVerifyOtp(data),
    ...props,
  });

  return mutation;
};
