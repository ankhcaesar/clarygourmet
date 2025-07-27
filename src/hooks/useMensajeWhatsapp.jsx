import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export function useMensajeWhatsapp({ venta, cliente, entrega, articulosCarrito }) {
    const { formatomoneda, formatoFecha, formatoHora } = useContext(GlobalContext);

    return () => {
        if (!venta || !articulosCarrito?.length) return "";

        let direccion = "";
        if (venta.entrega === true && cliente) {
            const partesDireccion = [];

            if (cliente.calle && cliente.numero_calle)
                partesDireccion.push(`${cliente.calle} ${cliente.numero_calle}`);
            if (cliente.piso || cliente.depto) {
                const pisoDepto = [cliente.piso, cliente.depto].filter(Boolean).join(" - ");
                if (pisoDepto) partesDireccion.push(`(${pisoDepto})`);
            }
            if (cliente.distrito) partesDireccion.push(cliente.distrito);
            if (cliente.departamento) partesDireccion.push(cliente.departamento);

            direccion = partesDireccion.join(", ");
        }

        let mensaje = "*NUEVO PEDIDO*\n\n";
        mensaje += `ID: ${venta.id_vta.toString().slice(-10)}\n`;
        mensaje += `Fecha: ${formatoFecha(venta.fecha_hora)}\n`;
        mensaje += `Hora: ${formatoHora(venta.fecha_hora)}\n`;
        mensaje += `- - - - - - - - - - - - - - - - - - -\n`;

        if (cliente) {
            mensaje += `Nombre: ${cliente.nombre || "No especificado"}\n`;
            if (cliente.whatsapp) mensaje += `Wp: +549 ${cliente.whatsapp}\n`;
            if (cliente.nro_alternativo) mensaje += `Tel. Alt: +549 ${cliente.nro_alternativo}\n`;
            mensaje += `- - - - - - - - - - - - - - - - - - -\n`;
        }

        articulosCarrito.forEach((item) => {
            mensaje += `${item.cant} x ${item.nombre}   ${formatomoneda(item.valor_x_cant)}\n`;
        });
        mensaje += `- - - - - - - - - - - - - - - - - - -\n`;

        const total = articulosCarrito.reduce((acc, art) => acc + art.valor_x_cant, 0);
        mensaje += ` TOTAL: *${formatomoneda(total, true)}*\n\n`;

        if (venta.entrega) {
            mensaje += `- - - - - - - - - - - - - - - - - - -\n`;
            mensaje += "*Informacion de la entrega*\n";
            mensaje += `Dirección: ${direccion}\n`;
            mensaje += `Fecha: ${formatoFecha(entrega?.fechayhora)}\n`;
            mensaje += `Hora: ${formatoHora(entrega?.fechayhora)}\n`;
            mensaje += `- - - - - - - - - - - - - - - - - - -\n\n`;
        }
        mensaje += " ¡Gracias por tu compra!\n";
        return encodeURIComponent(mensaje);
    };
}
