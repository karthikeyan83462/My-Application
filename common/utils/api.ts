import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
// You can set your base URL here or import from a constants file
export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000';

export enum ApiRequestType {
  GET = 'get',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
  POST = 'post',
}

export type AxiosOptionType = { setHeaderToken?: boolean } & AxiosRequestConfig;

const getAxiosConfig = (baseURL = BASE_URL, timeout = 60000): AxiosRequestConfig => ({
  baseURL,
  timeout,
});

// Dummy setHeader function (customize for your auth logic)
export const setHeader = async (instance: AxiosInstance) => {
  // Example: instance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  // Add any custom headers here
};

const request = (method: ApiRequestType, url: string, options: AxiosOptionType = {}) => {
  const instance: AxiosInstance = axios.create(getAxiosConfig(options?.baseURL, options?.timeout));
  instance.interceptors.response.use(
    (res: AxiosResponse) => res,
    (error: AxiosError) => {
      switch (error?.response?.status) {
        case 401:
          console.error('error 401 : user not authenticated!');
          break;
        case 403:
          console.error('error 403 : user not authorized!');
          break;
        default:
          break;
      }
      return Promise.reject(error);
    }
  );

  return new Promise<AxiosResponse>((resolve, reject) => {
    (async () => {
      const { setHeaderToken = true, baseURL, ...rest } = options ?? {};
      if (setHeaderToken) await setHeader(instance);
      return instance.request({
        ...rest,
        url,
        method,
      });
    })()
      .then((res: AxiosResponse) => resolve(res))
      .catch((err: AxiosError) => reject(err));
  });
};

interface RequestParameters {
  (endPoint: string, options?: AxiosOptionType): Promise<AxiosResponse>;
}

interface ApiCallData {
  get: RequestParameters;
  put: RequestParameters;
  post: RequestParameters;
  patch: RequestParameters;
  delete: RequestParameters;
}

const requests: ApiCallData = {
  get: (endpoint, options = {}) => request(ApiRequestType.GET, endpoint, options),
  post: (endpoint, options = {}) => request(ApiRequestType.POST, endpoint, options),
  put: (endpoint, options = {}) => request(ApiRequestType.PUT, endpoint, options),
  patch: (endpoint, options = {}) => request(ApiRequestType.PATCH, endpoint, options),
  delete: (endpoint, options = {}) => request(ApiRequestType.DELETE, endpoint, options),
};

export default requests; 