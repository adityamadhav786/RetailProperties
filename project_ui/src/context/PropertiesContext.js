import React, { createContext, useState } from "react";

const PropertiesContext = createContext([{}, () => { }]);

const PropertiesContextProvider = (props) => {
    const [properties, setProperties] = useState([]);
    const [propData, setPropData] = useState([]);
    const [isGridView, setIsGridView] = useState(true)

    return (
        <PropertiesContext.Provider value={{ properties, setProperties, propData, setPropData, isGridView, setIsGridView}}>
            {props.children}
        </PropertiesContext.Provider>
    )
}

export { PropertiesContext, PropertiesContextProvider }