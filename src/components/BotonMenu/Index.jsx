import { useContext } from "react";
import styles from "./BotonMenu.module.css"
import { GlobalContext } from "../../context/GlobalContext";


function BotonMenu({ destino, icono }) {

    const { ir, botonMenu } = useContext(GlobalContext)

    const claseIcono = botonMenu === destino ? styles.iconoNO : styles.iconoOK

    const handleClick = () => {
        ir(destino)

    }
    

    return (
        <button
            className={styles.boton}
            onClick={handleClick}
            aria-label={`Ir a ${destino}`}
        >
            <img src={icono} className={claseIcono} />
        </button>
    )
}

export default BotonMenu