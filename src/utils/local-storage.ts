import { clear } from 'console';
import { storageDeserializer, storageSerializer } from './strings';

export enum LOCAL_STORAGE_KEYS {
  userAccessList = 'userAccessList',
}

const getFromSessionStorage = (key: LOCAL_STORAGE_KEYS) =>
  storageDeserializer(window.localStorage.getItem(key));

const setInSessionStorage = (key: LOCAL_STORAGE_KEYS, value: unknown) => {
  window.localStorage.setItem(key, storageSerializer(value));
};

export const localStorage = {
  [LOCAL_STORAGE_KEYS.userAccessList]: {
    get: () => getFromSessionStorage(LOCAL_STORAGE_KEYS.userAccessList),
    set: (value: unknown) => {
      setInSessionStorage(LOCAL_STORAGE_KEYS.userAccessList, value);
    },
    remove: () => {
      window.localStorage.removeItem(LOCAL_STORAGE_KEYS.userAccessList);
    },
  },


  clear: () => {
    window.localStorage.clear();
  },
};
