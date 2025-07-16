import styles from "./Carrito.module.css";
import TarjetasCarrito from "../../components/TarjetasCarrito";
import Boton from "../../components/Boton/Index";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import ScrollContainer from "../../components/ScrollContaiiner/Index";
import { UseArticulosCarrito } from "../../hooks/UseArticulosCarrito";

function Carrito() {
    const { setBotonMenu, formatomoneda, setLoader, setCabecera, itemsCarrito, limpiarCarrito, ir } = useContext(GlobalContext);
    const { articulosCarrito, loading } = UseArticulosCarrito();

    const totalCompra = articulosCarrito.reduce((acc, art) => acc + art.valor_total, 0);

    useEffect(() => {
        setBotonMenu("carrito");
        setCabecera((prev) => ({ ...prev, titulo: "Carrito", origen: "categorias" }));

        setLoader({ show: loading });
    }, [loading]);

    return (
        <section className={styles.carrito}>

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
            </section>
            
            <div className={styles.carrito__botones}>

                <Boton
                    ancho="35%"
                    type="submit"
                    label="Cerrar compra"
                    onClick={() => ir("fin")}
                />
                <Boton
                    ancho="35%"
                    type="submit"
                    label="limpiar carrito"
                    disabled={articulosCarrito.length === 0 ? true : false}
                    onClick={() => limpiarCarrito(itemsCarrito.id_vta)}
                />
            </div>

        </section>
    );
}

export default Carrito;
