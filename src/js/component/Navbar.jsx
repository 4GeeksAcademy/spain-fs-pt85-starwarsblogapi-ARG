import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    return (
        <nav className="navbar navbar-dark bg-dark px-3">
            <Link to="/" className="navbar-brand">Star Wars Blog</Link>
            <Link to="/favorites" className="text-light text-center pt-2 text-decoration-none"><h4>Favorites</h4></Link>
            <div className="dropdown">
                <button className="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown">
                    Favorites ({store.favorites.length})
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                    {store.favorites.length > 0 ? (
                        store.favorites.map((item, index) => (
                            <li key={index} className="dropdown-item d-flex justify-content-between">
                                {/* 🔗 Click para ir a detalles */}
                                <button
                                    className="btn btn-link text-dark text-decoration-none p-0"
                                    onClick={() => navigate(`/details/${item.type}/${item.uid}`)}
                                >
                                    {item.name}
                                </button>
                                
                                {/* ❌ Botón para eliminar favorito */}
                                <button 
                                    className="btn btn-sm btn-danger ms-2" 
                                    onClick={() => actions.toggleFavorite(item, item.type)}
                                >
                                    ❌
                                </button>
                            </li>
                        ))
                    ) : (
                        <li className="dropdown-item">No favorites</li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

// import React, { useContext } from "react";
// import { Context } from "../store/appContext";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";


// const Navbar = () => {
//     const navigate = useNavigate();
//     const { store, actions } = useContext(Context);

//     return (
//         <nav className="navbar navbar-dark bg-dark px-3">
//             <Link to="/" className="navbar-brand">Star Wars Blog</Link>
//             <div className="dropdown">
//                 <button className="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown">
//                     Favorites ({store.favorites.length})
//                 </button>
//                 <ul className="dropdown-menu dropdown-menu-end">
//                 {store.favorites.length > 0 ? (
//                         store.favorites.map((item, index) => (
//                             <li key={index} className="dropdown-item d-flex justify-content-between">
//                                 {/* 🔗 Click para ir a detalles */}
//                                 <button
//                                     className="btn btn-link text-dark text-decoration-none p-0"
//                                     onClick={() => navigate(`/details/${item.type}/${item.uid}`)}
//                                 >
//                                     {item.name}
//                                 </button>
                                
//                                 {/* ❌ Botón para eliminar favorito */}
//                                 <button 
//                                     className="btn btn-sm btn-danger ms-2" 
//                                     onClick={() => actions.toggleFavorite(item)}
//                                 >
//                                     ❌
//                                 </button>
//                             </li>
//                         ))
//                     ) : (
//                         <li className="dropdown-item">No favorites</li>
//                     )}
//                 </ul>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;

