
import { useEffect, useState } from "react";
import { supabase } from "../db/supabaseclient";
import { getPublicImage } from "../db/getPublicImage";
import db from "../db/db"

export const UseArticulosCarrito = () => {

    const [articulosCarrito, setArticulosCarrito] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarDatosCarrito = async () => {
            setLoading(true);

            try {
                const ventas = await db.ventas.toArray();

                const ids = ventas
                    .map((item) => item.id_arts)
                    .filter((id) => id !== undefined && id !== null);

                if (ids.length === 0) {
                    setArticulosCarrito([]);
                    setLoading(false);
                    return;
                }

                const { data: articulosDB, error } = await supabase
                    .from("articulos")
                    .select("id_arts, articulo, presentacion, imagen_articulo")
                    .in("id_arts", ids);

                if (error) {
                    console.error("Error al traer artículos desde Supabase:", error);
                    setLoading(false);
                    return;
                }

                const resultado = await Promise.all(
                    ventas.map(async (venta) => {
                        const art = articulosDB.find((a) => a.id_arts === venta.id_arts);
                        const imagenUrl = await getPublicImage("arts", art?.imagen_articulo);

                        return {
                            id_art: venta.id_arts,
                            articulo: art?.articulo || "Sin nombre",
                            presentacion: art?.presentacion || "",
                            imagen: imagenUrl || "",
                            valor_unit: venta.valor_unit,
                            cantidad: venta.cant,
                            valor_total: venta.valor_unit * venta.cant,
                        };
                    })
                );

                setArticulosCarrito(resultado);
            } catch (err) {
                console.error("Error general al cargar el carrito:", err);
            } finally {
                setLoading(false);
            }
        };

        cargarDatosCarrito();
    }, []);

    return { articulosCarrito, loading };
};
