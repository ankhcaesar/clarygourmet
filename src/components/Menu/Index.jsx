import styles from "./Menu.module.css"
import BotonMenu from "../BotonMenu/Index"
import { useContext, useEffect } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import { UseAddVenta } from "../../hooks/UseAddVenta"
import {Home, Search, ShoppingCart} from "@mui/icons-material"

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
                icono={Home}
            />
            <BotonMenu
                destino="categorias"
                icono={Search}
            />
            <div className={styles.menu__carrito}>
                <BotonMenu
                    destino="carrito"
                    icono={ShoppingCart}
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