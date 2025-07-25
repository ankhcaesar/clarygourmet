//gran cambio
/*
import { useEffect, useState } from "react";
import { supabase } from "../db/supabaseclient";
import { getPublicImage } from "../db/getPublicImage";

export function useSubcategorias(id_cats) {
    const [subcategorias, setSubcategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id_cats) return;

        const fetchSubcategorias = async () => {
            setLoading(true);
            setError(null);

            try {
                const { data, error: supabaseError } = await supabase
                    .from("sub_categorias")
                    .select("*")
                    .eq("categoria", id_cats);

                if (supabaseError) {
                    setError(supabaseError);
                    setLoading(false);
                    return;
                }

                const subCategoriasConImagen = await Promise.all(
                    data.map(async (sCat) => ({
                        ...sCat,
                        imagenUrl: await getPublicImage("subcats", sCat.imagen_categoria),
                    }))
                );

                setSubcategorias(subCategoriasConImagen);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSubcategorias();
    }, [id_cats]);

    return { subcategorias, loading, error };
}
*/

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
