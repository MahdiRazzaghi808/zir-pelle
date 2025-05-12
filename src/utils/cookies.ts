import Cookies from 'js-cookie';
import { storageDeserializer, storageSerializer } from './strings';
import { z } from 'zod';


// from api call
export const UserInfoSchema = z.object({
  isSuccess: z.boolean(),
  isRedirect: z.boolean(),
  userId: z.string().nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  userName: z.string().nullable().optional(),
  fullName: z.string().nullable().optional(),
  token: z.string().nullable().optional(),
  organUnit: z.string().nullable().optional(),
  organUnitId: z.string().nullable().optional(),
  position: z.string().nullable().optional(),
  expiration: z.string(),
  userAccessList: z.array(z.string()).nullable().optional(),
});

export type UserInfo = z.infer<typeof UserInfoSchema>;


export enum COOKIE_KEYS {
  USER_INFO = 'userInfo',
}

const getFromCookie = (key: COOKIE_KEYS) =>
  storageDeserializer(Cookies.get(key) || '');

const setInCookie = (
  key: COOKIE_KEYS,
  value: unknown,
  options?: Cookies.CookieAttributes,
) => {
  Cookies.set(key, storageSerializer(value), {
    sameSite: 'Strict',
    secure: true, //in https only
    ...options,
  });
};

export const cookie = {
  [COOKIE_KEYS.USER_INFO]: {
    get: () => getFromCookie(COOKIE_KEYS.USER_INFO) as UserInfo | null,
    set: (value: UserInfo, options?: Cookies.CookieAttributes) => {
      setInCookie(COOKIE_KEYS.USER_INFO, value, options);
    },
    remove: () => {
      Cookies.remove(COOKIE_KEYS.USER_INFO);
    },
  },
};
