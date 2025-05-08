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

    const ProductosySubCategorias =
        [
            {
                id: "001",
                nombre: "Uno",
                imagen: "",
                descripcion: "bla, bla... bla.... bla",
                precioUnitario: 1500,
                productos: [
                    {
                        id: "01",
                        nombre: "Prod_Uno",
                        imagen: "",
                        descripcion: "bla, bla... bla.... bla",
                        precioUnitario: 1500
                    }
                ]

            },
            {
                id: "002",
                nombre: "Dos",
                imagen: "",
                descripcion: "bla, bla... blo.... bla",
                precioUnitario: 2600,
                productos: [{
                    id: "01",
                    nombre: "Prod_Uno",
                    imagen: "",
                    descripcion: "bla, bla... bla.... bla",
                    precioUnitario: 1500
                },
                {
                    id: "02",
                    nombre: "Prod_Dos",
                    imagen: "",
                    descripcion: "bla, bla... blo.... bla",
                    precioUnitario: 2600
                },
                {
                    id: "03",
                    nombre: "Prod_tres",
                    imagen: "",
                    descripcion: "bla, bla... bli.... bla",
                    precioUnitario: 3900
                },
                {
                    id: "04",
                    nombre: "Prod_cuatro",
                    imagen: "",
                    descripcion: "bla, bla... ua.... bla",
                    precioUnitario: 4200,
                }]
            },
            {
                id: "003",
                nombre: "tres",
                imagen: "",
                descripcion: "bla, bla... bli.... bla",
                precioUnitario: 3900,
                productos: [
                    {
                        id: "01",
                        nombre: "Prod_Uno",
                        imagen: "",
                        descripcion: "bla, bla... bla.... bla",
                        precioUnitario: 1500
                    },
                    {
                        id: "02",
                        nombre: "Prod_Dos",
                        imagen: "",
                        descripcion: "bla, bla... blo.... bla",
                        precioUnitario: 2600
                    }
                ]
            },
            {
                id: "004",
                nombre: "cuatro",
                imagen: "",
                descripcion: "bla, bla... ua.... bla",
                precioUnitario: 4200,
                productos: [{
                    id: "01",
                    nombre: "Prod_Uno",
                    imagen: "",
                    descripcion: "bla, bla... bla.... bla",
                    precioUnitario: 1500
                },
                {
                    id: "02",
                    nombre: "Prod_Dos",
                    imagen: "",
                    descripcion: "bla, bla... blo.... bla",
                    precioUnitario: 2600
                },
                {
                    id: "03",
                    nombre: "Prod_tres",
                    imagen: "",
                    descripcion: "bla, bla... bli.... bla",
                    precioUnitario: 3900
                },
                {
                    id: "04",
                    nombre: "Prod_cuatro",
                    imagen: "",
                    descripcion: "bla, bla... ua.... bla",
                    precioUnitario: 4200,
                }]
            }
        ]



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
                categoriasVenta,
                ProductosySubCategorias
            }
        }> {children} </GlobalContext.Provider>
    )
}
export default GlobalContextProvider