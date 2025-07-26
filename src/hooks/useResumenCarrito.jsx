import { useLiveQuery } from "dexie-react-hooks";
import db from "../db/db";

export function useArticulosCarrito(id_vta) {
    return useLiveQuery(async () => {
        if (!id_vta) return [];

        const carrito = await db.carrito.where({ id_vta }).toArray();

        return carrito.map((item) => ({
            ...item,
            nombre: item.nombreArts || "Artículo",
            imagenUrl: item.imagenUrl || null,
            valor_x_cant: item.valor_venta * item.cant,
        }));
    }, [id_vta]);
}

import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { supabase } from "../db/supabaseclient";
import { useVentaActual } from "./useVentaActual";
//import { useArticulosCarrito } from "./useArticulosCarrito"; esta dentro de este hook
import { useMensajeWhatsapp } from "./useMensajeWhatsapp";


export function useResumenCarrito() {
    const { itemsCarrito, setLoader, ir, limpiarCarrito } = useContext(GlobalContext);
    const id_vta = itemsCarrito.id_vta;

    const { venta, cliente, entrega } = useVentaActual(id_vta);
    const articulosCarrito = useArticulosCarrito(id_vta);
    const generarMensajeWhatsapp = useMensajeWhatsapp({ venta, cliente, entrega, articulosCarrito });

    const enviarWhatsApp = () => {
        const mensaje = generarMensajeWhatsapp();
        if (!mensaje) return;
        const telefonoEmpresa = "2612441084";
        const url = `https://wa.me/54${telefonoEmpresa}?text=${mensaje}`;
        window.open(url, "_blank");
    };

    const finalizarCompra = async () => {
        setLoader({ show: true });

        try {
            if (!venta || !articulosCarrito?.length) throw new Error("Faltan datos para finalizar.");


            ir("carritocerrado");
            setTimeout(() => enviarWhatsApp(), 1700);

            if (cliente?.id_cli) {
                const { error } = await supabase.from("clientes").upsert(cliente, { onConflict: "id_cli" });
                if (error) throw error;
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


            const { error: ventaError } = await supabase.from("ventas").insert({
                id_vta: venta.id_vta,
                fecha_hora: new Date(venta.fecha_hora || new Date()).toISOString(),
                total_venta: venta.total_venta,
                id_cli: cliente?.id_cli || null,
                id_entrega,
            });
            if (ventaError) throw ventaError;

            const carritoSupabase = articulosCarrito.map((art) => ({
                id_carrito: art.id_carrito,
                id_vta: venta.id_vta,
                id_arts: art.id_arts,
                cant: art.cant,
                valor_venta: art.valor_venta,
                valor_x_cant: art.valor_venta * art.cant,
            }));

            const { error: carritoError } = await supabase.from("carrito").insert(carritoSupabase);
            if (carritoError) throw carritoError;

            await limpiarCarrito(venta.id_vta, entrega);
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
        enviarWhatsApp,
    };
}

