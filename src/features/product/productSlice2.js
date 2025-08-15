import { apiSlice } from "../api/apiSlice";

const productApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
      
    }),

    getProductById: build.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: (id) => [{ type: "Product", id }],
    }),
    createProduct: build.mutation({
      query: (createProduct) => ({
        url: "/products",
        method: "POST",
        body: createProduct,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    DeleteProduct: build.mutation({
      query: (uuid) => ({
        url: `/products/${uuid}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { uuid }) => [
        { type: "Product", id: uuid },
        { type: "Product", id: "LIST" },
      ],
    }),
    UpdateProduct: build.mutation({
      query: ({ uuid, UpdateProduct }) => ({
        url: `/products/${uuid}`,
        method: "PUT",
        body: UpdateProduct,
      }),
      invalidatesTags: (result, error, { updateProduct }) => [
        { type: "Product", id: updateProduct.uuid },
        { type: "Product", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi;
