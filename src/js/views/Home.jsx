import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import ScrollRow from "../component/ScrollRow.jsx";

const Home = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.loadData();
    }, []);

    return (
        <div className="bg-secondary text-light">
            <h3 className="text-light pt-2">Characters</h3>
            <ScrollRow title="Characters" items={store.people} type="people" />
            <h3 className="text-light pt-3">Vehicles</h3>
            <ScrollRow title="Vehicles pt-2" items={store.vehicles} type="vehicles" />
            <h3 className="text-light pt-3">Planets</h3>
            <ScrollRow title="Planets" items={store.planets} type="planets" />
        </div>
    );
};

export default Home;

