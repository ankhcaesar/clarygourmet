import styles from "./Categorias.module.css"
import Cabecera from "../../components/Cabecera/Index"
import Menu from "../../components/Menu/Index"
import { useContext, useEffect } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import TarjetasCategorias from "../../components/TarjetasCategorias/Index"

function Categorias() {
    const { botonMenu, setBotonMenu, categoriasVenta } = useContext(GlobalContext)

    useEffect(() => { setBotonMenu("categorias") }, [])
    return (
        <section className={styles.container}>
            <Cabecera
                titulo="Categorias"
                origen="/" />

            <section className={styles.principal}>

                {categoriasVenta.map((cat) => (
                    <TarjetasCategorias
                        key={cat.orden}
                        nombre={cat.nombre}
                        color={cat.color}
                        imagen={cat.imagen}
                    />
                ))}
            </section>

            <Menu />
        </section>
    )
}
export default Categorias