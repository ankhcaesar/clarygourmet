import styles from "./Carrito.module.css"
import Cabecera from "../../components/Cabecera/Index"
import Menu from "../../components/Menu/Index"
import { useContext, useEffect } from "react"
import { GlobalContext } from "../../context/GlobalContext"


function Carrito() {
    const { botonMenu,setBotonMenu } = useContext(GlobalContext)

    useEffect(() => { setBotonMenu("carrito") }, [])
    return(
        <section className={styles.container}>
            <Cabecera
                titulo="Carrito"
                origen="inicio" />

            <section className={styles.principal}>
                <p>Aqui la fiesta del   {botonMenu}</p>
            </section>


            <Menu />
        </section>
    )
}
export default Carrito