import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext";
import Home from "./views/Home.jsx";
import Details from "./views/Details.jsx";
import Navbar from "./component/Navbar.jsx";

const Layout = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/details/:type/:id" element={<Details />} />
                <Route path="*" element={<h1>NOT FOUND!</h1>} />
            </Routes>
        </BrowserRouter>
    );
};

export default injectContext(Layout);
