import { supabase } from './supabaseClient';

const IMAGE_CONFIG = {
    folder: 'articulos',
    fallback: '/imgs/nn.png'
};

export async function getProductImage(imageName) {
    if (!imageName) return IMAGE_CONFIG.fallback;

    try {
        const { data, error } = supabase.storage
            .from(import.meta.env.VITE_SUPABASE_STORAGE_BUCKET)
            .getPublicUrl(`${IMAGE_CONFIG.folder}/${imageName}.jpg`);

        if (error || !data?.publicUrl) throw new Error('Error al obtener la URL pública');

        const publicUrl = data.publicUrl;

        const cache = window.__imageCache || (window.__imageCache = {});
        if (cache[publicUrl]) return publicUrl;

        const img = new Image();
        await new Promise((resolve, reject) => {
            img.onload = () => {
                cache[publicUrl] = true;
                resolve();
            };
            img.onerror = () => reject(new Error('Imagen no encontrada'));
            img.src = publicUrl;
        });

        return publicUrl;
    } catch (error) {
        console.warn(`Imagen no disponible: ${imageName}. Usando fallback.`, error);
        return IMAGE_CONFIG.fallback;
    }
}
