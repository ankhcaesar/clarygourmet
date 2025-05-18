import styles from "./TarjetasProductos.module.css"

function TarjetasProductos({ nombre, imagen, onclick }) {
    return (
        <section className={styles.principal} >

            <div className={styles.caja} onClick={onclick}>
                <div className={styles.cajaImagen}>
                    <img src={imagen} alt='${nombre}' />
                </div>
                <h3>{nombre}</h3>
            </div>
        </section>
    )
}
export default TarjetasProductos