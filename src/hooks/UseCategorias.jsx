
/** gran cambio
import { useEffect, useState } from "react";
import { supabase } from "../db/supabaseclient";
import { getPublicImage } from "../db/getPublicImage";

export function useCategorias() {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategorias = async () => {

        
            
            setLoading(true);
            const { data, error } = await supabase
                .from("categorias")
                .select("*");

            if (error) {
                setError(error);
                setLoading(false);
                return;
            }

            const categoriasConImagen = await Promise.all(
                data.map(async (cat) => ({
                    ...cat,
                    imagenUrl: await getPublicImage("cats", cat.imagen_categoria)
                }))
            );

            setCategorias(categoriasConImagen);
            setLoading(false);
        };

        fetchCategorias();
    }, []);

    return { categorias, loading, error };
}
*/
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

    // useLiveQuery ya maneja loading internamente devolviendo undefined hasta que carga
    return {
        categorias: categorias ?? [],
        loading: categorias === undefined,
        error: null, // ya no manejamos error local, lo maneja el sync central
    };
}
