import styles from "./Boton.module.css"

function Boton(props) {
    const {ancho, type,onClick, label }=props
    return(
        <button 
        className={styles.boton} 
        style={{width:`${ancho}`}}
        type={type}
        onClick={onClick}>
            {label}
        </button>
    )
}
export default Boton