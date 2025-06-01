import styles from "./TarjetasCategorias.module.css";

function TarjetasCategorias({ nombre, imagen, onclick }) {
    return (
        <section className={styles["tarjeta-categorias"]}>
            <div className={styles["tarjeta-categorias__contenedor"]} onClick={onclick}>
                <div className={styles["tarjeta-categorias__imagen-contenedor"]}>
                    <img
                        src={imagen}
                        alt={`Imagen representativa de ${nombre}`}
                        className={styles["tarjeta-categorias__imagen"]}
                    />
                </div>
                <div className={styles["tarjeta-categorias__titulo-contenedor"]}>
                    <h3 className={styles["tarjeta-categorias__titulo"]}>{nombre}</h3>
                </div>
            </div>
        </section>
    );
}

export default TarjetasCategorias;
