import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Card = ({ item, type }) => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const isFavorite = store.favorites.some(fav => fav.name === item.name);

    // Verifica si item.properties existe antes de acceder a sus valores
    const properties = item.properties || {};

    return (
        <div className="card mx-2" style={{ width: "18rem" }}>
            <img src={"http://fakeimg.pl/400x200"} className="card-img-top" alt={item.name} />
            <div className="card-body">
                <h5 className="card-title text-dark">{item.name}</h5>

                {/* Mostrar características según el tipo */}
                {type === "people" && (
                    <p className="text-dark">
                        Gender: {properties.gender} | Hair: {properties.hair_color} | Eyes: {properties.eye_color}
                    </p>
                )}
                {type === "vehicles" && (
                    <p className="text-dark">
                        Max Speed: {properties.max_atmosphering_speed} | Length: {properties.length}
                    </p>
                )}
                {type === "planets" && (
                    <p className="text-dark">
                        Population: {properties.population} | Terrain: {properties.terrain}
                    </p>
                )}

                <div className="d-flex justify-content-between">
                    <button 
                        className="btn btn-primary" 
                        onClick={() => navigate(`/details/${type}/${item.uid}`)}
                    >
                        Learn More
                    </button>
                    <button className="btn btn-outline-warning" onClick={() => actions.toggleFavorite(item, type)}>
                        {isFavorite ? "❤️" : "🤍"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;

// import React, { useContext, useCallback } from "react";
// import { Context } from "../store/appContext";
// import { useNavigate } from "react-router-dom";



// const Card = ({ item, type }) => {
//     const navigate = useNavigate();
//     const { store, actions } = useContext(Context);
//     const isFavorite = store.favorites.some(fav => fav.name === item.name);

//     return (
//         <div className="card mx-2" style={{ width: "18rem" }}>
//             <img src={"http://fakeimg.pl/400x200"} className="card-img-top" alt={item.name} />
//             <div className="card-body">
//                 <h5 className="card-title text-dark">{item.name}</h5>
//                 {type === "people" && <p className="text-dark">Gender: {item.gender} | Hair: {item.hair_color} | Eyes: {item.eye_color}</p>}
//                 {type === "vehicles" && <p className="text-dark">Max Speed: {item.max_atmosphering_speed} | Length: {item.length}</p>}
//                 {type === "planets" && <p className="text-dark">Population: {item.population} | Terrain: {item.terrain}</p>}
//                 <div className="d-flex justify-content-between">
//                     <button 
//                     className="btn btn-primary" 
//                     onClick={() => navigate(`/details/${type}/${item.uid}`)}
//                 >
//                     Learn More
//                 </button>
//                     <button className="btn btn-outline-warning" onClick={() => actions.toggleFavorite(item,type)}>
//                         {isFavorite ? "❤️" : "🤍"}
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Card;
