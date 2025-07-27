import styles from "./AddCarrito.module.css"
import Boton from "../Boton/Index"
import { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext"
import Sumador from "../Sumador/Index";
import { UseAddVenta } from "../../hooks/UseAddVenta"

function AddCarrito({ data }) {

    const { limpiarAddCarrito, formatomoneda } = useContext(GlobalContext);
    const [cantidad, setCantidad] = useState(1);
    const { agregarProductoAVenta } = UseAddVenta();



    if (!data || data.length === 0 || !data[0].articulo) return null;
    const { articulo, descripcion, imagenUrl, valor_venta, presentacion, id_arts } = data[0];

    const handleAgregar = async () => {
        try {
            await agregarProductoAVenta({
                id_arts,
                cant: cantidad,
                valor_venta
            });

            limpiarAddCarrito();
        } catch (error) {
            console.error("Error al agregar producto a la venta:", error);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains(styles.overlay)) {
            limpiarAddCarrito()
        }
    }

    return (
        <section className={styles.overlay} onClick={handleOverlayClick} >

            <div className={styles.caja} onClick={onclick}>

                <div className={styles.caja__imagen}>
                    <div
                        className={styles.caja__imagen__imagen}
                        style={{ backgroundImage: `url(${imagenUrl})` }}
                    > </div>
                </div>

                <div className={styles.caja__pie}>
                    <p className={styles.caja__pie__presentacion}>{presentacion}</p>
                    <p className={styles.caja__pie__valor}>{formatomoneda(valor_venta, true)}</p>
                </div>

                <div className={styles.caja__descripcion}>
                    <h4>{articulo}</h4>
                    <p className={styles.caja__descripcion__textodescipcion}>{descripcion}</p>
                </div>

                <div className={styles.caja__cantidad}>
                    <p className={styles.caja__cantidad__titulo}>Cantidad</p>
                    <Sumador
                        value={cantidad}
                        setValue={setCantidad}
                    />
                </div>

                <div className={styles.caja__boton}>
                    <Boton
                        ancho="100%"
                        type="submit"
                        onClick={handleAgregar}
                        label="agregar al carrito"
                    />
                </div>
            </div>
        </section>
    )
}
export default AddCarrito