/*
/** gran cambio
import db from "../db/db";
import { useResumenCarrito } from "./useResumenCarrito";


export function useGuardarDatosEnvio() {

    const { cargarDatos } = useResumenCarrito();

    const guardar = async (form, id_vta) => {

        try {

            const {
                nombre, whatsapp, nro_alternativo, departamento,
                distrito, calle, numero_calle, piso, depto,
                envio_a_domicilio, aclaraciones, fecha_hora_entrega
            } = form;



            // Guardar cliente
            const clientes = await db.clientes.toArray();
            let id_cli;
            if (clientes.length > 0) {
                id_cli = clientes[0].id_cli;
                await db.clientes.update(clientes[0].id_cli, {
                    nombre, whatsapp, nro_alternativo, departamento,
                    distrito, calle, numero_calle, piso, depto,
                });
            } else {
                id_cli = crypto.randomUUID();
                await db.clientes.add({
                    id_cli, nombre, whatsapp, nro_alternativo, departamento,
                    distrito, calle, numero_calle, piso, depto,
                });
            }

            // Guardar mensaje de entrega
            const id_entrega = await db.entrega.add({
                id_entrega: crypto.randomUUID(),
                fechayhora: fecha_hora_entrega,
                mensaje: aclaraciones,
                estado: false
            });

            // Actualizar tabla ventas
            await db.ventas.update(id_vta, {
                entrega: envio_a_domicilio,
                id_entrega,
                id_cli
            });

            await cargarDatos();

        } catch (error) {

            console.error("Error en guardar datos de envío:", error);

        }
    };

    return { guardar };
*/

//varios hooks
// A .useCliente(): maneja solo lectura y escritura de clientes
//B. useEntrega(): guarda la entrega
//C. useActualizarVenta(): solo actualiza la venta con cliente y entrega
//D. useGuardarDatosEnvio() usando los anteriores

import { useCliente } from "./useCliente";
import { useEntrega } from "./useEntrega";
import { useActualizarVenta } from "./useActualizarVenta";
import { useResumenCarrito } from "./useResumenCarrito";

export function useGuardarDatosEnvio() {
    const { guardarCliente } = useCliente();
    const { guardarEntrega } = useEntrega();
    const { actualizarVenta } = useActualizarVenta();

    const guardar = async (form, id_vta) => {
        try {
            const id_cli = await guardarCliente(form);
            const id_entrega = await guardarEntrega(form.fecha_hora_entrega, form.aclaraciones);
            await actualizarVenta(id_vta, id_cli, id_entrega, form.envio_a_domicilio);
        } catch (error) {
            console.error("Error en guardar datos de envío:", error);
        }
    };

    return { guardar };
}