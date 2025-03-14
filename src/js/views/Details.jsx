import React, { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Details = () => {
    const { type, id } = useParams();
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [homeworld, setHomeworld] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false); // Nuevo estado para el botón de favoritos

    useEffect(() => {
        console.log("Ejecutando fetchItemDetails para", type, id);
        if (!store.itemDetails || store.itemDetails.uid !== id) {
            actions.fetchItemDetails(type, id);
        }
    }, [type, id, store.itemDetails?.uid]);

    useEffect(() => {
        if (store.itemDetails?.properties?.homeworld) {
            const fetchHomeworld = async () => {
                const homeworldURL = store.itemDetails.properties.homeworld;
                if (homeworldURL.startsWith("https://")) {
                    const planetId = homeworldURL.split("/").slice(-1)[0];
                    const response = await fetch(homeworldURL);
                    const data = await response.json();
                    setHomeworld({ name: data.result.properties.name, id: planetId });
                }
            };
            fetchHomeworld();
        }
    }, [store.itemDetails]);

    // ✅ Efecto para actualizar `isFavorite` cuando cambian los favoritos
    useEffect(() => {
        setIsFavorite(store.favorites.some(fav => fav.uid === id));
    }, [store.favorites, id]);

    if (!store.itemDetails) {
        return <p className="text-center my-5">Loading...</p>;
    }

    if (store.itemDetails === "NOT FOUND!") {
        return <p className="text-center my-5">Not Found!</p>;
    }

    const item = store.itemDetails;
    const excludedProperties = ["created", "edited", "url"];

    return (
        <div className="container my-5">
            <div className="row mb-4">
                <div className="col-md-6">
                    <img
                        src="https://www.gammaracionero.es/wp-content/uploads/2016/09/placeholder-800x600.png"
                        alt={item.properties.name}
                        className="img-fluid rounded"
                    />
                </div>
                <div className="col-md-6">
                    <h2 className="mb-3">{item.properties.name}</h2>
                    <p className="text-muted">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lorem lacus, malesuada interdum 
                    pulvinar suscipit, fermentum vel mauris. Donec nulla dui, maximus nec ex non, mattis porttitor velit. 
                    Nulla facilisi. Aenean rhoncus tempus nibh. Ut rutrum ante velit. Sed ac neque quis massa lacinia porta.
                    Phasellus nec magna ante. Aenean massa mauris, convallis ut quam a, sagittis vehicula nibh. 
                    Curabitur eget tellus placerat ligula varius euismod. Sed interdum erat felis, nec imperdiet ipsum malesuada a. 
                    Maecenas hendrerit dui id quam efficitur sodales. In arcu eros, venenatis eget facilisis vitae, accumsan aliquam ligu
                    Cras convallis eges tas mauris eu tincidunt. Curabitur egestas egestas tincidunt.
                    Fusce pharetra elementum libero, vel tempus urna aliquet elementum.
                    </p>
                    <button className="btn btn-primary" onClick={() => navigate(-1)}>
                        ⬅️ Back
                    </button>
                </div>
            </div>

            <hr />

            <div className="row">
                {Object.entries(item.properties)
                    .filter(([key]) => !excludedProperties.includes(key))
                    .map(([key, value], index) => (
                        <div key={index} className="col-md-3 mb-3">
                            <strong className="text-uppercase">{key.replace("_", " ")}:</strong>
                            <br />
                            {key === "homeworld" && homeworld ? (
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate(`/details/planets/${homeworld.id}`);
                                    }}
                                >
                                    {homeworld.name}
                                </a>
                            ) : Array.isArray(value) ? (
                                value.map((link, idx) => (
                                    <div key={idx}>
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate(`/details/${link.url.split("/")[4]}/${link.url.split("/")[5]}`);
                                            }}
                                        >
                                            {link.name}
                                        </a>
                                    </div>
                                ))
                            ) : typeof value === "object" && value?.url ? (
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate(`/details/${value.url.split("/")[4]}/${value.url.split("/")[5]}`);
                                    }}
                                >
                                    {value.name}
                                </a>
                            ) : (
                                <span>{value}</span>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Details;
// import React, { useEffect, useContext, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Context } from "../store/appContext";

// const Details = () => {
//     const { type, id } = useParams();
//     const navigate = useNavigate();
//     const { store, actions } = useContext(Context);
//     const [homeworld, setHomeworld] = useState(null); // Estado para almacenar el nombre del planeta

//     useEffect(() => {
//         console.log("Ejecutando fetchItemDetails para", type, id);
//         if (!store.itemDetails || store.itemDetails.uid !== id) {
//             actions.fetchItemDetails(type, id);
//         }
//     }, [type, id, store.itemDetails?.uid]);

//     useEffect(() => {
//         if (store.itemDetails?.properties?.homeworld) {
//             const fetchHomeworld = async () => {
//                 const homeworldURL = store.itemDetails.properties.homeworld;
//                 if (homeworldURL.startsWith("https://")) {
//                     const planetId = homeworldURL.split("/").slice(-1)[0];
//                     const response = await fetch(homeworldURL);
//                     const data = await response.json();
//                     setHomeworld({ name: data.result.properties.name, id: planetId });
//                 }
//             };
//             fetchHomeworld();
//         }
//     }, [store.itemDetails]);

//     if (!store.itemDetails) {
//         return <p className="text-center my-5">Loading...</p>;
//     }

//     if (store.itemDetails === "NOT FOUND!") {
//         return <p className="text-center my-5">Not Found!</p>;
//     }

//     const item = store.itemDetails;
//     const excludedProperties = ["created", "edited", "url"];

//     return (
//         <div className="container my-5">
//             <div className="row mb-4">
//                 <div className="col-md-6">
//                     <img
//                         src="https://www.gammaracionero.es/wp-content/uploads/2016/09/placeholder-800x600.png"
//                         alt={item.properties.name}
//                         className="img-fluid rounded"
//                     />
//                 </div>
//                 <div className="col-md-6">
//                     <h2 className="mb-3">{item.properties.name}</h2>
//                     <p className="text-muted">
//                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent lorem lacus, malesuada interdum 
//                     pulvinar suscipit, fermentum vel mauris. Donec nulla dui, maximus nec ex non, mattis porttitor velit. 
//                     Nulla facilisi. Aenean rhoncus tempus nibh. Ut rutrum ante velit. Sed ac neque quis massa lacinia porta.
//                     Phasellus nec magna ante. Aenean massa mauris, convallis ut quam a, sagittis vehicula nibh. 
//                     Curabitur eget tellus placerat ligula varius euismod. Sed interdum erat felis, nec imperdiet ipsum malesuada a. 
//                     Maecenas hendrerit dui id quam efficitur sodales. In arcu eros, venenatis eget facilisis vitae, accumsan aliquam ligu
//                     Cras convallis eges tas mauris eu tincidunt. Curabitur egestas egestas tincidunt.
//                     Fusce pharetra elementum libero, vel tempus urna aliquet elementum.
//                     </p>
//                     <button className="btn btn-primary mt-2" onClick={() => navigate(-1)}>
//                         ⬅️ Back
//                     </button>
//                 </div>
//             </div>

//             <hr />

//             <div className="row">
//                 {Object.entries(item.properties)
//                     .filter(([key]) => !excludedProperties.includes(key)) // Excluir propiedades no deseadas
//                     .map(([key, value], index) => (
//                         <div key={index} className="col-md-3 mb-3">
//                             <strong className="text-uppercase">{key.replace("_", " ")}:</strong>
//                             <br />
//                             {key === "homeworld" && homeworld ? (
//                                 <a
//                                     href="#"
//                                     onClick={(e) => {
//                                         e.preventDefault();
//                                         navigate(`/details/planets/${homeworld.id}`);
//                                     }}
//                                 >
//                                     {homeworld.name}
//                                 </a>
//                             ) : Array.isArray(value) ? (
//                                 value.map((link, idx) => (
//                                     <div key={idx}>
//                                         <a
//                                             href="#"
//                                             onClick={(e) => {
//                                                 e.preventDefault();
//                                                 navigate(`/details/${link.url.split("/")[4]}/${link.url.split("/")[5]}`);
//                                             }}
//                                         >
//                                             {link.name}
//                                         </a>
//                                     </div>
//                                 ))
//                             ) : typeof value === "object" && value?.url ? (
//                                 <a
//                                     href="#"
//                                     onClick={(e) => {
//                                         e.preventDefault();
//                                         navigate(`/details/${value.url.split("/")[4]}/${value.url.split("/")[5]}`);
//                                     }}
//                                 >
//                                     {value.name}
//                                 </a>
//                             ) : (
//                                 <span>{value}</span>
//                             )}
//                         </div>
//                     ))}
//             </div>
//         </div>
//     );
// };

// export default Details;