import { useContext } from "react"
import styles from "./BotonMenu.module.css"
import { GlobalContext } from "../../context/GlobalContext"

function BotonMenu({ destino, icono, ms }) {
    const { ir, botonMenu, botonVibrar } = useContext(GlobalContext)

    const claseIcono = botonMenu === destino
        ? styles["boton-menu__icono--inactivo"]
        : styles["boton-menu__icono--activo"]

    const handleClick = () => {
        ir(destino)
    }

    return (
        <button

            className={styles["boton-menu"]}
            onClick={() => {
                botonVibrar(15);
                handleClick();
            }}
            aria-label={`Ir a ${destino}`}
        >
            <img src={icono} className={claseIcono} alt="" />
        </button>
    )
}

export default BotonMenu
