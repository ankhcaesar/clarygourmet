import styles from "./Carrito.module.css"
import Cabecera from "../../components/Cabecera/Index"
import Menu from "../../components/Menu/Index"
import TarjetasCarrito from "../../components/TarjetasCarrito"
import Boton from "../../components/Boton/Index"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import ScrollContainer from "../../components/ScrollContaiiner/Index"
import { UseArticulosCarrito } from "../../hooks/UseArticulosCarrito"


function Carrito() {
    useEffect
    const { setBotonMenu, formatomoneda, setLoader, itemsCarrito } = useContext(GlobalContext)
    const { articulosCarrito, loading } = UseArticulosCarrito();

    const totalCompra = articulosCarrito.reduce((acc, art) => acc + art.valor_total, 0);


    useEffect(() => {
        setBotonMenu("carrito")

        if (loading) {
            setLoader({ show: true });
        } else {
            setLoader({ show: false });
        }

    }, [loading])



    return (
        <section className={styles.container}>
            <Cabecera
                titulo="Carrito"
                origen="inicio" />

            <section className={styles.principal}>



                {articulosCarrito.length === 0 ? (
                    <p>No hay productos para mostrar.</p>
                ) : (
                    <div className={styles.listarticulos}>
                            <ScrollContainer direction="vertical" scrollStep={200}>
                            {articulosCarrito.map((item) => (
                                <TarjetasCarrito key={item.id_art} {...item} />

                            ))}
                    </ScrollContainer>
                        </div>
                )}



                <div className={styles.totales}>
                    <div className={styles.subTotales}>
                        <p>Cantidad de productos: {itemsCarrito.totalCantidades}</p>
                    </div>
                    <div className={styles.totalCompra}>
                        <p>
                            TOTAL COMPRA:{formatomoneda(totalCompra)}



                        </p>
                    </div>
                </div>

                <Boton
                    ancho="85%"
                    type="submit"
                    //onClick={() => ir("Categorias")}
                    label="cerrar compra"
                />

            </section>


            <Menu />
        </section>
    )
}
export default Carrito