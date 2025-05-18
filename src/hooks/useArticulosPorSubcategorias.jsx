import { useEffect, useState } from "react";
import { supabase } from "../db/supabaseclient";
import { getPublicImage } from "../db/getPublicImage";

export const useArticulosPorSubcategorias = (id_cats) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const obtenerDatos = async () => {
            setLoading(true);

            // 1. Traer subcategorías por categoría
            const { data: subcats, error: errorSub } = await supabase
                .from("sub_categorias")
                .select("id_subcats, sub_categorias")
                .eq("categoria", id_cats);

            if (errorSub) {
                console.error("Error al cargar subcategorías:", errorSub);
                setLoading(false);
                return;
            }

            // 2. Traer artículos para cada subcategoría + imagen pública
            const resultados = await Promise.all(
                subcats.map(async (sub) => {
                    const { data: articulos, error: errorArt } = await supabase
                        .from("articulos")
                        .select("*")
                        .eq("id_subcats", sub.id_subcats)
                        .eq("estado", true);

                    if (errorArt) {
                        console.error("Error al cargar artículos:", errorArt);
                    }

                    // Obtener imagen pública para cada artículo
                    const articulosConImagen = await Promise.all(
                        (articulos || []).map(async (art) => ({
                            ...art,
                            imagenUrl: await getPublicImage("arts", art.imagen_articulo)
                        }))
                    );

                    return {
                        ...sub,
                        articulos: articulosConImagen
                    };
                })
            );

            setData(resultados);
            setLoading(false);
        };

        if (id_cats) {
            obtenerDatos();
        }
    }, [id_cats]);

    return { data, loading };
};
