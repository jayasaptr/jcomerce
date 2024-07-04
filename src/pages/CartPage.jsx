import { CartItem } from "@/components/CartItem";
import { AuthPage } from "@/components/guard/AuthPage";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { axiosInstance } from "@/lib/axios";
import { fetchCart } from "@/services/cartService";
import { useSelector } from "react-redux";

const CartPage = () => {
  const cartSelector = useSelector((state) => state.cart);
  const userSelector = useSelector((state) => state.user);

  const handleCheckout = async () => {
    // 1. Check if the quantity of the items in the cart is still available
    for (let i = 0; i < cartSelector.items.length; i++) {
      const currentCartItem = cartSelector.items[i];

      if (currentCartItem.quantity > currentCartItem.product.stock) {
        alert("One of the items in your cart is out of stock!");
        return;
      }
    }

    // 2. If the quantity of the items in the cart is still available, proceed to checkout
    const totalPrice = cartSelector.items.reduce((a, b) => {
      return a + b.quantity * b.product.price;
    }, 0);

    const tax = totalPrice / 10;

    await axiosInstance.post("/transaction", {
      userId: userSelector.id,
      total_price: totalPrice,
      tax: tax,
      transaction_date: new Date(),
      items: cartSelector.items,
    });

    // 3. update the stock of the products in the database
    cartSelector.items.forEach(async (item) => {
      await axiosInstance.patch(`/products/${item.product.id}`, {
        stock: item.product.stock - item.quantity,
      });
    });

    // 4. Clear the cart
    cartSelector.items.forEach(async (item) => {
      await axiosInstance.delete(`/carts/${item.id}`);
    });

    fetchCart(useSelector.id);

    alert("Checkout successful!");
  };

  return (
    <AuthPage>
      <main className="min-h-screen max-w-screen-lg mx-auto px-4 mt-8">
        <h1 className="text-3xl font-bold">My Cart</h1>
        <div className="mt-10">
          <Separator />
          <div className="grid grid-cols-12 gap-8 my-8">
            <div className="col-span-7 gap-6 flex flex-col">
              {cartSelector.items.map((item) => {
                return (
                  <CartItem
                    key={item.id}
                    name={item.product.name}
                    price={item.product.price}
                    image={item.product.image}
                    quantity={item.quantity}
                    stock={item.product.stock}
                    cartId={item.id}
                  />
                );
              })}
            </div>

            <Card className="col-span-5 bg-gray-50 border-0 h-min">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex pb-4 justify-between border-b">
                  <span className="text-sm text-muted-foreground">
                    Subtotal
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Rp.{" "}
                    {cartSelector.items
                      .reduce((a, b) => {
                        return a + b.quantity * b.product.price;
                      }, 0)
                      .toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex py-4 justify-between border-b">
                  <span className="text-sm text-muted-foreground">
                    Taxes (10%)
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Rp.{" "}
                    {(
                      cartSelector.items.reduce((a, b) => {
                        return a + b.quantity * b.product.price;
                      }, 0) / 10
                    ).toLocaleString("id-ID")}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-6">
                <div className="flex justify-between w-full">
                  <span className="font-semibold text-muted-foreground">
                    Order Total
                  </span>
                  <span className="font-semibold text-muted-foreground">
                    Rp.{" "}
                    {(
                      cartSelector.items.reduce((a, b) => {
                        return a + b.quantity * b.product.price;
                      }, 0) +
                      cartSelector.items.reduce((a, b) => {
                        return a + b.quantity * b.product.price;
                      }, 0) /
                        10
                    ).toLocaleString("id-ID")}
                  </span>
                </div>
                <Button onClick={handleCheckout} className="w-full">
                  Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </AuthPage>
  );
};

export default CartPage;
