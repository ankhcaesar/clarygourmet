import styles from "./Categorias.module.css"
import Cabecera from "../../components/Cabecera/Index"
import Menu from "../../components/Menu/Index"
import { useContext, useEffect } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import TarjetasCategorias from "../../components/TarjetasCategorias/Index"
import { useCategorias } from "../../hooks/UseCategorias";
import ScrollContainer from "../../components/ScrollContaiiner/Index"

function Categorias() {
    const { setBotonMenu, ir } = useContext(GlobalContext);


    useEffect(() => { setBotonMenu("categorias") }, []);

    const { categorias, loading } = useCategorias();
    if (loading) return <p>Cargando...</p>;

    return (
        <section className={styles.container}>
            <Cabecera
                titulo="Categorias"
                origen="inicio"
            />

            <ScrollContainer direction="vertical">
                <section className={styles.principal}>

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
            </ScrollContainer>
            <Menu />
        </section>
    )
}
export default Categorias