import type {
  ApiError,
  ApiResponse,
  UseQueryProps,
  WithParams,
} from "@/api/types/api.types";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./get-users";
import type {
  GetUsersRequest,
  GetUsersResponseTransformed,
} from "./get-users.types";

export type UseGetUsersProps = UseQueryProps<
  ApiResponse<GetUsersResponseTransformed>,
  WithParams<GetUsersRequest>
>;

export const getUsersQueryKey = (params?: GetUsersRequest) => ["getUsers", ...Object.values(params || {})];

export const useGetUsers = (props?: UseGetUsersProps) => {
  const { params, ...resProps } = props || {};

  const query = useQuery<ApiResponse<GetUsersResponseTransformed>, ApiError>({
  queryKey: getUsersQueryKey(params),
  queryFn: () => getUsers(params),
    ...resProps,
  });

  return query;
};
