import { GlobalContext } from "../../context/GlobalContext"
import { useContext } from "react"
import styles from "./Menu.module.css"
import iconoHome from "../../../public/icons/home_negro.svg"
import iconoCategorias from "../../../public/icons/categoria_negro.svg"
import iconoCarrito from "../../../public/icons/carrito_negro.svg"

function Menu(params) {
    const { ir } = useContext(GlobalContext)

    return (
        <section className={styles.container}>
            <button
                className={styles.butt_Home}
                onClick={() => ir("Inicio")}>
                <img src={iconoHome} alt="/" />
            </button>
            <button
                className={styles.butt_CAtegorias}
                onClick={() => ir("categorias")}>
                <img src={iconoCategorias} alt="Categorias" />
            </button>
            <button
                className={styles.butt_Carrito}
                onClick={() => ir("carrito")}
            >

                <img src={iconoCarrito} alt="Carrito" />
            </button>
        </section>
    )
}
export default Menu