import { createContext } from "react";
import { useNavigate } from "react-router-dom";


export const GlobalContext = createContext();

function GlobalContextProvider({ children }) {

    // Variables
    const navigate = useNavigate()


    //funcion ir
    function ir(destino) {
        const to = destino.trim().toLowerCase();

        if (to === "salir") {
            console.log("funcion cerrar sesion aun no creada");
            //cerrarSesion();
            return;
        }

        const rutas = {
            categorias: "/Categorias",
            filtrado: "/Filtrado",
            fin: "/FinCompra",
            inicio: "/Inicial",
            carrito: "/Carrito",
            carritocerrado: "/CarritoCerrado"
        };
        navigate(destino);
    };
    //onClick={()=>ir("salir")} 
    // fin funcion ir 


    return (

        <GlobalContext.Provider value={
            {
                ir
            }
        }> {children} </GlobalContext.Provider>
    )
}
export default GlobalContextProvider