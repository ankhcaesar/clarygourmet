import styles from "./Carrito.module.css";
import Cabecera from "../../components/Cabecera/Index";
import Menu from "../../components/Menu/Index";
import TarjetasCarrito from "../../components/TarjetasCarrito";
import Boton from "../../components/Boton/Index";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import ScrollContainer from "../../components/ScrollContaiiner/Index";
import { UseArticulosCarrito } from "../../hooks/UseArticulosCarrito";

function Carrito() {
    const { setBotonMenu, formatomoneda, setLoader, itemsCarrito, ir } = useContext(GlobalContext);
    const { articulosCarrito, loading } = UseArticulosCarrito();

    const totalCompra = articulosCarrito.reduce((acc, art) => acc + art.valor_total, 0);

    useEffect(() => {
        setBotonMenu("carrito");
        setLoader({ show: loading });
    }, [loading]);

    return (
        <section className={styles.carrito}>
            <Cabecera
                titulo="Carrito"
                origen="inicio"
            />

            <section className={styles.carrito__principal}>
                {articulosCarrito.length === 0 ? (
                    <p>No hay productos para mostrar.</p>
                ) : (
                    <div className={styles.carrito__listaArticulos}>
                        <ScrollContainer direction="vertical" scrollStep={200}>
                            {articulosCarrito.map((item) => (
                                <TarjetasCarrito key={item.id_arts} {...item} />
                            ))}
                        </ScrollContainer>
                    </div>
                )}

                <div className={styles.carrito__totales}>
                    <div className={styles.carrito__subTotales}>
                        <p>Cantidad de productos: {itemsCarrito.totalItems}</p>
                    </div>
                    <div className={styles.carrito__totalCompra}>
                        <p>TOTAL COMPRA: {formatomoneda(totalCompra)}</p>
                    </div>
                </div>

                <Boton
                    ancho="85%"
                    type="submit"
                    label="Cerrar compra"
                    onClick={()=>ir("fin")}
                />
            </section>

            <Menu />
        </section>
    );
}

export default Carrito;
