import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext();

function GlobalContextProvider({ children }) {

    // Variables
    const navigate = useNavigate();
    const [botonMenu, setBotonMenu] = useState("principal");

    const [itemsCarrito, setItemsCarrito] = useState({
        totalItems: 0
    });





    //funcion ir
    function ir(destino, opciones = {}) {
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

    //AddCarrito
    const [addCarrito, setAddCarrito] = useState({ show: false, data: [] });
    const limpiarAddCarrito = () => {
        setAddCarrito({
            show: false,
            data: []
        })
    }
    // fin AddCarrito


    // Loader
    const [loader, setLoader] = useState({ show: false });
    // Fin Loader


    // funcion formato moneda 
    function formatomoneda(valor) {

        return new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
        }).format(valor);
    };
    // Fin funcion formato moneda

    return (

        <GlobalContext.Provider value={
            {
                ir,
                botonMenu, setBotonMenu,

                loader, setLoader,

                addCarrito, setAddCarrito,
                limpiarAddCarrito,
                itemsCarrito, setItemsCarrito,
                formatomoneda

            }
        }> {children} </GlobalContext.Provider>
    )
}
export default GlobalContextProvider