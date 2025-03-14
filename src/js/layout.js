import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home.jsx";
import Details from "./views/Details.jsx";
import Favorites from "./views/Favorites.jsx";
import Navbar from "./component/Navbar.jsx";
import InjectContext from "./store/appContext.js";

const Layout = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/details/:type/:id" element={<Details />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    );
};

export default Layout;

// const Layout = () => {
//     return (
//         <InjectContext>
//             <BrowserRouter>
//                 <Navbar />
//                 <Routes>
//                     <Route path="/" element={<Home />} />
//                     <Route path="/details/:type/:id" element={<Details />} />
//                     <Route path="/favorites" element={<Favorites />} />
//                     <Route path="*" element={<h1>404 Not Found</h1>} />
//                 </Routes>
//             </BrowserRouter>
//         </InjectContext>
//     );
// };

// export default Layout;
