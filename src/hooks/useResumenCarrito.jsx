import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import db from "../db/db";
import { supabase } from "../db/supabaseclient";

export function useResumenCarrito() {
    const { itemsCarrito, setLoader, ir, limpiarCarrito } = useContext(GlobalContext);
    const [venta, setVenta] = useState(null);
    const [cliente, setCliente] = useState(null);
    const [entrega, setEntrega] = useState(null);
    const [articulosCarrito, setArticulosCarrito] = useState([]);


    // Cargar datos locales desde IndexedDB
    const cargarDatos = async () => {
        const id_vta = itemsCarrito.id_vta;
        if (!id_vta) return;

        const vta = await db.ventas.get(id_vta);
        const articulos = await db.carrito.where({ id_vta }).toArray();
        const ent = vta?.id_entrega ? await db.entrega.get(vta.id_entrega) : null;
        const cli = vta?.id_cli ? await db.clientes.get(vta.id_cli) : null;

        setVenta(vta);
        setCliente(cli);
        setEntrega(ent);
        setArticulosCarrito(articulos);
    };

    useEffect(() => {
        cargarDatos();
    }, [itemsCarrito.id_vta]);

    const finalizarCompra = async () => {
        setLoader({ show: true });

        try {

            const id_vta = itemsCarrito.id_vta;
            if (!id_vta) throw new Error("ID de venta no encontrado.");

            await cargarDatos();


            if (!venta || articulosCarrito.length === 0) {
                throw new Error("Faltan datos para finalizar la compra.");
            }

            // Subir cliente si existe
            const id_cli = cliente.id_cli

            const { data: existeCliente, error: errorCliente } = await supabase
                .from("clientes")
                .select("id_cli")
                .eq("id_cli", id_cli)
                .maybeSingle();

            if (cliente && cliente.id_cli) {
                const { error: upsertClienteError } = await supabase
                    .from("clientes")
                    .upsert(cliente, { onConflict: "id_cli" });
                if (upsertClienteError) throw upsertClienteError;
            }

            // Subir entrega si esta disponible
            const id_entrega = entrega ? entrega.id_entrega || crypto.randomUUID() : null;

            if (entrega) {
                const { error: insertEntregaError } = await supabase.from("entrega").insert({
                    ...entrega,
                    id_entrega,
                    fechayhora: entrega?.fechayhora ? new Date(entrega.fechayhora).toISOString() : new Date().toISOString()
                });
                if (insertEntregaError) throw insertEntregaError;
            }

            // Subir venta
            const { error: insertVentaError } = await supabase.from("ventas").insert({
                id_vta,
                fecha_hora: venta.fecha_hora ? new Date(venta.fecha_hora).toISOString() : new Date().toISOString(),
                total_venta: venta.total_venta,
                id_cli,
                id_entrega
            });
            if (insertVentaError) throw insertVentaError;

            // Subir carrito
            const carritoSupabase = articulosCarrito.map(art => ({
                id_carrito: art.id_carrito,
                id_vta,
                id_arts: art.id_arts,
                cant: art.cant,
                valor_venta: art.valor_venta,
                valor_x_cant: art.valor_x_cant
            }));

            const { error: insertCarritoError } = await supabase.from("carrito").insert(carritoSupabase);
            if (insertCarritoError) throw insertCarritoError;
            // Limpiar todo
            await limpiarCarrito(id_vta, entrega);

            setLoader({ show: false });
            ir("carritocerrado");
            setTimeout(() => ir("inicio"), 30000);
        } catch (err) {
            console.warn("Error al finalizar compra:", err);
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