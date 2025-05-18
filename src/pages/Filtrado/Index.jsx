import styles from "./Filtrado.module.css"
import Cabecera from "../../components/Cabecera/Index"
import Menu from "../../components/Menu/Index"
import { useContext, useEffect } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import { useLocation } from "react-router-dom";
import TarjetasProductos from "../../components/TarjetasProductos/Index"
import { useArticulosPorSubcategorias } from "../../hooks/useArticulosPorSubcategorias"
import ScrollContainer from "../../components/ScrollContaiiner/Index"

function Filtrado() {
    const location = useLocation();
    const { id_cats } = location.state;
    const { setBotonMenu, ir } = useContext(GlobalContext);

    useEffect(() => { setBotonMenu("subcategorias") }, []);

    const { data, loadingArts } = useArticulosPorSubcategorias(id_cats)


    if (loadingArts) return <p>Cargando articulos...</p>

    return (
        <section className={styles.container}>
            <Cabecera
                titulo="Categorias"
                origen="inicio"
            />

            <section className={styles.principal}>
                <ScrollContainer direction="vertical">
                    {data.map((grupo) => (
                        <section key={grupo.id_subcats} className={styles.subcats}>
                            <h2>{grupo.sub_categorias}</h2>
                            <div className={styles.articulos}>
                                <ScrollContainer direction="horizontal">

                                    {grupo.articulos.map((arts) => (
                                        <TarjetasProductos
                                            key={arts.id_arts}
                                            nombre={arts.articulo}
                                            imagen={arts.imagenUrl || arts.imagen_articulo}
                                        />
                                    ))}

                                </ScrollContainer>
                            </div>
                        </section>
                    ))}
                </ScrollContainer>

            </section>
            <Menu />
        </section>
    )
}
export default Filtrado