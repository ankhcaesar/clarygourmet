import styles from "./Categorias.module.css";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import TarjetasCategorias from "../../components/TarjetasCategorias/Index";
import { useCategorias } from "../../hooks/UseCategorias";
import ScrollContainer from "../../components/ScrollContaiiner/Index";

function Categorias() {
    const { setBotonMenu, ir, setLoader } = useContext(GlobalContext);

    useEffect(() => {
        setBotonMenu("categorias");
    }, []);

    const { categorias, loading } = useCategorias();

    useEffect(() => {
        setLoader({ show: loading });
    }, [loading]);

  
    return (
        <section className={styles.categorias}>

            <ScrollContainer direction="vertical" scrollStep={200}>
                <section className={styles.categorias__principal}>
                    {categorias
                    .filter(cat=> cat.disponible)
                    .map((cat) => (
                        <TarjetasCategorias
                            key={cat.id_cats}
                            nombre={cat.categoria}
                            imagen={cat.imagenUrl}
                            onclick={() =>
                                ir("filtrado", {
                                    state: {
                                        id_cats: cat.id_cats,
                                        categoria: cat.categoria,
                                    },
                                })
                            }
                        />
                    ))}
                </section>
            </ScrollContainer>

        </section>
    );
}

export default Categorias;
