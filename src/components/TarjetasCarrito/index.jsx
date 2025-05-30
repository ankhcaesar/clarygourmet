import styles from "./TarjetasCarrito.module.css"
import Sumador from "../Sumador/Index"
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";

function TarjetasCarrito({
    id_art, articulo, presentacion, imagen, valor_unit, cantidad
}) {
    const [cant, setCant] = useState(cantidad);
    const { formatomoneda } = useContext(GlobalContext);

    return (
        <section className={styles.principal}>
            <div className={styles.cajaImagen}>
                <img src={imagen} alt={articulo} />
            </div>
            <div className={styles.derecha}>
                <h3 className={styles.nombre}>{articulo}</h3>
                <div className={styles.presentacion}>
                    {presentacion}
                </div>
                <div className={styles.sumadoryvalor}>
                    <Sumador
                        value={cant}
                        setValue={setCant}
                    />
                    <h3>{formatomoneda(valor_unit)}</h3>
                </div>
            </div>
        </section>
    )
}

export default TarjetasCarrito
