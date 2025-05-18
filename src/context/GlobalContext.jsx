import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext();

function GlobalContextProvider({ children }) {

    // Variables
    const navigate = useNavigate();
    const [botonMenu, setBotonMenu] = useState("principal");
    

// Traer las categorias





    //funcion ir
    function ir(destino, opciones ={}) {
        const to = destino.trim().toLowerCase();
    
        if (to === "salir") {
            console.log("funcion cerrar sesion aun no creada");
            return;
        }
    
        const rutas = {
            categorias: "/Categorias",
            filtrado: "/Filtrado",
            fin: "/FinCompra",
            inicio: "/",
            carrito: "/Carrito",
            carritocerrado: "/CarritoCerrado"
        };
    
        if (rutas[to]) {
            navigate(rutas[to], opciones);
        } else {
            console.warn(`Ruta no reconocida: "${to}"`);
        }
    }
    //onClick={()=>ir("salir")} 
    // fin funcion ir 


    return (

        <GlobalContext.Provider value={
            {
                ir,
                botonMenu, setBotonMenu,

            }
        }> {children} </GlobalContext.Provider>
    )
}
export default GlobalContextProvider