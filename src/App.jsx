import { Box } from "./components/Box";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ProductCard } from "./components/ProductCard";

const productRaw = [
  {
    name: "Nike Jordan",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/1419ed34-7762-420a-9f2a-2e2a65d5aba9/dunk-low-shoes-kKHp1z.png",
    price: 250000,
    stock: 10,
  },
  {
    name: "Nike Jordan Mid",
    image:
      "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/63193ad7-3dcb-4ef9-a242-77126431b022/air-jordan-1-elevate-low-shoes-XlkVrM.png",
    price: 150000,
    stock: 15,
  },
];

function App() {
  const product = productRaw.map((product) => {
    return (
      <ProductCard
        image={product.image}
        name={product.name}
        price={product.price}
        stock={product.stock}
      />
    );
  });
  return (
    <>
      <Header />
      <main className="min-h-[90vh] max-w-screen-md mx-auto px-4 mt-8">
        <div className="pb-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Become a trand-setter with us.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Jproject provides you with the finest clothings and ensures your
            confidence throghout your days
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">{product}</div>
      </main>
      <Footer />
    </>
  );
}

export default App;
