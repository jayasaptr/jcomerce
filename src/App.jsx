import { Box } from "./components/Box";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ProductCard } from "./components/ProductCard";
import { Button } from "./components/ui/button";
function App() {
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
        <div className="grid grid-cols-2 gap-4">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
