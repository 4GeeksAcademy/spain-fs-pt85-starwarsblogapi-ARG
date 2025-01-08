import React, { useContext } from "react";
import { Context } from "../store/appContext";
import ScrollRow from "../component/ScrollRow.jsx";

const Favorites = () => {
    const { state } = useContext(Context);

    return (
        <div className="container my-5">
            <h2>Favorites</h2>
            {state.favorites.length > 0 ? (
                <ScrollRow items={state.favorites} />
            ) : (
                <p>No favorites added yet.</p>
            )}
        </div>
    );
};

export default Favorites;