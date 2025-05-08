import styles from "./Categorias.module.css"
import Cabecera from "../../components/Cabecera/Index"
import Menu from "../../components/Menu/Index"
import { useContext, useEffect } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import TarjetasCategorias from "../../components/TarjetasCategorias/Index"
import useScrollArrows from "../../context/useScrollArrows"
import FlechaScroll from "../../components/FlechasScroll/Index"

function Categorias() {
    const { setBotonMenu, categoriasVenta } = useContext(GlobalContext)

    const {
        scrollRef,
        showPrev,
        showNext,
        scroll
    } = useScrollArrows({ direction: "vertical", scrollAmount: 150 })

    useEffect(() => { setBotonMenu("categorias") }, [])
    
    return (
        <section className={styles.container}>
            <Cabecera
                titulo="Categorias"
                origen="/" />
             {showPrev && <FlechaScroll direction="up" onClick={() => scroll("prev")} />}

            <section ref={scrollRef} className={styles.principal}>

                {categoriasVenta.map((cat) => (
                    <TarjetasCategorias
                        key={cat.orden}
                        nombre={cat.nombre}
                        color={cat.color}
                        imagen={cat.imagen}
                    />
                ))}

            </section>
            {showNext && <FlechaScroll direction="down" onClick={() => scroll("next")} />}
            <Menu />
        </section>
    )
}
export default Categorias