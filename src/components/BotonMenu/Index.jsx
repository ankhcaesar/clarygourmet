import styles from "./BotonMenu.module.css"
import React, { useContext } from "react"
import { GlobalContext } from "../../context/GlobalContext"

function BotonMenu({ destino, icono, ms }) {
    const { ir, botonMenu, botonVibrar } = useContext(GlobalContext)

    const claseIcono = botonMenu === destino
    const iconoEstilo = React.cloneElement(icono, {
        className: claseIcono
            ? styles["boton-menu__icono--inactivo"]
            : styles["boton-menu__icono--activo"],
        color: claseIcono ? "disabled" : "action"
    });



    const handleClick = () => {
        botonVibrar(15);
        ir(destino);
    }

    return (
        <button
            className={styles["boton-menu"]}
            onClick={() => { handleClick(); }}
            aria-label={`Ir a ${destino}`}
        >
            {iconoEstilo}
        </button>
    )
}

export default BotonMenu
