import db from "../db/db";

export function useCliente() {
    const guardarCliente = async (form) => {
        const {
            nombre, whatsapp, nro_alternativo, departamento,
            distrito, calle, numero_calle, piso, depto
        } = form;

        const clientes = await db.clientes.toArray();
        let id_cli;
        if (clientes.length > 0) {
            id_cli = clientes[0].id_cli;
            await db.clientes.update(id_cli, {
                nombre, whatsapp, nro_alternativo, departamento,
                distrito, calle, numero_calle, piso, depto
            });
        } else {
            id_cli = crypto.randomUUID();
            await db.clientes.add({
                id_cli, nombre, whatsapp, nro_alternativo, departamento,
                distrito, calle, numero_calle, piso, depto
            });
        }

        return id_cli;
    };

    return { guardarCliente };
}