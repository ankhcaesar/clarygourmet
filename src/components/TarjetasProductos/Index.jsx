import styles from "./TarjetasProductos.module.css";

function TarjetasProductos({ nombre, imagen, onclick }) {


  
  return (
    <section className={styles.producto}>
      <div className={styles.producto__caja} onClick={onclick}>
        <div className={styles.producto__imagenContenedor}>
          <img loading="lazy" src={imagen} alt={nombre} className={styles.producto__imagen} />
        </div>
        <div className={styles.producto__nombre}>
          <h3 className={styles.producto__titulo}>{nombre}</h3>
        </div>
      </div>
    </section>
  );
}

export default TarjetasProductos;

