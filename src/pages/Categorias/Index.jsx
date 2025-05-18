import styles from "./Categorias.module.css"
import Cabecera from "../../components/Cabecera/Index"
import Menu from "../../components/Menu/Index"
import { useContext, useEffect } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import TarjetasCategorias from "../../components/TarjetasCategorias/Index"
import useScrollArrows from "../../context/useScrollArrows"
import FlechaScroll from "../../components/FlechasScroll/Index"
import { useCategorias } from "../../hooks/UseCategorias";

function Categorias() {
    const { setBotonMenu, ir } = useContext(GlobalContext);

    const {
        scrollRef,
        showPrev,
        showNext,
        scroll
    } = useScrollArrows({ direction: "vertical", scrollAmount: 150 });

    useEffect(() => { setBotonMenu("categorias") }, []);

    const { categorias, loading } = useCategorias();
    if (loading) return <p>Cargando...</p>;

    return (
        <section className={styles.container}>
            <Cabecera
                titulo="Categorias"
                origen="inicio" 
            />
            {showPrev && <FlechaScroll direction="up" onClick={() => scroll("prev")} />}

            <section ref={scrollRef} className={styles.principal}>

                {categorias.map((cat) => (
                    <TarjetasCategorias
                        key={cat.id_cats}
                        nombre={cat.categoria}
                        imagen={cat.imagenUrl}
                        onclick={() =>
                            ir("filtrado", {
                                state: {
                                    id_cats: cat.id_cats,
                                    categoria: cat.categoria
                                }
                            })
                        }
                    />
                ))}

            </section>
            {showNext && <FlechaScroll direction="down" onClick={() => scroll("next")} />}
            <Menu />
        </section>
    )
}
export default Categorias