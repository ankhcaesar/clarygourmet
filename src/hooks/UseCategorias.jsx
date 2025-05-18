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