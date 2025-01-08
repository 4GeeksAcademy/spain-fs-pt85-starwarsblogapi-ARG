import React, { createContext, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Card = ({ item, type }) => {
    const { state, actions } = useContext(Context);
    const navigate = useNavigate();

    const renderContent = () => {
        switch (type) {
            case "people":
                return (
                    <>
                        <p className="text-dark">Gender: {item.gender}</p>
                        <p className="text-dark">Hair Color: {item.hair_color}</p>
                        <p className="text-dark">Eye Color: {item.eye_color}</p>
                    </>
                );
            case "vehicles":
                return (
                    <>
                        <p className="text-dark">Max Speed: {item.max_atmosphering_speed}</p>
                        <p className="text-dark">Length: {item.length}m</p>
                    </>
                );
            case "planets":
                return (
                    <>
                        <p className="text-dark">Population: {item.population}</p>
                        <p className="text-dark">Terrain: {item.terrain}</p>
                    </>
                );
            default:
                return null;
        }
    };
    
    return (
        <div className="card px-3" style={{ width: "435px" }}>
            <img
                src="https://via.placeholder.com/400x200"
                className="card-img-top pt-2"
                alt={item.name}
                style={{ width: "400px", height: "200px", objectFit: "cover" }}
            />
            <div className="card-body">
                <h5 className="card-title text-dark">{item.name}</h5>
                {renderContent()}
                <div className="d-flex justify-content-between">
                    <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/details/${type}/${item.url.split("/")[5]}`)}
                    >
                        Learn More!
                    </button>
                    <button className="btn btn-outline-danger" onClick={() => actions.toggleFavorite(item)}>
                        ❤️
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
