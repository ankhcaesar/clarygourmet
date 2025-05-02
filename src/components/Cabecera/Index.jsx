import styles from "./Cabecera.module.css"
import iconoVolver from "../../../public/icons/volver_negro.svg"
import { useContext } from "react"
import { GlobalContext } from "../../context/GlobalContext"
function Cabecera(props) {
    const { titulo, origen } = props
    const { ir } = useContext(GlobalContext)

    return (
        <section className={styles.container}>
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