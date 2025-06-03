import styles from "./TarjetasCategorias.module.css";

function TarjetasCategorias({ nombre, imagen, onclick }) {
    return (
        <section className={styles.tarjetaCategorias}>
            <div className={styles.tarjetaCategorias__contenedor} onClick={onclick}>
                <div className={styles.tarjetaCategorias__imagenContenedor}>
                    <img
                        src={imagen}
                        alt={`Imagen representativa de ${nombre}`}
                        className={styles.tarjetaCategorias__imagen}
                    />
                </div>
                <div className={styles.tarjetaCategorias__tituloContenedor}>
                    <h3 className={styles.tarjetaCategorias__titulo}>{nombre}</h3>
                </div>
            </div>
        </section>
    );
}

export default TarjetasCategorias;
