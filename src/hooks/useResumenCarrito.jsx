//gran cambio
/*
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import db from "../db/db";
import { supabase } from "../db/supabaseclient";
import { getPublicImage } from "../db/getPublicImage"; // Asegúrate de tener esta función

export function useResumenCarrito() {
    const { itemsCarrito, setLoader, ir, limpiarCarrito, formatomoneda, formatoFecha, formatoHora } = useContext(GlobalContext);

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



    const generarMensajeWhatsApp = () => {
        if (!venta || !articulosCarrito.length) return "";

        // Construir la dirección si hay entrega
        let direccion = "";
        if (venta.entrega === true && cliente) {
            const partesDireccion = [];
            
            if (cliente.calle && cliente.numero_calle) {
                partesDireccion.push(`${cliente.calle} ${cliente.numero_calle}`);
            }
            
            if (cliente.piso || cliente.depto) {
                const pisoDepto = [cliente.piso, cliente.depto]
                    .filter(Boolean)
                    .join(" - ");
                if (pisoDepto) partesDireccion.push(`(${pisoDepto})`);
            }
            
            if (cliente.distrito) partesDireccion.push(cliente.distrito);
            if (cliente.departamento) partesDireccion.push(cliente.departamento);
            
            direccion = partesDireccion.join(", ");
        }

        // Encabezado
        let mensaje = "*NUEVO PEDIDO*\n\n";

        // Datos de la venta
        mensaje += `ID: ${venta.id_vta.toString().slice(-10)}\n`;
        mensaje += `Fecha: ${formatoFecha(venta.fecha_hora)}\n`;
        mensaje += `Hora: ${formatoHora(venta.fecha_hora)}\n`;
        mensaje += `----------------------------\n`

        // Datos del cliente si existe
        if (cliente) {
            mensaje += `Nombre: ${cliente.nombre || 'No especificado'}\n`;
            if (cliente.whatsapp) mensaje += `WhatsApp: +549(261)${cliente.whatsapp}\n`;
            if (cliente.nro_alternativo) mensaje += `Tel. Alt: +549(261)${cliente.nro_alternativo}\n`;
            mensaje += ` ----------------------------\n`;
        }

        // Artículos
        
        articulosCarrito.forEach(item => {
            mensaje += `${item.cant} x ${item.nombre}   ${formatomoneda(item.valor_x_cant)}\n`;
        });
        mensaje += `----------------------------\n`;


        // Total
        const total = articulosCarrito.reduce((acc, art) => acc + art.valor_x_cant, 0);
        mensaje += ` TOTAL: *${formatomoneda(total, true)}*\n`;

        // Datos de entrega si existen
        if (venta.entrega) {
            mensaje += `----------------------------\n`;
            mensaje += '*Informacion de la entrega*\n';
            mensaje += `Dirección: ${direccion}\n`;
            mensaje += `Fecha: ${formatoFecha(entrega.fechayhora)}\n`;
            mensaje += `Hora: ${formatoHora(entrega.fechayhora)}\n`;
            mensaje += `----------------------------\n`;
            mensaje += ' ¡Gracias por su compra!\n'
        }

        return encodeURIComponent(mensaje);
    };

    const enviarWhatsApp = () => {
        const mensaje = generarMensajeWhatsApp();
        if (!mensaje) return;

        const telefonoEmpresa = "2612441084";
        const url = `https://wa.me/54${telefonoEmpresa}?text=${mensaje}`;

        // Abrir en nueva pestaña
        window.open(url, "_blank");
    };




    const finalizarCompra = async () => {
        setLoader({ show: true });

        try {
            const id_vta = itemsCarrito.id_vta;
            if (!id_vta) throw new Error("ID de venta no encontrado.");

            if (!venta || articulosCarrito.length === 0) {
                throw new Error("Faltan datos para finalizar la compra.");
            }

            
            ir("carritocerrado");
            setTimeout(() => enviarWhatsApp(), 1700);
            

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
        cargarDatos,
        enviarWhatsApp
    };
}
*/
//para este hay que generar los hooks separados:
//Obtiene la venta, cliente y entrega desde IndexedDB (Dexie) mediante useLiveQuery.
// hooks/useVentaActual.jsx


//Retorna todos los artículos del carrito con valor_x_cant calculado.
// hooks/useArticulosCarrito.jsx - este lo deje aca adentro hasta poder verificar

//Genera el texto del mensaje a partir de venta, cliente, entrega, y articulos.
// hooks/useMensajeWhatsapp
// Hook principal que une todo, exporta los métodos finalizarCompra y enviarWhatsApp.
// hooks/useResumenCarrito.ts

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

