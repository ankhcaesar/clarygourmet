import styles from "./Filtrado.module.css"
import Cabecera from "../../components/Cabecera/Index"
import Menu from "../../components/Menu/Index"
import FlechaScroll from "../../components/FlechasScroll/Index"
import useScrollArrows from "../../context/useScrollArrows"
import { useContext, useEffect } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import { useLocation } from "react-router-dom";
import TarjetasProductos from "../../components/TarjetasProductos/Index"
import { useArticulosPorSubcategorias } from "../../hooks/useArticulosPorSubcategorias"

function Filtrado() {
    const location = useLocation();
    const { id_cats } = location.state;
    const { setBotonMenu, ir } = useContext(GlobalContext);
    const { scrollRef, showPrev, showNext, scroll } = useScrollArrows({ direction: "vertical", scrollAmount: 150 });

    useEffect(() => { setBotonMenu("subcategorias") }, []);

    const { data, loadingArts } = useArticulosPorSubcategorias(id_cats)


    if (loadingArts) return <p>Cargando articulos...</p>

    return (
        <section className={styles.container}>
            <Cabecera
                titulo="Categorias"
                origen="inicio"
            />
            {showPrev && <FlechaScroll
                direction="up"
                onClick={() => scroll("prev")}
            />}

            <section
                ref={scrollRef}
                className={styles.principal}
            >

                {data.map((grupo) => (
                    <div key={grupo.id_subcats} className={styles.subcats}>
                        <h2>{grupo.sub_categorias}</h2>
                        <div className={styles.articulos}>
                            {grupo.articulos.map((arts) => (
                                <TarjetasProductos
                                    key={arts.id_arts}
                                    nombre={arts.articulo}
                                    imagen={arts.imagenUrl || arts.imagen_articulo}
                                />
                            ))}
                        </div>
                    </div>
                ))}

            </section>

            {showNext && <FlechaScroll
                direction="down"
                onClick={() => scroll("next")}
            />}
            <Menu />
        </section>
    )
}
export default Filtrado