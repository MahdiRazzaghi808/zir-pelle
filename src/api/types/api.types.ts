import type {
  DefinedInitialDataOptions,
  QueryKey,
  UseMutationOptions,
} from '@tanstack/react-query';
import type { AxiosError, AxiosResponse } from 'axios';
import { z } from 'zod';
import t from '@/json/fa.json';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiResponse<T = any, D = any> = AxiosResponse<T, D>;

export type WithParams<P = unknown | undefined> = { params?: P };

export type UseQueryProps<
  TQueryFnData = unknown,
  TVariables extends WithParams = WithParams,
  TError = ApiError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Partial<DefinedInitialDataOptions<TQueryFnData, TError, TData, TQueryKey>> &
  TVariables;

export type UseMutationProps<
  TData = unknown,
  TError = ApiError,
  TVariables = void,
  TContext = unknown,
> = Partial<UseMutationOptions<TData, TError, TVariables, TContext>>;

export type ApiError = AxiosError<{
  message: string;
}>;

export const lookupSchema = z.object(
  {
    value: z.union([z.number(), z.string()]),
    label: z.string(),
  },
  { message: t.form.validation.required },
);

export type Lookup = z.infer<typeof lookupSchema>;
