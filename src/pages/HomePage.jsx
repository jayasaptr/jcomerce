import { ProductCard } from "../components/ProductCard";
import { axiosInstance } from "@/lib/axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [productIsLoading, setProductIsLoading] = useState(false);

  const userSelector = useSelector((state) => state.user);
  const counterSelector = useSelector((state) => state.counter);

  const productList = products.map((product) => {
    return (
      <ProductCard
        image={product.image}
        name={product.name}
        price={product.price}
        stock={product.stock}
        id={product.id}
      />
    );
  });

  const fetchProducts = async () => {
    setProductIsLoading(true);
    try {
      const response = await axiosInstance.get("/products");
      console.log("🚀 ~ fetchProducts ~ response:", response.data);
      setProducts(response.data);
    } catch (err) {
      console.log("🚀 ~ fetchProducts ~ err:", err);
    } finally {
      setProductIsLoading(false);
    }
  };

  //fetch products data once, when home page is first mounted
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <main className="min-h-[90vh] max-w-screen-md mx-auto px-4 mt-8">
        <div className="pb-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Become a trand-setter with us. {userSelector.username}
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Jproject provides you with the finest clothings and ensures your
            confidence throghout your days
          </p>
          <p>Counter : {counterSelector.count}</p>
        </div>
        {productIsLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">{productList}</div>
        )}
      </main>
    </>
  );
};

export default HomePage;
