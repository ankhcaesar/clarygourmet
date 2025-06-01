import { useContext } from "react"
import styles from "./BotonMenu.module.css"
import { GlobalContext } from "../../context/GlobalContext"

function BotonMenu({ destino, icono }) {
    const { ir, botonMenu } = useContext(GlobalContext)

    const claseIcono = botonMenu === destino
        ? styles["boton-menu__icono--inactivo"]
        : styles["boton-menu__icono--activo"]

    const handleClick = () => {
        ir(destino)
    }

    return (
        <button
            className={styles["boton-menu"]}
            onClick={handleClick}
            aria-label={`Ir a ${destino}`}
        >
            <img src={icono} className={claseIcono} alt="" />
        </button>
    )
}

export default BotonMenu
