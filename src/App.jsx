/** @format */

import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import { Routes, Route } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' Component={HomePage} />
        <Route path='/cart' Component={CartPage} />
        <Route path='*' Component={NotFoundPage} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
