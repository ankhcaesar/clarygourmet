import styles from "./Cabecera.module.css"
import iconoVolver from "/icons/volver_negro.svg"
import { useContext } from "react"
import { GlobalContext } from "../../context/GlobalContext"
function Cabecera() {
    const { ir, cabecera } = useContext(GlobalContext)
    const { titulo, origen } = cabecera 

    return (
        <section className={styles.cabecera}>
            <button
                className={styles.volver}
                onClick={() => { ir(origen) }}
            >  <img src={iconoVolver} alt="volver" />
            </button>
            <div className={styles.titulo}>
                <h2>{titulo}</h2>
            </div>
        </section>
    )
}
export default Cabecera