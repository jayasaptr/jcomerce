/** @format */

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { IoCart } from "react-icons/io5";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCart } from "@/services/cartService";
import { History } from "lucide-react";

export const Header = () => {
  const userSelector = useSelector((state) => state.user);
  const cartSelector = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleLogout = () => {
    // 1. Remove user from local storage
    localStorage.removeItem("current-user");
    // 2. Dispatch action to remove user from redux store
    dispatch({ type: "USER_LOGOUT" });
  };

  useEffect(() => {
    fetchCart(userSelector.id);
  }, []);

  return (
    <header className="flex items-center justify-between px-8 py-4 border-b">
      <Link to="/">
        <p className="font-bold text-2xl hover:cursor-pointer mr-2">LStore</p>
      </Link>
      <Input className="max-w-[600px]" placeholder="Search Product" />
      <div className="flex space-x-4 h-5 items-center">
        <div className="flex space-x-1 ml-2">
          <Link to="/cart">
            <Button size="icon" variant="ghost">
              <IoCart className="h-6 w-6 mr-2" />
              <span className="text-lg font-bold">
                {cartSelector.items.length}
              </span>
            </Button>
          </Link>

          <Link to="/history">
            <Button size="icon" variant="ghost">
              <History className="h-6 w-6" />
            </Button>
          </Link>
        </div>

        <Separator orientation="vertical" className="h-full" />

        <div className="flex space-x-2">
          {userSelector.username ? (
            <div className="flex items-center">
              <p>Hello, {userSelector.username}</p>
              <Button onClick={handleLogout} variant="destructive">
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button>Sign In</Button>
              </Link>
              <Link to="/register">
                <Button variant="outline">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
