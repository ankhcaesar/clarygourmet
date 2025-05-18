import styles from "./TarjetasCategorias.module.css"

function TarjetasCategorias({ nombre,imagen , onclick }) {
    return (
        <section className={styles.principal} >

            <div className={styles.caja} onClick={onclick}>
                    <img src={imagen} alt="" />
                <h3>{nombre}</h3>
            </div>
        </section>
    )
}
export default TarjetasCategorias