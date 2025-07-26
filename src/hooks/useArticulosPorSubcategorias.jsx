import { useLiveQuery } from "dexie-react-hooks";
import db from "../db/db";

export const useArticulosPorSubcategorias = (id_cats) => {
    const data = useLiveQuery(async () => {
        if (!id_cats) return [];

        // 1. Obtener subcategorías locales por categoría
        const subcategorias = await db.sub_categorias
            .where("categoria")
            .equals(id_cats)
            .toArray();

        // 2. Por cada subcategoría, buscar sus artículos asociados
        const resultado = await Promise.all(
            subcategorias.map(async (sub) => {
                const articulos = await db.articulos
                    .where("id_subcats")
                    .equals(sub.id_subcats)
                    .and((a) => a.estado === true) // filtramos los activos
                    .toArray();

                const articulosConImagen = articulos.map((art) => ({
                    ...art,
                    imagenUrl: art.imagen_blob ?? null, // ya viene del sync
                }));

                return {
                    ...sub,
                    articulos: articulosConImagen,
                };
            })
        );

        return resultado;
    }, [id_cats]);

    return {
        data: data ?? [],
        loading: data === undefined,
        error: null,

    };
};


