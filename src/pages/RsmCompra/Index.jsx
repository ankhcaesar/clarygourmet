import { useContext } from "react";
import styles from "./RsmCompra.module.css";
import Cabecera from "../../components/Cabecera/Index";
import Boton from "../../components/Boton/Index";
import { GlobalContext } from "../../context/GlobalContext";
import { useResumenCarrito } from "../../hooks/useResumenCarrito";

function RsmCompra() {
    const { formatomoneda, itemsCarrito } = useContext(GlobalContext);
    const { cliente, entrega, venta, articulosCarrito, finalizarCompra } = useResumenCarrito();



    
    return (
        <section className={styles.rsmCompra}>
            <Cabecera titulo="Resumen compra" origen="fin" />

            <div className={styles.rsmCompra__principal}>
                <h2>Resumen</h2>

                <p>Fecha y hora: {venta?.fecha_hora || "No disponible"}</p>

                <ul className={styles.rsmCompra__principal__rsmCompra}>
                    <li>Cliente: {cliente?.nombre}</li>
                    <li>WhatsApp / Alt: {cliente?.whatsapp || cliente?.nro_alternativo}</li>
                    <li>Total productos: {itemsCarrito.totalItems}</li>
                    <li>Total venta: {venta?.total_venta}</li>
                    {venta?.entrega && (
                        <>
                            <li>Calle y número: {cliente?.calle} {cliente?.numero_calle}</li>
                            <li>Barrio: {cliente?.barrio}</li>
                            <li>Entrega programada: {entrega?.fechayhora}</li>
                            <li>Aclaraciones: {entrega?.mensaje}</li>
                        </>
                    )}
                </ul>
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
