import React, { createContext, useState } from "react";
import getState from "./flux";

export const Context = createContext(null);

const injectContext = (PassedComponent) => {
    const StoreWrapper = (props) => {
        const [state, setState] = useState({
            favorites: [],
            // otros estados
        });

        const actions = getState({ getStore: () => state, setStore: setState }).actions;

        return (
            <Context.Provider value={{ state, actions }}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };

    return StoreWrapper;
};

export default injectContext;
