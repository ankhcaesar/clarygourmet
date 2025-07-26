import { useLiveQuery } from "dexie-react-hooks";
import db from "../db/db";

export function useSubCategorias() {
    const subcategorias = useLiveQuery(async () => {
        const subCats = await db.sub_categorias.toArray();
        return subCats.map((subCat) => ({
            ...subCat,
            imagenUrl: subCat.imagen_blob || null,
        }));
    }, []);

    return {
        subcategorias: subcategorias ?? [],
        loading: subcategorias === undefined,
        error: null,
    };
}
