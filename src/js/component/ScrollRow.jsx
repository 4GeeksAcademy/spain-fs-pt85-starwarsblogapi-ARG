import React from "react";
import Card from "./Card.jsx";

const ScrollRow = ({ title, items, type }) => {
    return (
        <div className="scroll-row d-flex flex-nowrap overflow-auto" style={{ gap: "1rem", paddingBottom: "1rem" }}>
                {items.map((item) => (
                    <div key={`${type}-${item.id}`} className="card-container">
                        <Card key={item.uid} item={item} type={type} />
                    </div>
                ))}
        </div>
        
    );
};

export default ScrollRow;

// const ScrollRow = ({ items, type }) => {
//     console.log(`Renderizando ScrollRow con type: ${type}`);
    
//     if (!items || items.length === 0) {
//         return <p>No data available</p>;
//     }

//     return (
//         <div className="scroll-row d-flex flex-nowrap overflow-auto" style={{ gap: "1rem", paddingBottom: "1rem" }}>
//             {items.map((item) => (
//                 <div key={`${type}-${item.id}`} className="card-container">
//                     <Card item={item} type={type} />
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default ScrollRow;