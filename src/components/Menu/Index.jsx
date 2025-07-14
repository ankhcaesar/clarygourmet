import styles from "./Menu.module.css"
import iconoHome from "/icons/home_negro.svg"
import iconoCategorias from "/icons/categoria_negro.svg"
import iconoCarrito from "/icons/carrito_negro.svg"
import BotonMenu from "../BotonMenu/Index"
import { useContext, useEffect } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import { UseAddVenta } from "../../hooks/UseAddVenta"

function Menu() {
    const { itemsCarrito } = useContext(GlobalContext)
    const { calcularTotales } = UseAddVenta()


    useEffect(() => {
        if (itemsCarrito.id_vta) {
            calcularTotales(itemsCarrito.id_vta);
        }
    }, [itemsCarrito.id_vta]);
    return (
        <section className={styles.menu}>
            <BotonMenu
                destino="inicio"
                icono={iconoHome}
            />
            <BotonMenu
                destino="categorias"
                icono={iconoCategorias}
            />
            <div className={styles.menu__carrito}>
                <BotonMenu
                    destino="carrito"
                    icono={iconoCarrito}
                />
                {itemsCarrito.totalItems > 0 && (
                    <div className={styles.menu__cantidad}>
                        {itemsCarrito.totalItems}
                    </div>
                )}
            </div>
        </section>
    )
}

export default Menu