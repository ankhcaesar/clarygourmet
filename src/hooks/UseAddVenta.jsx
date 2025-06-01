import { useContext, useRef } from "react";
import db from "../db/db";
import { GlobalContext } from "../context/GlobalContext";

export function UseAddVenta() {
    const { setItemsCarrito } = useContext(GlobalContext);

    const ventaIdRef = useRef(null);

    const obtenerVentaId = async () => {
        if (!ventaIdRef.current) {
            const fecha = new Date();
            const timestamp = fecha.getTime();
            ventaIdRef.current = timestamp;
        }
        return ventaIdRef.current;
    };

    const agregarProductoAVenta = async ({ id_arts, cant, valor_unit }) => {
        const id_vta = await obtenerVentaId();
        const fecha_hora = new Date().toISOString();

        const productoExistente = await db.ventas.get({ id_arts });

        if (productoExistente) {
            const nuevaCantidad = productoExistente.cant + cant;
            await db.ventas.update(productoExistente.id_vta, {
                cant: nuevaCantidad,
                fecha_hora
            });
        } else {
            await db.ventas.add({
                id_vta,
                fecha_hora,
                id_arts,
                cant,
                valor_unit
            });
        }

        await calcularItems();
    };

    const actualizarCantidadProducto = async (id_arts, nuevaCantidad) => {
        const productoExistente = await db.ventas.get({ id_arts });
        if (productoExistente) {

            if (nuevaCantidad === 0) {
                // Si llega a cero, se borra
                await db.ventas.delete(productoExistente.id_vta);
            } else {
                await db.ventas.update(productoExistente.id_vta, {
                    cant: nuevaCantidad
                });
            }
            await calcularItems();
        }
    };



    const calcularItems = async () => {
        const productos = await db.ventas.toArray();

        const totalCantidades = productos.reduce((acc, item) => acc + item.cant, 0);

        setItemsCarrito({ totalCantidades });
    };

    return { agregarProductoAVenta, actualizarCantidadProducto, calcularItems };
}