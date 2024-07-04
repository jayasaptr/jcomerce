import { CartItem } from "@/components/CartItem";
import { AuthPage } from "@/components/guard/AuthPage";
import { Separator } from "@/components/ui/separator";
import { useSelector } from "react-redux";

const CartPage = () => {
  const cartSelector = useSelector((state) => state.cart);

  return (
    <AuthPage>
      <main className="min-h-screen max-w-screen-lg mx-auto px-4 mt-8">
        <h1 className="text-3xl font-bold">My Cart</h1>
        <div className="mt-10">
          <Separator />
          <div className="grid grid-cols-8 gap-8 my-8">
            <div className="col-span-7 gap-6 flex flex-col">
              {cartSelector.items.map((item) => {
                return (
                  <CartItem
                    name={item.product.name}
                    price={item.product.price}
                    image={item.product.image}
                    quantity={item.quantity}
                    stock={item.product.stock}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </AuthPage>
  );
};

export default CartPage;
