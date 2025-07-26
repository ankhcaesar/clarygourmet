
import { useLiveQuery } from "dexie-react-hooks";
import db from "../db/db";

export function useCategorias() {
    const categorias = useLiveQuery(async () => {
        const cats = await db.categorias.toArray();
        return cats.map((cat) => ({
            ...cat,
            imagenUrl: cat.imagen_blob || null, // ya viene del sync
        }));
    }, []);

    return {
        categorias: categorias ?? [],
        loading: categorias === undefined,
        error: null, // ya no manejamos error local, lo maneja el sync central
    };
}
