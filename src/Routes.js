import React from "react";
import { Route, Switch } from "react-router-dom";

import AuthenticatedRoute from
"./components/AuthenticatedRoute";
import UnauthenticatedRoute from
"./components/UnauthenticatedRoute";


import Signup from "./pages/Signup";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import AddProduct from "./pages/AddProduct";
import Product from "./pages/Product";
import Settings from "./pages/Settings";
import Products from "./pages/seller/Products";

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <UnauthenticatedRoute exact path="/login">
                <Login />
            </UnauthenticatedRoute>
            <UnauthenticatedRoute exact path="/signup">
                <Signup />
            </UnauthenticatedRoute>
            <AuthenticatedRoute exact path="/settings">
                <Settings />
            </AuthenticatedRoute>
            <AuthenticatedRoute exact path="/product/new">
                <AddProduct />
            </AuthenticatedRoute>
            <AuthenticatedRoute exact path="/product/:id">
                <Product />
            </AuthenticatedRoute>
            <AuthenticatedRoute exact path="/my-products">
                <Products />
            </AuthenticatedRoute>
            <Route>
                <NotFound />
            </Route>
        </Switch>
    );
}