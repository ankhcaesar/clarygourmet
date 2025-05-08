import styles from "./TarjetasCategorias.module.css"

function TarjetasCategorias({nombre, color, imagen}) {
    return (
        <section className={styles.principal}>

            <div className={styles.caja} style={{ backgroundColor: `rgba(${color}, 0.05)` }}>
                <div className={styles.cajaImagen}></div>
                <h3>{nombre}</h3>
                
                
                

            </div>
        </section>
    )
}
export default TarjetasCategorias