import React, { createContext, useState, useEffect, useRef } from "react";
import getState from "./flux";

export const Context = createContext(null);

const InjectContext = (PassedComponent) => {
    const StoreWrapper = (props) => {
        const [state, setState] = useState(getState({ getStore: () => state.store, getActions: () => state.actions, setStore: (update) => setState({ store: { ...state.store, ...update }, actions: state.actions }) }));

        return (
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };
    return StoreWrapper;
};

export default InjectContext;

// export const Context = createContext(null);

// const AppContextProvider = ({ children }) => {
//     const stateRef = useRef(
//         getState({
//             getStore: () => stateRef.current.store,
//             getActions: () => stateRef.current.actions,
//             setStore: (update) =>
//                 setState((prevState) => ({
//                     store: { ...prevState.store, ...update },
//                     actions: { ...prevState.actions },
//                 })),
//         })
//     );

//     const [state, setState] = useState(stateRef.current);

//     useEffect(() => {
//         const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

//         setState((prevState) => ({
//             ...prevState,
//             store: { ...prevState.store, favorites: savedFavorites }
//         }));

//         const { actions, store } = stateRef.current;
//         if (!store.people.length && !store.vehicles.length && !store.planets.length) {
//             actions.loadAllData();
//         }
//     }, []);

//     return <Context.Provider value={state}>{children}</Context.Provider>;
// };

// export default AppContextProvider;