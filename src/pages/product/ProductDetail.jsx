import React from "react";
import { useParams } from "react-router";
import { useGetProductByIdQuery } from "../../features/product/productSlice2";
import CardProductDetails from "../../components/card/card-product-detail";
import SkeletonCardProduct from "../../components/card/skeleton-card-product";

const ProductDetail = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetProductByIdQuery(id);

  // Conditionally render the skeleton component while loading
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        {/* <SkeletonCardProductDetails /> */}
        <SkeletonCardProduct />
      </div>
    );
  }

  // Handle the error state
  if (isError) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center text-red-500">
        <p>There was an error loading the product.</p>
      </div>
    );
  }

  // Render the actual product details once the data is available
  return (
    <div className="max-w-4xl mx-auto p-4">
      <CardProductDetails product={data} />
    </div>
  );
};

export default ProductDetail;
