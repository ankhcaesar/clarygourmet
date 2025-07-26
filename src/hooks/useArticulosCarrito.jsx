
import { useLiveQuery } from "dexie-react-hooks";
import db from "../db/db";

export const useArticulosCarrito = (idVenta) => {
  const datos = useLiveQuery(async () => {
    if (!idVenta) return { articulos: [], totalVenta: 0 };

    // Obtener artículos del carrito relacionados a la venta
    const carrito = await db.carrito.where("id_vta").equals(idVenta).toArray();

    // Obtener venta asociada
    const venta = await db.ventas.get(idVenta);

    // Obtener la presentación desde la tabla `articulos` 
    const articulos = await Promise.all(
      carrito.map(async (item) => {
        const articuloDB = await db.articulos.get(item.id_arts);
        return {
          id_arts: item.id_arts,
          nombreArts: item.nombreArts,
          presentacion: articuloDB?.presentacion || "Sin datos",
          imagen: articuloDB?.imagen_blob || null,
          valor_unit: item.valor_venta,
          cantidad: item.cant,
          valor_total: item.valor_venta * item.cant,
        };
      })
    );

    return {
      articulos,
      totalVenta: venta?.total_venta || 0,
    };
  }, [idVenta]);

  const loading = datos === undefined;

  return {
    articulosCarrito: datos?.articulos || [],
    totalVenta: datos?.totalVenta || 0,
    loading,
  };
};



