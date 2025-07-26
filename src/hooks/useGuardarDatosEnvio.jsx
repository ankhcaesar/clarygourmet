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