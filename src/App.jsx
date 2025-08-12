import "./App.css";
import NavbarBasic from "./components/layouts/Navbar";
import { useGetProductsQuery } from "./features/product/productSlice2";
import CardProduct from "./components/card/card-product";
import SkeletonCardProduct from "./components/card/skeleton-card-product";

function App() {
  const { data, isLoading } = useGetProductsQuery();
  const array = [1, 2, 3, 4, 5, 6, 7, 8];

  // console.log("data from RTK Query", data);

  return (
    <>
      <main className="max-w-screen-xl mx-auto">
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-2">
          {isLoading &&
            array.map((index) => <SkeletonCardProduct key={index} />)}
          {/* product section */}
          {!isLoading &&

            //data in api platzi
            // data?.content.map((p, index) => (
            //   <CardProduct
            //     key={index}
            //     thumbnail={p.images[0]}
            //     title={p.title}
            //     id={p.id}
            //   />
            // ))}

            // data in swager
            data?.content.map((p, index) => (
              <CardProduct
                key={index}
                thumbnail={p.thumbnail}
                title={p.name}
                id={p.uuid}
              />
            ))}
        </section>
      </main>
    </>
  );
}

export default App;
