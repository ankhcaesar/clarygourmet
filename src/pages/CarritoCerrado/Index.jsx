import styles from "./CarritoCerrado.module.css"
import logo from "/imgs/logo.png"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../../context/GlobalContext"
import logoWP from "/imgs/wp.webp"
import { useResumenCarrito } from "../../hooks/useResumenCarrito"

function CarritoCerrado() {
    const { ir } = useContext(GlobalContext);
    const [mostrar, setMostrar] = useState(false)
    const { enviarWhatsApp } = useResumenCarrito();

    useEffect(() => {
        const timeout = setTimeout(() => {
            setMostrar(true);
        }, 3000);
        return () => clearTimeout(timeout);
    }, [mostrar]);


    return (
        <section className={styles.carritoCerrado}>

            <div className={styles.carritoCerrado__arriba}>
                <div className={styles.carritoCerrado__logo}>
                    <img className={styles.carritoCerrado__logo_img} src={logo} alt="Logo" />
                </div>

                <div className={styles.carritoCerrado__mensaje}>
                    <p className={styles.carritoCerrado__mensaje_mensaje}>En breve recibira un mensaje confirmando su pedido</p>
                    <p className={styles.carritoCerrado__mensaje_saludo}>....Gracias.</p>
                </div>
            </div>
            {mostrar &&
                <div className={styles.mensaje_wp}>
                    <p className={styles.mensaje_wp_mensaje}> si no se abrió tu whatsapp,
                        presiona el boton para terminar la compra</p>
                    <button className={styles.mensaje_wp_boton} onClick={enviarWhatsApp}>
                        <img src={logoWP} alt="enviar pedido" />
                    </button>
                </div>
            }
        </section>
    )

}
export default CarritoCerrado