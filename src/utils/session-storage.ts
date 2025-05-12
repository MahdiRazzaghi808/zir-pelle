import { storageDeserializer, storageSerializer } from './strings';

export enum SESSION_STORAGE_KEYS {
  forForceChangePassword = 'forForceChangePassword',
}

const getFromSessionStorage = (key: SESSION_STORAGE_KEYS) =>
  storageDeserializer(window.sessionStorage.getItem(key));

const setInSessionStorage = (key: SESSION_STORAGE_KEYS, value: unknown) => {
  window.sessionStorage.setItem(key, storageSerializer(value));
};

export const sessionStorage = {
  [SESSION_STORAGE_KEYS.forForceChangePassword]: {
    get: () =>
      getFromSessionStorage(SESSION_STORAGE_KEYS.forForceChangePassword),
    set: (value: unknown) => {
      setInSessionStorage(SESSION_STORAGE_KEYS.forForceChangePassword, value);
    },
    remove: () => {
      window.sessionStorage.removeItem(
        SESSION_STORAGE_KEYS.forForceChangePassword,
      );
    },
  },
};
