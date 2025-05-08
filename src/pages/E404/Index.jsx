import Cabecera from "../../components/Cabecera/Index"
import Menu from "../../components/Menu/Index"
import styles from "./E404.module.css"
import e404img from "/imgs/E_404.svg"
function E404(params) {

    return (
        <section className={styles.principal}>
            <Cabecera
                titulo="Pagina web no encontrada"
                origen="/"
            />

            <div className={styles.container}>
                <img src={e404img} alt="Pagina web no encontrada" className={styles.imagen} />
                <div className={styles.animacionPuerta}></div>
            </div>

            <Menu />

        </section>
    )
}
export default E404