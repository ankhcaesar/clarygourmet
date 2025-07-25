import styles from "./TarjetasCarrito.module.css"
import Sumador from "../Sumador/Index"
import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { UseAddVenta } from "../../hooks/UseAddVenta"


const TarjetasCarrito = React.memo(({
    id_arts, nombreArts, presentacion, imagen, valor_unit, cantidad
})=> {
    const [cant, setCant] = useState(cantidad);
    const { formatomoneda } = useContext(GlobalContext);

    const { actualizarCantidadProducto } = UseAddVenta();
    const [isUpdating, setIsUpdating] = useState(false);

useEffect(() => {
    const actualizarCantidad = async () => {
        setIsUpdating(true);
        try {
            await actualizarCantidadProducto(id_arts, cant);
            
        } catch (error) {
            console.error("Error al actualizar cantidad:", error);
        } finally {
            setIsUpdating(false);
        }
    };
    actualizarCantidad();
}, [cant, id_arts]);


    return (
        <section className={styles.principal}>
            <div className={styles.principal__cajaImagen}>
                <img loading="lazy" className={styles.principal__cajaImagen_imagen} src={imagen} alt={nombreArts} />
            </div>
            <div className={styles.principal__derecha}>
                <h3 className={styles.principal__derecha__nombre}>{nombreArts}</h3>
                <div className={styles.principal__derecha__presentacion}>
                    {presentacion}
                </div>
                <div className={styles.principal__derecha__sumadoryvalor}>
                    <Sumador
                        value={cant}
                        setValue={setCant}
                        disabled={isUpdating}
                    />
                    <h3>{formatomoneda(valor_unit, true)}</h3>
                </div>
            </div>
        </section>
    )
})

export default TarjetasCarrito