import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Homepage from "./pages/homepage/Homepage";
import PizzaPage from "./pages/pizzapage/PizzaPage";
import ProductListPage from "./pages/productListPage/ProductListPage";
import Footer from "./components/footer/Footer";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Cart from "./pages/cart/Cart";
import PlaceOrderPage from "./pages/placeOrderPage/PlaceOrderPage";
import ProductListAdminPage from "./pages/productListAdminPage/ProductListAdminPage";
import UserListAdminPage from "./pages/userListAdminPage/UserListAdminPage";
import OrderListAdminPage from "./pages/orderListAdminPage/OrderListAdminPage";
import OrderPage from "./pages/orderPage/OrderPage";
import UserEditPage from "./pages/userEditPage/UserEditPage";
import ProductCreatePage from "./pages/productCreatePage/ProductCreatePage";
import UpdateProductPage from "./pages/updateProductPage/UpdateProductPage";
import Navbar from "./components/navbar/Navbar";
import Modal from "./components/modal/Modal";

import "./App.scss";

function App() {
  const [visibleModal, setVisibleModal] = useState(false);

  const toggleVisibleModal = () => {
    setVisibleModal(!visibleModal);
  };

  

  return (
    <Router>
      <div className="App">
        <Navbar toggleVisibleModal={toggleVisibleModal} />
        <Modal visibleModal={visibleModal} setVisibleModal={setVisibleModal} />
        <main>
          <Route path="/products/:category" component={ ProductListPage } />
          <Route path="/" component={Homepage} exact />

          <Route path="/product/:id" component={PizzaPage} />

          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/cart/:id?" component={Cart} />
          <Route path="/profile" component={Profile} />
          <Route path="/admin/productlist" component={ProductListAdminPage} />
          <Route path="/admin/userlist" component={UserListAdminPage} />
          <Route path="/admin/orderlist" component={OrderListAdminPage} />
          <Route path="/admin/user/:id/edit" component={UserEditPage} />
          <Route path="/admin/product/:id/edit" component={UpdateProductPage} />
          <Route path="/admin/product/create" component={ProductCreatePage} />
          <Route path="/placeorder" component={PlaceOrderPage} />
          <Route path="/order/:id" component={OrderPage} />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
