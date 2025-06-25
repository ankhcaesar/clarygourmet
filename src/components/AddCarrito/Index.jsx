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
            // Podés mostrar un popup de error si querés
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
                <div className={styles.cajaboton}>

                    <Boton
                        ancho="300px"
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