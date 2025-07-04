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
}
