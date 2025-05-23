import styles from "./Categorias.module.css"
import Cabecera from "../../components/Cabecera/Index"
import Menu from "../../components/Menu/Index"
import { useContext, useEffect } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import TarjetasCategorias from "../../components/TarjetasCategorias/Index"
import { useCategorias } from "../../hooks/UseCategorias";
import ScrollContainer from "../../components/ScrollContaiiner/Index"

function Categorias() {
    const { setBotonMenu, ir, setLoader } = useContext(GlobalContext);


    useEffect(() => { setBotonMenu("categorias") }, []);

    const { categorias, loading } = useCategorias();
    useEffect(() => {
        if (loading) {
            setLoader({ show: true });
        } else {
            setLoader({ show: false });
        }

    }, [loading]);
    return (
        <section className={styles.container}>
            <Cabecera
                titulo="Categorias"
                origen="inicio"
            />

            <ScrollContainer direction="vertical" scrollStep={200}>
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