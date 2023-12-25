import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://dummyjson.com";
const createRequest = (url) => ({
  url,
  headers: { "Content-Type": "application/json" },
});

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (path) => createRequest(`/${path}`),
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
