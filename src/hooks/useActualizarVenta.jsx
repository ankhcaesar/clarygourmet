import db from "../db/db";

export function useActualizarVenta() {
    const actualizarVenta = async (id_vta, id_cli, id_entrega, envio_a_domicilio) => {
        await db.ventas.update(id_vta, {
            id_cli,
            id_entrega,
            entrega: envio_a_domicilio
        });
    };

    return { actualizarVenta };
}