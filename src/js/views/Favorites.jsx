import React, { useContext } from "react";
import { Context } from "../store/appContext";
import ScrollRow from "../component/ScrollRow.jsx";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate();

    return (
        <div className="container my-5">
            <h2>Favorites</h2>
            {store.favorites.length > 0 ? (
                <ScrollRow items={store.favorites} />
            ) : (
                <p className="text-center text-muted">No favorites yet!</p>
            )}
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                    🔙 Go Back
            </button>
        </div>
    );
};

export default Favorites;