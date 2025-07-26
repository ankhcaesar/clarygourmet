import { useState, useEffect } from "react";
import db from "./db";
import { getPublicImage } from "./getPublicImage";
import { supabase } from "./supabaseclient";

export const useSyncFromSupabase = (autoSync = false) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const carpetasStorage = {
        articulos: "arts",
        categorias: "cats",
        sub_categorias: "subcats"
    };
    const camposImagen = {
        articulos: "imagen_articulo",
        categorias: "imagen_categoria",
        sub_categorias: "imagen_subcategoria",
    };

    const procesarRegistro = async (tabla, registro) => {
        const campoImagen = camposImagen[tabla];
        const registroProcesado = { ...registro };

        if (campoImagen && registro[campoImagen]) {
            registroProcesado.imagen_blob = await getPublicImage(

                carpetasStorage[tabla],
                registro[campoImagen]
            );
        } else {
            registroProcesado.imagen_blob = null;
        }

        return registroProcesado;
    };

    const syncFromSupabase = async () => {
        try {
            setLoading(true);
            setError(null);

            const tablas = ["articulos", "categorias", "sub_categorias"];

            for (const tabla of tablas) {
                const { data, error } = await supabase.from(tabla).select("*");
                if (error) {
                    setError(error);
                    console.error(`Error obteniendo ${tabla}:`, error);
                    continue;
                }

                const registrosProcesados = await Promise.all(
                    data.map((registro) => procesarRegistro(tabla, registro))
                );

                for (const item of registrosProcesados) {
                    await db[tabla].put(item);
                }
            }
        } catch (error) {
            console.error("Error general durante sincronización:", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    // 🟢 Auto-sync al inicio si se habilita
    useEffect(() => {
        if (autoSync) {
            syncFromSupabase();
        }
    }, [autoSync]);

    useEffect(() => {
        const subscriptions = [];

        ["articulos", "categorias", "sub_categorias"].forEach((tabla) => {
            const subscription = supabase
                .channel(`changes_${tabla}`)
                .on(
                    "postgres_changes",
                    {
                        event: "*",
                        schema: "public",
                        table: tabla,
                    },
                    async (payload) => {
                        try {
                            const registroProcesado =
                                payload.new && (await procesarRegistro(tabla, payload.new));

                            switch (payload.eventType) {
                                case "INSERT":
                                case "UPDATE":
                                    await db[tabla].put(registroProcesado);
                                    break;
                                case "DELETE":
                                    if (payload.old?.id) {
                                        await db[tabla].delete(payload.old.id);
                                    }
                                    break;
                            }
                        } catch (err) {
                            console.error(`Error en cambio de ${tabla}:`, err);
                        }
                    }
                )
                .subscribe();

            subscriptions.push(subscription);
        });

        return () => {
            subscriptions.forEach((sub) => supabase.removeChannel(sub));
        };
    }, []);

    return {
        syncFromSupabase,
        loading,
        error,
    };
};
