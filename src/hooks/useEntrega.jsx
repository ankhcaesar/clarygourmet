import db from "../db/db";

export function useEntrega() {
    const guardarEntrega = async (fecha_hora_entrega, aclaraciones) => {
        const id_entrega = crypto.randomUUID();
        await db.entrega.add({
            id_entrega,
            fechayhora: fecha_hora_entrega,
            mensaje: aclaraciones,
            estado: false
        });
        return id_entrega;
    };

    return { guardarEntrega };
}