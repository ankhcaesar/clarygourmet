import styles from "./TarjetasCategorias.module.css";

function TarjetasCategorias({ nombre, imagen, onclick }) {
    return (
        <section className={styles.principal}>
            <div className={styles.caja} onClick={onclick}>
                <div className={styles.cajaimagen}>

                    <img src={imagen} alt="" className={styles.imagen} />
                </div>
                <div className={styles.cajatitulo}>
                    <h3 className={styles.titulo}>{nombre}</h3>
                </div>
            </div>
        </section>
    );
}

export default TarjetasCategorias;