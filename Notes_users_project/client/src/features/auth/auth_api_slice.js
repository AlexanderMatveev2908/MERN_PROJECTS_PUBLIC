import { api_slice } from "../../app/api/api_slice.js";
import { logout, set_credentials } from "./auth_slice.js";

export const auth_api_slice = api_slice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: { ...credentials },
      }),
    }),

    sendLogout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(logout());

          setTimeout(() => dispatch(api_slice.util.resetApiState()), 1000);
        } catch (err) {
          console.log("err =>", err);
        }
      },
    }),

    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          const { access_token } = data;

          dispatch(set_credentials({ access_token }));
        } catch (err) {
          console.log("err 403 =>", err);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation: use_login_mutation,
  useSendLogoutMutation: use_send_logout_mutation,
  useRefreshMutation: use_refresh_mutation,
} = auth_api_slice;
