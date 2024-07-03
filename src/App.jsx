/** @format */

import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import { Routes, Route, useLocation } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductManagementPage from "./pages/admin/ProductManagementPage";
import CreateProductPage from "./pages/admin/CreateProductPage";
import EditProductPage from "./pages/admin/EditProductPage";
import CounterPage from "./pages/CounterPage";
import RegisterPage from "./pages/RegisterPage";
import { axiosInstance } from "./lib/axios";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { boolean } from "zod";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const [loading, isLoading] = useState(true);

  const hydrateAuth = async () => {
    try {
      const currentUser = localStorage.getItem("current-user");

      if (!currentUser) return;

      const userResponse = await axiosInstance.get("/users/" + currentUser);

      dispatch({
        type: "USER_LOGIN",
        payload: {
          username: userResponse.data.username,
          email: userResponse.data.email,
          id: userResponse.data.id,
        },
      });
    } catch (error) {
      console.log("🚀 ~ hydrateAuth ~ error:", error);
    } finally {
      isLoading(false);
    }
  };
  useEffect(() => {
    hydrateAuth();
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!location.pathname.startsWith("/admin") ? <Header /> : null}

      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/cart" Component={CartPage} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/register" Component={RegisterPage} />
        <Route path="/counter" Component={CounterPage} />
        <Route path="/product/:id" Component={ProductDetailPage} />

        <Route path="/admin">
          <Route path="products" Component={ProductManagementPage} />
          <Route path="products/create" Component={CreateProductPage} />
          <Route path="products/edit/:productId" Component={EditProductPage} />
        </Route>

        <Route path="*" Component={NotFoundPage} />
      </Routes>

      {!location.pathname.startsWith("/admin") ? <Footer /> : null}
    </>
  );
}

export default App;
