import styles from "./Boton.module.css"

function Boton(props) {
    const { ancho, type, onClick, label, disabled, formulario } = props
    return (
        <button
            className={disabled ? styles.boton_disabled : styles.boton_active}
            style={{ width: `${ancho}` }}
            type={type}
            disabled={disabled}
            onClick={onClick}
            form={formulario}>
            {label}
        </button>
    )
}
export default Boton