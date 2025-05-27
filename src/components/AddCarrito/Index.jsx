import styles from "./AddCarrito.module.css"
import Boton from "../Boton/Index"
import iconomas from "/icons/mas.svg"
import iconomenos from "/icons/menos.svg"
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext"
import Sumador from "../Sumador/Index";



function AddCarrito({ data }) {

    const { limpiarAddCarrito, formatomoneda } = useContext(GlobalContext);
    const [cantidad, setCantidad] = useState(1);
    
    if (!data || data.length === 0 || !data[0].articulo) return null;
    const { articulo, descripcion, imagenUrl, valor_venta, presentacion, onclick } = data[0];

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains(styles.overlay)) {
            limpiarAddCarrito()
        }
    }

    return (
        <section className={styles.overlay} onClick={handleOverlayClick} >

            <div className={styles.caja} onClick={onclick}>
                <div className={styles.cajaImagen}>
                    <img src={imagenUrl} alt={articulo} />
                </div>
                <div className={styles.pie}>
                    <p className={styles.presentacion}>{presentacion}</p>
                    <p className={styles.valor}>{formatomoneda(valor_venta)}</p>
                </div>
                <div className={styles.descripcion}>
                    <h4>{articulo}</h4>
                    <p className={styles.textodescipcion}>{descripcion}</p>
                </div>
                <div className={styles.cantidad}>
                    <p className={styles.titulocantidad}>cantidad</p>
                    <Sumador
                        value={cantidad} 
                        setValue={setCantidad}
                    />
                </div>
                <Boton
                    ancho="300px"
                    type="submit"
                    //onClick={() => ir("Categorias")}
                    label="agregar al carrito"
                />
            </div>
        </section>
    )
}
export default AddCarrito