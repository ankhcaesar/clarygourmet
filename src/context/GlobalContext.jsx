import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";


export const GlobalContext = createContext();

function GlobalContextProvider({ children }) {

    // Variables
    const navigate = useNavigate();
    const [botonMenu, setBotonMenu] = useState("principal");
    const categoriasVenta =
        [
            {
                nombre: "Congelados",
                color: "0, 0, 255",
                img: "",
                orden: 1
            },
            {
                nombre: "Viandas diarias",
                color: "255, 255, 0",
                img: "",
                orden: 2
            },
            {
                nombre: "Rotiseria",
                color: "255,165,0",
                img: "",
                orden: 3
            },
            {
                nombre: "Promociones",
                color: "230,205,130",
                img: "",
                orden: 4
            },
            {
                nombre: "Otros",
                color: "30,205,130",
                img: "",
                orden: 5
            }
            
        ];

    //funcion ir
    function ir(destino) {
        const to = destino.trim().toLowerCase();

        if (to === "salir") {
            console.log("funcion cerrar sesion aun no creada");
            //cerrarSesion();
            return;
        }

        //esta funcion esta mal
        const rutas = {
            categorias: "/Categorias",
            filtrado: "/Filtrado",
            fin: "/FinCompra",
            inicio: " ",
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
                ir,
                botonMenu, setBotonMenu,
                categoriasVenta
            }
        }> {children} </GlobalContext.Provider>
    )
}
export default GlobalContextProvider