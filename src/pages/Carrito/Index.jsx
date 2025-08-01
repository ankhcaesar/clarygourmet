import styles from "./Carrito.module.css";
import TarjetasCarrito from "../../components/TarjetasCarrito";
import Boton from "../../components/Boton/Index";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import ScrollContainer from "../../components/ScrollContaiiner/Index";
import { useArticulosCarrito } from "../../hooks/useArticulosCarrito";
import { ProductionQuantityLimits } from "@mui/icons-material";

function Carrito() {
    const { setBotonMenu, formatomoneda, setLoader, setCabecera, itemsCarrito, limpiarCarrito, ir } = useContext(GlobalContext);
    const { articulosCarrito, totalVenta, loading } = useArticulosCarrito(itemsCarrito.id_vta);

    useEffect(() => {
        setBotonMenu("carrito");
        setCabecera((prev) => ({ ...prev, titulo: "Carrito", origen: "categorias" }));

        setLoader({ show: loading });
    }, [loading]);

    return (
        <section className={styles.carrito}>

            <section className={styles.carrito__principal}>
                {articulosCarrito.length === 0 ? (
                    <div className={styles.carrito__principal__mensaje}>
                        <ProductionQuantityLimits fontSize="large" sx={{color:"red"}}/>
                        <p className={styles.carrito__principal__mensaje_mensaje}>No hay productos para mostrar.</p>
                    </div>


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
                        <p>TOTAL COMPRA: {formatomoneda(totalVenta, true)}</p>
                    </div>
                </div>
            </section>
            
            <div className={styles.carrito__botones}>

                <Boton
                    ancho="40%"
                    type="submit"
                    label="Cerrar compra"
                    disabled={articulosCarrito.length === 0 ? true : false}
                    onClick={() => ir("fin")}
                />
                <Boton
                    ancho="40%"
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
