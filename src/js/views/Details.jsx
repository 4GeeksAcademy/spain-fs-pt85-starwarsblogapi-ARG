import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Details = () => {
    const { type, id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);

    const fetchItemName = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.result.properties.name;
        } catch (error) {
            console.error("Error fetching item name:", error);
            return "Unknown";
        }
    };

    useEffect(() => {
        fetch(`https://www.swapi.tech/api/${type}/${id}`)
            .then((res) => res.json())
            .then(async (data) => {
                const properties = data.result.properties;
                const updatedProperties = {};

                for (const [key, value] of Object.entries(properties)) {
                    if (Array.isArray(value) && value.length > 0) {
                        updatedProperties[key] = await Promise.all(
                            value.map(async (url) => ({
                                name: await fetchItemName(url),
                                url,
                            }))
                        );
                    } else if (typeof value === "string" && value.startsWith("https://")) {
                        updatedProperties[key] = {
                            name: await fetchItemName(value),
                            url: value,
                        };
                    } else {
                        updatedProperties[key] = value;
                    }
                }

                setItem({ ...data.result, properties: updatedProperties });
            })
            .catch((err) => console.error(err));
    }, [type, id]);

    return (
        <div className="container my-5">
            {item ? (
                <>
                    <div className="row mb-4">
                        <div className="col-md-6">
                            <img src="https://via.placeholder.com/800x600" alt={item.properties.name} className="img-fluid" />
                        </div>
                        <div className="col-md-6">
                            <h2>{item.properties.name}</h2>
                            <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Felis mollis habitant tempor tristique placerat justo. Taciti donec aliquam montes quisque parturient purus sodales ipsum? Mattis ac ridiculus justo vivamus ad, natoque amet. Blandit rhoncus dictum volutpat blandit porttitor fringilla ante. Accumsan feugiat pulvinar suscipit quis tempor purus volutpat. Tortor mi sagittis phasellus nullam pellentesque nullam luctus! Mauris curabitur posuere purus libero adipiscing fames nisl diam vestibulum!

Maecenas arcu himenaeos quam ridiculus fames at finibus. Ultricies hac dapibus nec bibendum netus faucibus et. Metus accumsan tincidunt proin tellus vivamus pharetra sapien penatibus urna. Augue senectus diam ante conubia phasellus feugiat ex accumsan. Vitae sollicitudin vivamus facilisi eleifend ridiculus. Libero bibendum ligula semper; ante laoreet blandit. Ante mauris cras mauris aliquet varius sem venenatis. Risus eget vulputate efficitur ornare nullam nunc libero. Ut natoque lobortis aenean lobortis fusce quam donec.</p>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        {Object.entries(item.properties).map(([key, value], index) => (
                            <div key={index} className="col-md-2 mb-3">
                                <strong>{key.replace("_", " ").toUpperCase()}:</strong>
                                <br />
                                {Array.isArray(value) ? (
                                    value.map((link, idx) => (
                                        <div key={idx}>
                                            <a href="#" onClick={() => navigate(`/details/${link.url.split("/")[4]}/${link.url.split("/")[5]}`)}>
                                                {link.name}
                                            </a>
                                        </div>
                                    ))
                                ) : typeof value === "object" && value.url ? (
                                    <a href="#" onClick={() => navigate(`/details/${value.url.split("/")[4]}/${value.url.split("/")[5]}`)}>
                                        {value.name}
                                    </a>
                                ) : (
                                    <span>{value}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Details;