import styles from "./BotonMenu.module.css"
import React, { useContext } from "react"
import { GlobalContext } from "../../context/GlobalContext"

function BotonMenu({ destino, icono: Icono , ms }) {
    const { ir, botonMenu, botonVibrar } = useContext(GlobalContext)
 

    const claseIcono = botonMenu === destino



    const estaActivo = botonMenu === destino


    const handleClick = () => {
        botonVibrar(ms || 15);
        ir(destino);
    }

    return (
        <button
            className={styles["boton-menu"]}
            onClick={() => { handleClick(); }}
            aria-label={`Ir a ${destino}`}
            
            
        >
            <Icono 
            

            fontSize="large"
            
            className={estaActivo 
                    ? styles["boton-menu__icono--inactivo"] 
                    : styles["boton-menu__icono--activo"]
                }
            
            
            />

        </button>
    )
}

export default BotonMenu
