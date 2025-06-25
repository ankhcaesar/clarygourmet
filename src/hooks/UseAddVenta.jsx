import { useContext } from "react";
import db from "../db/db";
import { GlobalContext } from "../context/GlobalContext";

export function UseAddVenta() {
    const { itemsCarrito, setItemsCarrito } = useContext(GlobalContext);

    // Verifica si ya existe id_vta, si no lo crea
   const obtenerVentaId = async () => {
    // ✅ 1. Ya tenemos id_vta en el contexto
    if (itemsCarrito.id_vta) return itemsCarrito.id_vta;

    // ✅ 2. Buscar productos en el carrito
    const carrito = await db.carrito.toArray();

    if (carrito.length > 0) {
        const id_vta = carrito[0].id_vta;
        const venta = await db.ventas.get(id_vta);

        if (venta) {
            // Venta ya existe → usarla
            setItemsCarrito(prev => ({ ...prev, id_vta }));
            return id_vta;
        } else {
            // Venta no existe → recrear entrada en ventas
            await db.ventas.add({
                id_vta,
                fecha_hora: new Date().toISOString(),
                total_venta: 0,
                entrega: null,
                id_entrega: null
            });

            setItemsCarrito(prev => ({ ...prev, id_vta }));
            return id_vta;
        }
    }

    // ✅ 3. No hay productos ni id → crear nueva venta
    const nuevaVentaId = await db.ventas.add({
        fecha_hora: new Date().toISOString(),
        total_venta: 0,
        entrega: null,
        id_entrega: null
    });

    setItemsCarrito(prev => ({ ...prev, id_vta: nuevaVentaId }));
    return nuevaVentaId;
};



    // Agrega o actualiza producto en carrito
    const agregarProductoAVenta = async ({ id_arts, cant, valor_venta }) => {
        const id_vta = await obtenerVentaId();

        const productoExistente = await db.carrito
            .where({ id_vta, id_arts })
            .first();

        if (productoExistente) {
            const nuevaCantidad = productoExistente.cant + cant;
            const nuevoValorXCant = nuevaCantidad * valor_venta;

            await db.carrito.update(productoExistente.id_carrito, {
                cant: nuevaCantidad,
                valor_x_cant: nuevoValorXCant
            });
        } else {
            await db.carrito.add({
                id_vta,
                id_arts,
                cant,
                valor_venta,
                valor_x_cant: cant * valor_venta
            });
        }

        await calcularTotales(id_vta);
    };

    // Actualiza cantidad de producto
    const actualizarCantidadProducto = async (id_arts, nuevaCantidad) => {
        const id_vta = await obtenerVentaId();

        const productoExistente = await db.carrito
            .where({ id_vta, id_arts })
            .first();

        if (productoExistente) {
            if (nuevaCantidad === 0) {
                await db.carrito.delete(productoExistente.id_carrito);
            } else {
                await db.carrito.update(productoExistente.id_carrito, {
                    cant: nuevaCantidad,
                    valor_x_cant: nuevaCantidad * productoExistente.valor_venta
                });
            }

            await calcularTotales(id_vta);
        }
    };

    // Recalcula totales y actualiza el context
    const calcularTotales = async (id_vta) => {

        if (!id_vta || typeof id_vta !== "number") {
            console.warn("calcularTotales: ID de venta inválido:", id_vta);
            return;
        }


        const productos = await db.carrito.where({ id_vta }).toArray();

        const totalItems = productos.reduce((acc, item) => acc + item.cant, 0);
        const totalVenta = productos.reduce((acc, item) => acc + item.valor_x_cant, 0);

        setItemsCarrito(prev => ({
            ...prev,
            totalItems
        }));

        await db.ventas.update(id_vta, { total_venta: totalVenta });
    };

    return {
        agregarProductoAVenta,
        actualizarCantidadProducto,
        calcularTotales
    };
}
