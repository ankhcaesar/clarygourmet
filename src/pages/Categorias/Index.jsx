import styles from "./Categorias.module.css"
import Cabecera from "../../components/Cabecera/Index"
import Menu from "../../components/Menu/Index"
function Categorias(params) {
    return (
        <section className={styles.container}>
            <Cabecera
                titulo="Categorias"
                origen="/" />

            <section className={styles.principal}>
                <p>Aqui la fiesta</p>
            </section>


            <Menu />
        </section>
    )
}
export default Categorias