import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { api_slice } from "../../app/api/api_slice.js";

const users_adapter = createEntityAdapter({});

const initial_state = users_adapter.getInitialState();

export const users_api_slice = api_slice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",

        validate_status: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),

      transformResponse: (response_data) => {
        const loaded_users =
          response_data?.users?.map((user) => {
            return { ...user, id: user._id };
          }) || [];

        return users_adapter.setAll(initial_state, loaded_users);
      },

      providesTags: (result) => {
        if (result?.ids?.length) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),

    getUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),

      keepUnusedDataFor: 5,

      transformResponse: (response_data) => {
        if (!response_data?.user) return { ...response_data, user: null };

        const loaded_user = {
          ...response_data?.user,
          id: response_data?.user._id,
        };
        return { ...response_data, user: loaded_user };
      },

      providesTags: (result) => {
        if (result?.user) return [{ type: "User", id: result.user._id }];
        else return [];
      },
    }),

    addUser: builder.mutation({
      query: (payload) => ({
        url: "/users",
        method: "POST",
        body: { ...payload },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),

    updateUser: builder.mutation({
      query: (payload) => ({
        url: "/users",
        method: "PATCH",
        body: { ...payload },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),

    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: "/users",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});

export const {
  useGetUserQuery: use_get_user_query,
  useGetUsersQuery: use_get_users_query,
  useAddUserMutation: use_add_user_mutation,
  useUpdateUserMutation: use_update_user_mutation,
  useDeleteUserMutation: use_delete_user_mutation,
} = users_api_slice;

export const select_users_result = users_api_slice.endpoints.getUsers.select();

const select_users_data = createSelector(
  select_users_result,
  (users_result) => users_result.data
);

export const {
  selectAll: select_all_users,
  selectById: select_user_by_id,
  selectIds: select_users_ids,
} = users_adapter.getSelectors(
  (state) => select_users_data(state) ?? initial_state
);
