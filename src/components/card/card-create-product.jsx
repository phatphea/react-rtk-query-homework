import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateProductMutation } from "../../features/product/productSlice2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or less"),
  price: z
    .number()
    .min(0, "Price must be a positive number")
    .max(1000000, "Price too high"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be 500 characters or less"),
  categoryId: z
    .number()
    .min(1, "Category ID is required and must be at least 1"),
  images: z.string().url("Must be a valid URL").min(1, "Image URL is required"),
});

const CardCreateProduct = () => {
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      price: "",
      description: "",
      categoryId: "",
      images: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        price: Number(data.price),
        categoryId: Number(data.categoryId),
        images: [data.images], // Wrap image URL in an array as expected by the API
      };
      await createProduct(payload).unwrap();

      // Use toast.success for successful creation
      toast.success("Product created successfully!");
      reset(); // Reset form after success
    } catch (error) {
      toast.error(errors?.data?.message);
      console.error("Error creating product:", error);

      // Use toast.error to display error messages
      if (error.status) {
        toast.error(
          `Failed to create product. Status: ${error.status}, Message: ${
            error.data?.message || "Unknown error"
          }`
        );
      } else {
        toast.error(
          `Failed to create product. Error: ${error.message || "Network error"}`
        );
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <ToastContainer position="bottom-right" />{" "}
      {/* Add the ToastContainer here */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Create New Product
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            {...register("title")}
            placeholder="Title"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>
        <div>
          <input
            type="number"
            {...register("price", { valueAsNumber: true })}
            placeholder="Price"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>
        <div>
          <textarea
            {...register("description")}
            placeholder="Description"
            rows="4"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
        <div>
          <input
            type="number"
            {...register("categoryId", { valueAsNumber: true })}
            placeholder="Category ID"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {errors.categoryId && (
            <p className="text-red-500 text-sm mt-1">
              {errors.categoryId.message}
            </p>
          )}
        </div>
        <div>
          <input
            type="text"
            {...register("images")}
            placeholder="Image URL"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          {errors.images && (
            <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default CardCreateProduct;
