/** @format */

import { Button } from "./ui/button";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "@/lib/axios";
import { useSelector } from "react-redux";
import { fetchCart } from "@/services/cartService";

export const ProductCard = (props) => {
  const { image, name, price, stock, id } = props;
  const [quantity, setQuantity] = useState(0);

  const userSelector = useSelector((state) => state.user);

  const addToCart = async () => {
    if (!userSelector.id) {
      alert("Please login first");
      return;
    }

    try {
      const cartResponse = await axiosInstance.get("/carts", {
        params: {
          userId: userSelector.id,
          _embed: "product",
        },
      });

      const existingProduct = cartResponse.data.find((cart) => {
        return cart.productId === id;
      });

      if (existingProduct) {
        if (
          existingProduct.quantity + quantity >
          existingProduct.product.stock
        ) {
          alert("Quantity exceeds stock");
          return;
        }

        await axiosInstance.patch(`/carts/${existingProduct.id}`, {
          quantity: existingProduct.quantity + quantity,
        });
      } else {
        await axiosInstance.post("/carts", {
          userId: userSelector.id,
          productId: id,
          quantity: quantity,
        });
      }
      alert("Added to cart");
      fetchCart(userSelector.id);
    } catch (error) {
      console.log("🚀 ~ addToCart ~ error:", error);
    }
  };

  const incrementQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity != 0) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div className="p-4 border rounded-md md:max-w-96 flex flex-col gap-4">
      <Link
        to={"/product/" + id}
        className="aspect-square w-full overflow-hidden"
      >
        <img className="w-full" src={image} alt="product" />
      </Link>

      <Link to={"/product/" + id}>
        <p className="text-base">{name}</p>
        <p className="text-xl font-semibold">
          Rp {price.toLocaleString("id-ID")}
        </p>
        <p className="text-muted-foreground text-sm">In Stock: {stock}</p>
      </Link>
      <div className="flex flex-col gap-2">
        {/* Button Quantity */}
        <div className="flex justify-between items-center">
          <Button
            disabled={quantity === 0}
            onClick={decrementQuantity}
            size="icon"
            variant="ghost"
          >
            <IoIosRemove
              className="
            h-6 w-6"
            />
          </Button>
          <p className="text-lg font-bold">{quantity}</p>
          <Button
            disabled={quantity >= stock}
            onClick={incrementQuantity}
            size="icon"
            variant="ghost"
          >
            <IoIosAdd
              className="h-6 w-6
            "
            />
          </Button>
        </div>
        {/* Button add to cart */}
        <Button
          disabled={!stock || quantity < 1}
          onClick={addToCart}
          className="w-full"
        >
          {stock > 0 ? "Add to cart" : "Out of stock"}
        </Button>
      </div>
    </div>
  );
};
