import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { api_slice } from "../../app/api/api_slice.js";

const notes_adapter = createEntityAdapter({
  sortComparer: (a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

const initial_state = notes_adapter.getInitialState();

export const notes_api_slice = api_slice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => ({
        url: "/notes",
        method: "GET",

        validate_status: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),

      transformResponse: (response_data) => {
        const loaded_notes =
          response_data?.notes?.map((note) => {
            return { ...note, id: note._id };
          }) || [];
        return notes_adapter.setAll(initial_state, loaded_notes);
      },

      providesTags: (result) => {
        if (result?.ids?.length)
          return [
            { type: "Note", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Note", id })),
          ];
        else return [{ type: "Note", id: "LIST" }];
      },
    }),

    // getNote: builder.query({
    //   query: (id) => ({
    //     url: `/notes/${id}`,
    //     method: "GET",
    //   }),

    //   keepUnusedDataFor: 5,

    //   transformResponse: (response_data) => {
    //     if (!response_data?.note) return { ...response_data, note: null };

    //     const processed_note = {
    //       ...response_data?.note,
    //       id: response_data?.note._id,
    //     };

    //     return { ...response_data, note: processed_note };
    //   },

    //   providesTags: (result) => {
    //     if (!result?.note) return [];
    //     else return [{ type: "Note", id: result.note._id }];
    //   },
    // }),

    addNote: builder.mutation({
      query: (payload) => ({
        url: "/notes",
        method: "POST",
        body: { ...payload },
      }),
      invalidatesTags: [{ type: "Note", id: "LIST" }],
    }),

    updateNote: builder.mutation({
      query: (payload) => ({
        url: "/notes",
        method: "PATCH",
        body: { ...payload },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    }),

    deleteNote: builder.mutation({
      query: ({ id }) => ({
        url: "/notes",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    }),
  }),
});

export const {
  useGetNotesQuery: use_get_notes_query,
  useGetNoteQuery: use_get_note_query,
  useAddNoteMutation: use_add_note_mutation,
  useUpdateNoteMutation: use_update_note_mutation,
  useDeleteNoteMutation: use_delete_note_mutation,
} = notes_api_slice;

export const select_notes_result = notes_api_slice.endpoints.getNotes.select();

const select_notes_data = createSelector(
  select_notes_result,
  (notes_result) => notes_result.data
);

export const {
  selectAll: select_all_notes,
  selectById: select_note_by_id,
  selectIds: select_notes_ids,
} = notes_adapter.getSelectors(
  (state) => select_notes_data(state) ?? initial_state
);
