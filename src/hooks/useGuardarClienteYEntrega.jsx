import { useContext, useState } from "react";
import db from "../db/db";
import { GlobalContext } from "../context/GlobalContext";

export function useGuardarClienteYEntrega() {
    const { ir } = useContext(GlobalContext);
    const [loading, setLoading] = useState(false);

    const guardar = async ({ cliente, entrega }) => {
        setLoading(true);
        try {
            const id_cli = await db.clientes.add(cliente);

            await db.entrega.add({
                fechayhora: new Date().toISOString(),
                delivery: entrega.envio_a_domicilio,
                mensaje: entrega.aclaraciones,
                id_cli: id_cli,
            });

            ir("resumen");
        } catch (error) {
            console.error("Error al guardar en IndexedDB:", error);
        } finally {
            setLoading(false); 
        }
    };

    return { guardar, loading };
}