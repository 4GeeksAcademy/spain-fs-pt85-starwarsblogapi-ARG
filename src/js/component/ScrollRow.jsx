import React from "react";
import Card from "./Card.jsx";

const ScrollRow = ({ items, type }) => {
    if (!items || items.length === 0) {
        return <p>No data available</p>;
    }

    return (
        <div
            className="scroll-row d-flex flex-nowrap overflow-auto"
            style={{ gap: "1rem", paddingBottom: "1rem" }}
        >
            {items.map((item, index) => (
                <div key={index} className="card-container">
                    <Card item={item} type={type} />
                </div>
            ))}
        </div>
    );
};

export default ScrollRow;