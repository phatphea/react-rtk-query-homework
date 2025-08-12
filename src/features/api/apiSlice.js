import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { he } from "zod/v4/locales";
import { getDecryptedAccessToken } from "../../utils/tokenUtils";

// custom fetchBaseQuery to handle the base URL
const baseQueryCustom = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers) => {
    const accessToken = getDecryptedAccessToken();

    if (accessToken) {
      headers.set("Authorization", accessToken);
    }

    return headers;
  },
});

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BASE_URL}` }),
  endpoints: (build) => ({}),
});
