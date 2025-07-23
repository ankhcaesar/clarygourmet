import styles from "./CarritoCerrado.module.css"
import logo from "/imgs/logo.png"
import { useContext, useEffect } from "react"
import { GlobalContext } from "../../context/GlobalContext"

function CarritoCerrado() {
    const { ir } = useContext(GlobalContext)

    useEffect(() => {
        const timeout = setTimeout(() => {
            ir("inicio");
        }, 3500);
        return () => clearTimeout(timeout);
    }, [ir]);

    return (
        <section className={styles.carritoCerrado}>
            <div className={styles.carritoCerrado__logo}>
                <img src={logo} alt="Logo" />
            </div>
            <div className={styles.carritoCerrado__bienvenida}>
                <p>En breve recibira un mensaje</p>
                <p>confirmando su pedido</p>
                <p>....Gracias.</p>
            </div>
        </section>
    )

}
export default CarritoCerrado