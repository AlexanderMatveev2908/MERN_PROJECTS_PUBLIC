import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, set_credentials } from "../../features/auth/auth_slice.js";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (!token) return headers;

    headers.set("Authorization", `Bearer ${token}`);
  },
});

const base_query_with_reauth = async (args, api, extra_options) => {
  let result = await baseQuery(args, api, extra_options);

  if (result?.error?.status === 403) {
    const refresh_result = await baseQuery("/auth/refresh", api, extra_options);

    if (refresh_result?.data) {
      api.dispatch(set_credentials({ ...refresh_result.data }));

      result = await baseQuery(args, api, extra_options);
    } else {
      if (refresh_result?.error?.status === 403) {
        refresh_result.error.data.message = "=> session expired";
        api.dispatch(logout());
      }
      return refresh_result;
    }
  }
  return result;
};

export const api_slice = createApi({
  baseQuery: base_query_with_reauth,
  tagTypes: ["Note", "User"],
  endpoints: (builder) => ({}),
});
