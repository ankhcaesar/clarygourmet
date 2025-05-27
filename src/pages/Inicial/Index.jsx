import styles from "./Inicial.module.css"
import logo from "/imgs/logo.png"
import { useContext, useEffect } from "react"
import { GlobalContext } from "../../context/GlobalContext"

function Inicial() {

    const { ir } = useContext(GlobalContext)

    useEffect(() => {
        const timeout = setTimeout(() => {
            ir("categorias");
        }, 2000);
        return () => clearTimeout(timeout);
    }, [ir]);

    return (
        <section className={styles.container}>
            <div className={styles.logo}>
                <img src={logo} alt="" />
            </div>
            <div className={styles.bienvenida}>
                <p>Gourmet</p>
                <p>Casero</p>
                <p>y con mucho amor</p>
            </div>
        </section>
    )
}
export default Inicial