import styles from "./AddCarrito.module.css"
import Boton from "../Boton/Index"
import iconomas from "/icons/mas.svg"
import iconomenos from "/icons/menos.svg"
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext"



function AddCarrito({ data }) {

    const { limpiarAddCarrito, formatomoneda } = useContext(GlobalContext)
    
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
                    <p>cantidad</p>
                    <p>1</p>
                    <button className={styles.suma}>
                        <img src={iconomas} alt="suma" />
                    </button>
                    <button className={styles.resta}>
                        <img src={iconomenos} alt="resta" />
                    </button>
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