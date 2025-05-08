import styles from "./Menu.module.css"
import iconoHome from "/icons/home_negro.svg"
import iconoCategorias from "/icons/categoria_negro.svg"
import iconoCarrito from "/icons/carrito_negro.svg"
import BotonMenu from "../BotonMenu/Index"
function Menu(params) {






    return (
        <section className={styles.container}>
            <BotonMenu
                destino="/"

                icono={iconoHome}
            />
            <BotonMenu
                destino="categorias"

                icono={iconoCategorias}
            />
            <BotonMenu
                destino="carrito"

                icono={iconoCarrito}
            />
        </section>
    )
}
export default Menu