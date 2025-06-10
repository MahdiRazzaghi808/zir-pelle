import type {
  ApiError,
  ApiResponse,
  UseMutationProps,
} from "@/api/types/api.types";
import { useMutation } from "@tanstack/react-query";
import { postRequestOtp } from "./post-request-otp";
import {} from "./post-request-otp.schema";
import type {
  PostRequestOtpRequest,
  PostRequestOtpResponseTransformed,
} from "./post-request-otp.types";

export type UsePostRequestOtpProps = UseMutationProps<
  ApiResponse<PostRequestOtpResponseTransformed>,
  ApiError,
  PostRequestOtpRequest
>;

export const postRequestOtpMutationKey = () => ["postRequestOtp"];

export const usePostRequestOtp = (props?: UsePostRequestOtpProps) => {
  const mutation = useMutation<
    ApiResponse<PostRequestOtpResponseTransformed>,
    ApiError,
    PostRequestOtpRequest
  >({
    mutationKey: postRequestOtpMutationKey(),
    mutationFn: (data) => postRequestOtp(data),
    ...props,
  });

  return mutation;
};
