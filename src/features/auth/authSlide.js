import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: `/auth/login`,
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: body // auto convert to JSON data
      })
    })
  })
});

export const { useLoginMutation } = authApi;
