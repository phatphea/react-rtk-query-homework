import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateProductMutation } from "../../features/product/productSlice2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const schema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be 100 characters or less"),
  price: z
    .number()
    .min(0, "Price must be a positive number")
    .max(1000000, "Price too high"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be 500 characters or less"),
  images: z.string().url("Must be a valid URL").min(1, "Image URL is required"),
});

const CardUpdateProduct = () => {
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      price: "",
      description: "",
      images: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.name,
        description: data.description,
        priceIn: Number(data.price), 
        priceOut: Number(data.price) * 1.5, 
        images: [data.images], 
        thumbnail: data.images,
        stockQuantity: 100, 
        computerSpec: {
          processor: "N/A",
          ram: "N/A",
          storage: "N/A",
          gpu: "N/A",
          os: "N/A",
          screenSize: "N/A",
          battery: "N/A",
        },
        color: [
          {
            color: "N/A", 
            images: [data.images],
          },
        ],
        warranty: "5 Days Freshness Guarantee", 
        availability: true, 
        categoryUuid: "eb115ca4-a6b2-43f7-aa59-2def7e30dd7b", 
        supplierUuid: "fd9d42e3-3afc-43a8-8eb4-7cb4c1c9b411", 
        brandUuid: "8620f990-ef33-495c-b38c-236da90c9b46", 
        discount: 0, // Default discount
      };

      await createProduct(payload).unwrap();
      toast.success("Product created successfully!");
      reset();
    } catch (error) {
      console.error("Error creating product:", error);
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
      <ToastContainer position="bottom-right" />
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Update Product
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            {...register("name")}
            placeholder="Name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <input
            type="number"
            {...register("price", { valueAsNumber: true })}
            placeholder="Price"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
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
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500 resize-none"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
        <div>
          <input
            type="text"
            {...register("images")}
            placeholder="Image URL"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
          {errors.images && (
            <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default CardUpdateProduct;
