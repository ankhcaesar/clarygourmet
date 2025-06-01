import styles from "./RsmCompra.module.css"
import Cabecera from "../../components/Cabecera/Index";
import Boton from "../../components/Boton/Index";


function RsmCompra() {
    return (
        <section className={styles.rsmCompra}>
            <Cabecera
                titulo="Resumen compra"
                origen="fin"
            />

            <div className={styles.rsmCompra__principal}>

            </div>
            <div className={styles.rsmCompra__boton}>

                <Boton
                    ancho="85%"
                    type="submit"
                    label="Confirmar"
                />
            </div>

        </section>
    )
}
export default RsmCompra