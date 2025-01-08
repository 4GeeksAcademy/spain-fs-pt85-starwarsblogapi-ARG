import React, { useContext } from "react";
import { Context } from "../store/appContext";

const Navbar = () => {
    const { state, actions } = useContext(Context);

    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="/">Star Wars Blog</a>
                <div className="dropdown">
                    <button 
                        className="btn btn-primary dropdown-toggle" 
                        type="button" 
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                        Favorites ({state.favorites.length})
                    </button>
                    <ul className="dropdown-menu">
                        {state.favorites.length === 0 
                            ? <li className="dropdown-item">No favorites added</li>
                            : state.favorites.map((fav, index) => (
                                <li key={index} className="dropdown-item d-flex justify-content-between">
                                    {fav.name}
                                    <button onClick={() => actions.removeFavorite(fav)} className="btn btn-danger btn-sm">
                                        <i className="fa fa-trash"></i>
                                    </button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;