import styles from "./TarjetasCategorias.module.css";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

function TarjetasCategorias({ nombre, imagen, onclick }) {
const{botonVibrar}=useContext(GlobalContext)

    return (
        <section className={styles.tarjetaCategorias}>
            <div 
                className={styles.tarjetaCategorias__contenedor} 
                onClick={() => { botonVibrar(20); onclick() }}
            >
                <div 
                    className={styles.tarjetaCategorias__imagen}
                    style={{ backgroundImage: `url(${imagen})` }}
                >
                </div>
                <div className={styles.tarjetaCategorias__tituloContenedor}>
                    <h3 className={styles.tarjetaCategorias__titulo}>{nombre}</h3>
                </div>
            </div>
        </section>
    );
}

export default TarjetasCategorias;