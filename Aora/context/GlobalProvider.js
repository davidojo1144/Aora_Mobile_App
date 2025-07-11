import { createContext, useContext, useState, useEffect} from "react";

const GlobalContext = createContext()
export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({Children}) => {

    return (
        <GlobalContext.Provider
        value={{
            
        }}
        >
            {Children}
        </GlobalContext.Provider>
    )
}