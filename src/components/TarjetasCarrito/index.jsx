import styles from "./TarjetasCarrito.module.css"
import Sumador from "../Sumador/Index"
function TarjetasCarrito({ key, nombre, imagen, presentacion, valor_venta }) {
     const [cantidad, setCantidad] = useState(1);
 
 
    return (
        <section className={styles.principal} >
            <div className={styles.cajaImagen}>
                <img src={imagen} alt='${nombre}' />
            </div>
            <div className={styles.derecha}>
                <h3 className={styles.nombre}> {nombre} </h3>
                <div className={styles.presentacion}>
                    {presentacion}
                </div>
                <div className={styles.sumadoryvalor}>
                    <Sumador
                        value={cantidad}
                        setValue={setCantidad}
                    />
                    <h3>{valor_venta}</h3>
                </div>
            </div>
        </section>


    )
}
export default TarjetasCarrito

