import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from "./store.js";
import { Provider } from "react-redux";
import Product from "./pages/product/Product.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import ProductDetail from "./pages/product/ProductDetail.jsx";
import Login from "./pages/auth/Login.jsx";
import RootLayout from "./components/layouts/root-layout.jsx";
import CreateProduct from "./pages/product/CreateProduct.jsx";
import Register from "./pages/auth/Register.jsx";
import ProductDashboard from "./pages/product/ProductDashboard.jsx";
import UpdateProduct from "./pages/product/UpdateProduct.jsx";

// App
// path="/products" Product
// path="/products/:id" ProductDetail
// path="/create-product" CreateProduct

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<App />} />
            {/* <Route path="/" element={<SEO/>}/> */}
            <Route path="/products" element={<Product />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/product-dashboard" element={<ProductDashboard />} />
            <Route path="/update-product/:id" element={<UpdateProduct />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
