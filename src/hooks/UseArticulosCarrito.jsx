import { useEffect, useState, useContext } from "react"; // Se importa useContext
import { GlobalContext } from "../context/GlobalContext"; // Se importa GlobalContext
import { supabase } from "../db/supabaseclient";
import { getPublicImage } from "../db/getPublicImage";
import db from "../db/db";

export const UseArticulosCarrito = () => {
    // Se obtiene itemsCarrito del contexto global.
    // Esto permitirá que el hook reaccione a los cambios en el carrito.
    const { itemsCarrito } = useContext(GlobalContext);
    
    const [articulosCarrito, setArticulosCarrito] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarDatosCarrito = async () => {
            setLoading(true);
            console.log("Cargando datos del carrito debido a cambio en itemsCarrito:", itemsCarrito);

            try {
                // Se obtienen los artículos actuales de la tabla 'ventas' en Dexie.
                const ventas = await db.ventas.toArray();

                // Se extraen los IDs de los artículos.
                const ids = ventas
                    .map((item) => item.id_arts)
                    .filter((id) => id !== undefined && id !== null);

                // Si no hay IDs, significa que el carrito está vacío.
                if (ids.length === 0) {
                    setArticulosCarrito([]); // Se establece el carrito como vacío.
                    setLoading(false);
                    return; 
                }

                const { data: articulosDB, error } = await supabase
                    .from("articulos")
                    .select("id_arts, articulo, presentacion, imagen_articulo")
                    .in("id_arts", ids);

                if (error) {
                    console.error("Error al traer artículos desde Supabase:", error);
                    setArticulosCarrito([]); // En caso de error, se vacía el carrito para evitar mostrar datos incorrectos.
                    setLoading(false);
                    return;
                }

                const resultado = await Promise.all(
                    ventas.map(async (venta) => {
                        const art = articulosDB.find((a) => a.id_arts === venta.id_arts);
                        // Si el artículo no se encuentra en Supabase (podría haber sido eliminado),
                        // se usa un nombre por defecto.
                        const articuloNombre = art?.articulo || "Artículo no encontrado";
                        const presentacionArt = art?.presentacion || "";
                        const imagenUrl = await getPublicImage("arts", art?.imagen_articulo);

                        return {
                            id_art: venta.id_arts,
                            articulo: articuloNombre,
                            presentacion: presentacionArt,
                            imagen: imagenUrl,
                            valor_unit: venta.valor_unit, 
                            cantidad: venta.cant,
                            valor_total: venta.valor_unit * venta.cant,
                        };
                    })
                );

                setArticulosCarrito(resultado);
            } catch (err) {
                console.error("Error general al cargar el carrito:", err);
                setArticulosCarrito([]);
            } finally {
                setLoading(false);
            }
        };

        cargarDatosCarrito();

    }, [itemsCarrito]); 

    return { articulosCarrito, loading };
};
