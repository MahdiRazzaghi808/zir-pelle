/* eslint-disable @typescript-eslint/no-empty-object-type */
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'sonner';
import { z } from 'zod';
import t from '@/json/fa.json';
import { capitalize, trimRequestData } from '@/utils/strings';
import { cookie, COOKIE_KEYS } from '@/utils/cookies';
import { localStorage } from '@/utils/local-storage';

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const coreApiPaginatedRequestSchema = <
  T extends z.AnyZodObject = z.ZodObject<{}>,
>(
  schema: T = z.object({}) as T,
) => {
  return z
    .object({
      pageNumber: z.number().int().optional(),
      pageSize: z.number().int().optional(),
      searchKey: z.string().optional(),
      sortName: z.string().optional().nullable(),
      sortType: z.string().optional().nullable(),
    })
    .merge(schema)
    .transform((data) => ({
      ...data,
      sortName: data?.sortType ? capitalize(data.sortName ?? '') : null,
      sortType: data?.sortName ? data.sortType : null,
    }));
};

export const coreApiPaginatedResponseSchema = <T>(schema: z.ZodType<T>) => {
  return z
    .object({
      hasNextPage: z.boolean(),
      hasPreviousPage: z.boolean(),
      pageNumber: z.number().int().nonnegative(),
      totalCount: z.number().int().nonnegative(),
      totalPages: z.number().int().nonnegative(),
      items: z.array(schema),
    })
    .transform((data) => data);
};

export const coreApiMutationResponseSchema = <T>(schema?: z.ZodType<T>) => {
  return z
    .unknown()
    .or(schema || z.object({}).passthrough().optional())
    .optional()
    .transform((data) => data);
};

export type CoreSortType = 'asc' | 'desc' | null;

export const coreApi: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'credentials': 'include'    

  },
  withCredentials: true, // Enable sending HttpOnly cookies
});

coreApi.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // Optional: attach token for SSR/fallback cases if needed
  const token = cookie[COOKIE_KEYS.USER_INFO].get()?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.data && typeof config.data === 'object' && !(config.data instanceof FormData)) {
    config.data = trimRequestData(config.data);
  }

  return config;
});

coreApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ error?: string; detail?: string }>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => coreApi(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        await coreApi.post('/auth/refresh-token'); // Endpoint must reset cookie
        processQueue(null);
        return coreApi(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        cookie[COOKIE_KEYS.USER_INFO].remove();
        localStorage.clear();
        window.location.href = `/login?next=${window.location.pathname}${window.location.search}`;
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response?.data?.error) {
      toast.error(error.response?.data?.error || t.toast.error.common);
    }

    // else {
    //   Object.values(
    //     error.response?.data?.errors || { '': [t.toast.error.common] },
    //   ).map((item) => {
    //     toast.error(item || t.toast.error.common);
    //   });
    // }

    return Promise.reject(error);
  },
);
