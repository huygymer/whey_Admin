import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Login from "./modules/auth/Login";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "./components/MainLayout";
import Categories from "./modules/category";
import Products from "./modules/product";
import AddProduct from "./modules/product/AddProduct";
import UpdateProduct from "./modules/product/UpdateProduct";

const App = () => {
  
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <MainLayout>
          <ProtectedRoute exact path="/" component={Categories} />
          <ProtectedRoute exact path="/categories" component={Categories} />

          <ProtectedRoute path="/products/add" component={AddProduct} />
          <ProtectedRoute path="/product/:slug" component={UpdateProduct} />
          <ProtectedRoute exact path="/products" component={Products} />
        </MainLayout>
        <Route exact path="/">
          <Redirect to="/categories" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
