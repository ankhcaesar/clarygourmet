import { useContext, useEffect } from "react";
import styles from "./RsmCompra.module.css";
import Boton from "../../components/Boton/Index";
import { GlobalContext } from "../../context/GlobalContext";
import { useResumenCarrito } from "../../hooks/useResumenCarrito";

function RsmCompra() {
    const { formatomoneda, formatoFecha, formatoHora, itemsCarrito, setBotonMenu, setCabecera } = useContext(GlobalContext);
    const { cliente, entrega, venta, articulosCarrito, finalizarCompra } = useResumenCarrito();
    const totalCompra = articulosCarrito.reduce((acc, art) => acc + art.valor_x_cant, 0);
    useEffect(() => {
        setBotonMenu("");
        setCabecera((prev) => ({ ...prev, titulo: "Clary Gourmet", origen: "fin" }));

    }, []);

    return (
        <section className={styles.rsmCompra}>

            <div className={styles.rsmCompra__principal}>

                <h2 className={styles.rsmCompra__principal__titulo}>DETALLE DEL PEDIDO</h2>

                <div className={styles.rsmCompra__principal__datosclary}>
                    <ul>
                        <li>Clary Gourmet Mendoza</li>
                        <li>whatsapp: (261) 588 5088</li>
                        <li>Instagram: @clarygourmetmza</li>
                    </ul>
                </div>
                <div className={styles.rsmCompra__principal__datostiket}>
                    <ul>
                        <li>id compra:...{venta ? venta.id_vta.toString().slice(-10) : "s/n"}</li>

                        <li>Fecha: {venta ? formatoFecha(venta.fecha_hora) : "s/n"}</li>
                        <li>Hora: {venta ? formatoHora(venta.fecha_hora) : "s/n"}</li>
                    </ul>
                </div>

                <div className={styles.rsmCompra__principal__datoscliente}>
                    <ul>
                        <li>Cliente: {cliente?.nombre}</li>
                        {cliente?.whatsapp && <li>whatsapp:+549 261 {cliente.whatsapp}</li>}
                        {cliente?.nro_alternativo && <li>num alter:+549 261 {cliente.nro_alternativo}</li>}
                    </ul>

                </div>


                <div className={styles.rsmCompra__principal__listaarticulos}>
                    <ul>
                        {articulosCarrito.map((item) => (
                            <li key={item.id_arts}>
                                {item.nombre} - {item.cant} x {formatomoneda(item.valor_venta)} ....... {formatomoneda(item.valor_x_cant)}
                            </li>
                        ))}
                    </ul>
                    <div className={styles.rsmCompra__principal__listaarticulos__total}>
                        <p>TOTAL: {totalCompra}</p>

                    </div>
                </div>


            </div>

            <div className={styles.rsmCompra__boton}>
                <Boton
                    ancho="85%"
                    type="button"
                    label="Confirmar"
                    onClick={finalizarCompra}
                />
            </div>
        </section>
    );
}

export default RsmCompra;
