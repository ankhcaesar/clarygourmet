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

                    <div className={styles.div_izq}>
                        <ul className={styles.items_izq}>
                            <li>ID COMPRA</li>
                            <li>FECHA</li>
                            <li>HORA</li>
                        </ul>
                    </div>

                    <div className={styles.div_der}>
                        <ul className={styles.items_der}>
                            <li>...{venta ? venta.id_vta.toString().slice(-10) : "s/n"}</li>
                            <li> {venta ? formatoFecha(venta.fecha_hora) : "s/n"}</li>
                            <li> {venta ? formatoHora(venta.fecha_hora) : "s/n"}</li>
                        </ul>
                    </div>
                </div>

                <div className={styles.rsmCompra__principal__datoscliente}>

                    <div className={styles.div_izq}>
                        <ul className={styles.items_izq}>
                            <li>Cliente: </li>
                            {cliente?.whatsapp && <li>whatsapp: </li>}
                            {cliente?.nro_alternativo && <li>num alter: </li>}

                        </ul>
                    </div>

                    <div className={styles.div_der}>
                        <ul className={styles.items_der}>
                            <li>{cliente?.nombre}</li>
                            {cliente?.whatsapp && <li>+549 (261) {cliente.whatsapp}</li>}
                            {cliente?.nro_alternativo && <li>{cliente.nro_alternativo}</li>}
                        </ul>
                    </div>
                </div>

                <div className={styles.rsmCompra__principal__listaarticulos}>

                    <table className={styles.rsmCompra__principal__listaarticulos_tabla}>
                        <thead>
                            <tr>
                                <th scope="col" className={styles.col_cantidad}>Cant.</th>
                                <th scope="col" className={styles.col_articulo}>Artículo</th>
                                <th scope="col" className={styles.col_precio}>Unit.</th>
                                <th scope="col" className={styles.col_subtotal}>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articulosCarrito.map((item) => (
                                <tr key={`${item.id_arts}-${item.cant}`}>
                                    <td className={styles.titulos}>{item.cant}</td>
                                    <td className={styles.col_articulo}>{item.nombre}</td>
                                    <td className={styles.col_precio}>{formatomoneda(item.valor_venta)}</td>
                                    <td className={styles.col_subtotal}>{formatomoneda(item.valor_x_cant)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={3} className={styles.total_label}>TOTAL</td>
                                <td className={styles.total_compra}>{formatomoneda(totalCompra, true)}</td>
                            </tr>
                        </tfoot>
                    </table>
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
