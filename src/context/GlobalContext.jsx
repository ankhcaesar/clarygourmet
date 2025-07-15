import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import db from "../db/db";
export const GlobalContext = createContext();

function GlobalContextProvider({ children }) {

    // Variables
    const navigate = useNavigate();
    const [botonMenu, setBotonMenu] = useState("principal");
    const [cabecera, setCabecera] = useState({"titulo": "Clary Gourmet", "origen": "inicio"});

    const [itemsCarrito, setItemsCarrito] = useState({
        totalItems: 0,
        id_vta: null
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
            carritocerrado: "/CarritoCerrado",
            resumen: "/RsmCompra"

        };

        if (rutas[to]) {
            navigate(rutas[to], opciones);
        } else {
            console.warn(`Ruta no reconocida: "${to}"`);
        }
    }
    //onClick={()=>ir("salir")} 
    // fin funcion ir 

    //limpiar Carrito
    async function limpiarCarrito(id_vta, entrega) {
        try {
            await db.carrito.where({ id_vta }).delete();
            await db.ventas.delete(id_vta);
            if (entrega?.id_entrega) {
                await db.entrega.delete(entrega.id_entrega);
            }
            setItemsCarrito({ id_vta: null, totalItems: 0 });
        } catch (error) {
            console.warn("Error al limpiar carrito:", error);
        }
    }
    //Fin limpiar Carrito

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
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(valor);
    };
    // Fin funcion formato moneda

    return (

        <GlobalContext.Provider value={
            {
                ir,
                botonMenu, setBotonMenu,
                cabecera, setCabecera,

                loader, setLoader,

                addCarrito, setAddCarrito,
                limpiarAddCarrito,
                itemsCarrito, setItemsCarrito,
                formatomoneda,
                limpiarCarrito

            }
        }> {children} </GlobalContext.Provider>
    )
}
export default GlobalContextProvider