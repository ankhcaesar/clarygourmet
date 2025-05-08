import styles from "./FlechaScroll.module.css"
import flecha_subir from "/icons/subir_negro.svg"
import flecha_bajar from "/icons/bajar_negro.svg"
import flecha_Izqu from "/icons/ir_negro.svg"
import flecha_Dere from "/icons/volver_negro.svg"


const iconos = {
    up: flecha_subir,
    down: flecha_bajar,
    left: flecha_Izqu,
    right: flecha_Dere
};

function FlechaScroll({ direction = "down", onClick }) {

    return (
        <button
            onClick={onClick}
            className={`${styles.arrowBtn} ${styles[direction]}`}
            aria-label={`Desplazar hacia ${direction}`}
        >
            <img src={iconos[direction]} />
        </button>
    );
}


export default FlechaScroll
