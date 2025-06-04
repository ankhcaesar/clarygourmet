import { useState, useEffect, useContext } from "react";
import db from "../db/db"
import { UseArticulosCarrito } from "./UseArticulosCarrito";
import { GlobalContext } from "../context/GlobalContext";

export const useResumenCompra = () => {
    const [cliente, setCliente] = useState(null);
    const [entrega, setEntrega] = useState(null);
    const [venta, setVenta] = useState(null);
    const [loadingDatos, setLoadingDatos] = useState(true);

    const { articulosCarrito, loading: loadingCarrito } = UseArticulosCarrito();
    const { setLoader } = useContext(GlobalContext);

    useEffect(() => {
        const cargarDatos = async () => {
            setLoader({ show: true });
            try {
                const clienteDB = await db.clientes.toCollection().first();
                const entregaDB = await db.entrega.toCollection().first();
                const ventaDB = await db.ventas.toCollection().first();
                setCliente(clienteDB);
                setEntrega(entregaDB);
                setVenta(ventaDB);
            } catch (error) {
                console.error("Error cargando datos:", error);
            } finally {
                setLoadingDatos(false);
                setLoader({ show: false });
            }
        };

        cargarDatos();
    }, []);

    const loading = loadingDatos || loadingCarrito;

    return { cliente, entrega, venta, articulosCarrito, loading };
};
