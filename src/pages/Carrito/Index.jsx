import styles from "./Carrito.module.css"
import Cabecera from "../../components/Cabecera/Index"
import Menu from "../../components/Menu/Index"
import TarjetasCarrito from "../../components/TarjetasCarrito"
import Boton from "../../components/Boton/Index"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import ScrollContainer from "../../components/ScrollContaiiner/Index"



function Carrito() {
    
    const { setBotonMenu, formatomoneda, setLoader } = useContext(GlobalContext)
    
    const loading = false //la reemplazo cuando cargue los articulos

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

                <ScrollContainer direction="vertical" scrollStep={200}>

                    <div className={styles.listarticulos}>

                            <TarjetasCarrito />
                        Aqui
                        envio: key(idarticulo), nombre, imagen, presentacion, valor_venta


                    </div>
                </ScrollContainer>
                <div className={styles.totales}>
                    <div className={styles.subTotales}>
                        <p>Cantidad de productos: aqui const suma productos con el mismo id de venta </p>
                    </div>
                    <div className={styles.totalCompra}>
                        <p>
                            TOTAL COMPRA:{formatomoneda(50)}



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