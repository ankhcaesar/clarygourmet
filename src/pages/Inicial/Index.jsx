import styles from "./Inicial.module.css"
import logo from "/imgs/logo.png"
import { useContext, useEffect } from "react"
import { GlobalContext } from "../../context/GlobalContext"

function Inicial() {
    const { ir, setCabecera  } = useContext(GlobalContext)

    useEffect(() => {
        const timeout = setTimeout(() => {
            ir("categorias");
            setCabecera((prev) => ({ titulo:"Categorias", origen: "inicio" }));
        }, 2500);
        return () => clearTimeout(timeout);
    }, [ir]);

    return (
        <section className={styles.inicial}>
            <div className={styles.inicial__logo}>
                <img src={logo} alt="Logo" />
            </div>
            <div className={styles.inicial__bienvenida}>
                <p>Gourmet</p>
                <p>Casero</p>
                <p>y con mucho amor</p>
            </div>
        </section>
    )
}
export default Inicial;
