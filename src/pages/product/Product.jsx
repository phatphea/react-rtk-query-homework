import React from "react";
import CardProduct from "../../components/card/card-product";
import { useGetProductsQuery } from "../../features/product/productSlice2";
import SkeletonCardProduct from "../../components/card/skeleton-card-product";

export default function Product() {
  const { data, isLoading, isError } = useGetProductsQuery();
  const array = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <main className="max-w-screen-xl mx-auto">
      <section className="grid grid-cols-4 gap-5">
        {isLoading && array.map((index) => <SkeletonCardProduct key={index} />)}
        {/* product section */}
        {!isLoading &&
          data?.map((p, index) => (
            <CardProduct
              key={index}
              thumbnail={p.images[0]}
              title={p.title}
              id={p.id}
            />
          ))}
      </section>
    </main>
  );
}
