import axios from "axios";
// import { handleAPICall, handleAPIResponse } from './api';

export interface Options {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  params?: object;
  body?: object;
  timeoutInMs?: number;
  resetMessages?: boolean;
}

export const fetchAPIV1 = (
  path: string,
  {
    method = "GET",
    params = {},
    body = {},
    timeoutInMs = 300000,
  }: Options = {},
) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutInMs);
  // handleAPICall(resetMessages);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new Promise<any>((resolve, reject) =>
    axios({
      baseURL: "/api/v1",
      url: path,
      method,
      headers: { "content-type": "application/json; charset=UTF-8" },
      params,
      data: body,
      signal: controller.signal,
    })
      .then(({ data }) => {
        clearTimeout(timeout);
        // handleAPIResponse(data);
        resolve(data);
      })
      .catch(({ response: { data } }) => reject(data)),
  );
};

export default {
  fetchAPIV1,
};
