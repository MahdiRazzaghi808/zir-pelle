export const capitalize = (val: string | null | undefined) => {
  if (!val) return null;
  return val.charAt(0).toUpperCase() + String(val).slice(1);
};

export const isJsonString = (value: string): boolean => {
  try {
    JSON.parse(value);
  } catch {
    return false;
  }
  return true;
};

export const storageSerializer = (value: unknown) => {
  return btoa(encodeURIComponent(JSON.stringify(value)));
};

export const storageDeserializer = (value: string | null) => {
  if (!value) return null;
  const decodedValue = decodeURIComponent(atob(value));
  return isJsonString(decodedValue) ? JSON.parse(decodedValue) : null;
};

export const trimRequestData = (data: unknown): unknown => {
  if (typeof data === 'string') {
    return data.trim();
  }

  if (Array.isArray(data)) {
    return data.map((item) => trimRequestData(item));
  }

  if (
    data !== null &&
    typeof data === 'object' &&
    !(data instanceof FormData) &&
    !(data instanceof File)
  ) {
    return Object.keys(data).reduce((acc, key) => {
      // @ts-ignore
      acc[key] = trimRequestData(data[key]);
      return acc;
    }, {});
  }

  return data;
};
