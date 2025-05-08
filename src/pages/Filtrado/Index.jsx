import { useContext, useEffect } from "react"
import Cabecera from "../../components/Cabecera/Index"
import Menu from "../../components/Menu/Index"
import styles from "./Filtrado.module.css"
import { GlobalContext } from "../../context/GlobalContext"
import useScrollArrows from "../../context/useScrollArrows"

function Filtrado(params) {
    const { setBotonMenu, ProductosySubCategorias } = useContext(GlobalContext);

    const {
        scrollRef,
        showPrev,
        showNext,
        scroll
    } = useScrollArrows({ direction: "vertical", scrollAmount: 150 })

    useEffect(() => { setBotonMenu("filtrado") }, [])
    return (
        <section className={styles.container}>
            <Cabecera
                titulo="Productos"
                origen="categorias"
            />
            {showPrev && <FlechaScroll direction="left" onClick={() => scroll("prev")} />}
            <section ref={scrollRef} className={styles.principal}>
                {ProductosySubCategorias.map((subcat)=>{
                    <ul>
                        <li>subcat.nombre</li>
                    </ul>
                })}

            </section>
            {showNext && <FlechaScroll direction="right" onClick={() => scroll("next")} />}

            <Menu />
        </section>
    )
}
export default Filtrado