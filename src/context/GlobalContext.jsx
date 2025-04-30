import { createContext } from "react";


export const GlobalContext = createContext();

function GlobalContextProvider({ Children }) {

    return (

        <GlobalContext.Provider value={
            {

            }
        }> {Children} </GlobalContext.Provider>
    )
}
export default GlobalContextProvider