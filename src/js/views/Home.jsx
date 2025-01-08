import React, { useState, useEffect } from "react";
import ScrollRow from "../component/ScrollRow.jsx";

const Home = () => {
    const [people, setPeople] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async (endpoint, setter) => {
        try {
            const res = await fetch(`https://www.swapi.tech/api/${endpoint}`);
            const data = await res.json();
            const results = data.results;

            // Obtener detalles para cada item
            const details = await Promise.all(
                results.map(async (item) => {
                    const itemRes = await fetch(item.url);
                    const itemData = await itemRes.json();
                    return itemData.result.properties;
                })
            );

            setter(details);
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error);
        }
    };

    useEffect(() => {
        const loadAllData = async () => {
            setLoading(true);
            await Promise.all([
                fetchData("people", setPeople),
                fetchData("vehicles", setVehicles),
                fetchData("planets", setPlanets),
            ]);
            setLoading(false);
        };

        loadAllData();
    }, []);

    return (
        <div className="container my-5">
            {loading ? (
                <p>Loading data...</p>
            ) : (
                <>
                    <h2>Characters</h2>
                    <ScrollRow items={people} type="people" />

                    <h2 className="mt-4">Vehicles</h2>
                    <ScrollRow items={vehicles} type="vehicles" />

                    <h2 className="mt-4">Planets</h2>
                    <ScrollRow items={planets} type="planets" />
                </>
            )}
        </div>
    );
};

export default Home;
