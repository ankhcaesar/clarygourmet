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
    const { calcularItems } = UseAddVenta();

    useEffect(() => {
        calcularItems();
    }, []);
    return (
        <section className={styles.container}>
            <BotonMenu
                destino="inicio"

                icono={iconoHome}
            />
            <BotonMenu
                destino="categorias"

                icono={iconoCategorias}
            />

            <div className={styles.cantidad}>
                <BotonMenu
                    destino="carrito"
                    icono={iconoCarrito}
                />
                {itemsCarrito.totalCantidades > 0 && (
                    <div className={styles.circuloCantidad}>
                        {itemsCarrito.totalCantidades}
                    </div>
                )}
            </div>
        </section>
    )
}
export default Menu