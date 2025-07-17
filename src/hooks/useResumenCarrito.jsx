import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import db from "../db/db";
import { supabase } from "../db/supabaseclient";
import { getPublicImage } from "../db/getPublicImage"; // Asegúrate de tener esta función

export function useResumenCarrito() {
    const { itemsCarrito, setLoader, ir, limpiarCarrito } = useContext(GlobalContext);
    const [venta, setVenta] = useState(null);
    const [cliente, setCliente] = useState(null);
    const [entrega, setEntrega] = useState(null);
    const [articulosCarrito, setArticulosCarrito] = useState([]);

    const cargarDatos = async () => {
        const id_vta = itemsCarrito.id_vta;
        if (!id_vta) return;

        try {
            setLoader({ show: true });

            // Obtener venta, entrega y cliente
            const vta = await db.ventas.get(id_vta);
            const ent = vta?.id_entrega ? await db.entrega.get(vta.id_entrega) : null;
            const cli = vta?.id_cli ? await db.clientes.get(vta.id_cli) : null;

            setVenta(vta);
            setCliente(cli);
            setEntrega(ent);

            // Obtener artículos del carrito
            const carrito = await db.carrito.where({ id_vta }).toArray();
            
            // Si no hay artículos, terminar aquí
            if (carrito.length === 0) {
                setArticulosCarrito([]);
                return;
            }

            // Extraer IDs de artículos
            const ids = carrito.map(item => item.id_arts).filter(Boolean);
            
            // Obtener detalles de artículos desde Supabase
            const { data: articulosDB, error } = await supabase
                .from("articulos")
                .select("id_arts, articulo, presentacion, imagen_articulo")
                .in("id_arts", ids);

            if (error) throw error;

            // Combinar datos del carrito con detalles de artículos
            const articulosCombinados = await Promise.all(
                carrito.map(async (item) => {
                    const art = articulosDB.find(a => a.id_arts === item.id_arts);
                    const imagenUrl = art?.imagen_articulo 
                        ? await getPublicImage("arts", art.imagen_articulo) 
                        : null;

                    return {
                        ...item,
                        nombre: art?.articulo || "Artículo no encontrado",
                        presentacion: art?.presentacion || "",
                        imagenUrl
                    };
                })
            );

            setArticulosCarrito(articulosCombinados);

        } catch (error) {
            console.error("Error al cargar datos del carrito:", error);
        } finally {
            setLoader({ show: false });
        }
    };

    useEffect(() => {
        cargarDatos();
    }, [itemsCarrito.id_vta]);

    const finalizarCompra = async () => {
        setLoader({ show: true });

        try {
            const id_vta = itemsCarrito.id_vta;
            if (!id_vta) throw new Error("ID de venta no encontrado.");

            if (!venta || articulosCarrito.length === 0) {
                throw new Error("Faltan datos para finalizar la compra.");
            }

            // Subir cliente si existe
            if (cliente?.id_cli) {
                const { error: upsertError } = await supabase
                    .from("clientes")
                    .upsert(cliente, { onConflict: "id_cli" });
                if (upsertError) throw upsertError;
            }

            // Subir entrega si está disponible
            const id_entrega = entrega ? entrega.id_entrega || crypto.randomUUID() : null;

            if (entrega) {
                const { error: insertError } = await supabase.from("entrega").insert({
                    ...entrega,
                    id_entrega,
                    fechayhora: entrega?.fechayhora ? new Date(entrega.fechayhora).toISOString() : new Date().toISOString()
                });
                if (insertError) throw insertError;
            }

            // Subir venta
            const { error: ventaError } = await supabase.from("ventas").insert({
                id_vta,
                fecha_hora: venta.fecha_hora ? new Date(venta.fecha_hora).toISOString() : new Date().toISOString(),
                total_venta: venta.total_venta,
                id_cli: cliente?.id_cli || null,
                id_entrega
            });
            if (ventaError) throw ventaError;

            // Subir carrito
            const carritoSupabase = articulosCarrito.map(art => ({
                id_carrito: art.id_carrito,
                id_vta,
                id_arts: art.id_arts,
                cant: art.cant,
                valor_venta: art.valor_venta,
                valor_x_cant: art.valor_venta * art.cant
            }));

            const { error: carritoError } = await supabase.from("carrito").insert(carritoSupabase);
            if (carritoError) throw carritoError;
            
            // Limpiar todo
            await limpiarCarrito(id_vta, entrega);

            ir("carritocerrado");
            setTimeout(() => ir("inicio"), 30000);
        } catch (err) {
            console.warn("Error al finalizar compra:", err);
        } finally {
            setLoader({ show: false });
        }
    };

    return {
        cliente,
        entrega,
        venta,
        articulosCarrito,
        finalizarCompra,
        cargarDatos
    };
}