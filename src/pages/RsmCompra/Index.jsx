import { useContext, useState } from "react";
import styles from "./RsmCompra.module.css";
import Cabecera from "../../components/Cabecera/Index";
import Boton from "../../components/Boton/Index";
import CampoForm from "../../components/CampoForm/Index";
import { GlobalContext } from "../../context/GlobalContext";
import { useResumenCompra } from "../../hooks/useResumenCompra";
import { supabase } from "../../db/supabaseclient";
import db from "../../db/db";

function RsmCompra() {
    const { formatomoneda, itemsCarrito, setLoader, ir } = useContext(GlobalContext);
    const { cliente, entrega, venta, articulosCarrito, loading } = useResumenCompra();



    const [formData, setFormData] = useState({
        fechayhora: entrega?.fechayhora || "",
        mensaje: entrega?.mensaje || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEnvio = async () => {
        setLoader({ show: true });

        const sanitizarVentas = (articulos, clienteId, fecha) =>
            articulos.map((item) => ({
                id_art: item.id_art,
                cant: item.cantidad,
                valor_unit: item.valor_unit,
                valor_total: item.valor_total,
                id_cli: clienteId,
                fecha_hora: fecha || new Date().toISOString(),
            }));

        const sanitizarCliente = (cliente) => ({
            id_cli: cliente.id_cli,
            nombre: cliente.nombre,
            whatsapp: cliente.whatsapp,
            nro_alternativo: cliente.nro_alternativo,
            ciudad: cliente.ciudad,
            barrio: cliente.barrio,
            calle: cliente.calle,
            numero_calle: cliente.numero_calle,
        });



        try {
            const clienteSubida = sanitizarCliente(cliente);
            const ventasSubida = sanitizarVentas(articulosCarrito, cliente.id_cli, venta?.fecha_hora);

            console.log("Cliente a subir:", clienteSubida);
            console.log("Ventas a subir:", ventasSubida);

            const { error: errorCliente } = await supabase.from("clientes").insert(clienteSubida);
            const { error: errorVentas } = await supabase.from("ventas").insert(ventasSubida);

            if (errorCliente || errorVentas) {
                console.error("Errores en Supabase:", errorCliente, errorVentas);
                return;
            }

            await db.ventas.clear();
            await db.entrega.clear();
            ir("carritocerrado");
        } catch (error) {
            console.error("Error general en handleEnvio:", error);
        } finally {
            setLoader({ show: false });
        }
    };


    if (loading) return <p className={styles.rsmCompra__cargando}>Cargando resumen...</p>;

    const totalVenta = articulosCarrito.reduce((acc, art) => acc + art.valor_total, 0);

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
                    <li>Total venta: {formatomoneda(totalVenta)}</li>
                    <li>Calle y número: {cliente?.calle} {cliente?.numero_calle}</li>
                    <li>Barrio: {cliente?.barrio}</li>
                </ul>

                {entrega?.delivery && (
                    <div className={styles.rsmCompra__formulario}>
                        <CampoForm
                            type="datetime-local"
                            name="fechayhora"
                            label="Día y hora de entrega"
                            value={formData.fechayhora}
                            onChange={handleChange}
                        />
                        <CampoForm
                            type="textarea"
                            name="mensaje"
                            label="Aclaraciones"
                            value={formData.mensaje}
                            onChange={handleChange}
                        />
                    </div>
                )}
            </div>

            <div className={styles.rsmCompra__boton}>
                <Boton
                    ancho="85%"
                    type="submit"
                    label="Confirmar"
                    onClick={handleEnvio}
                />
            </div>
        </section>
    );
}

export default RsmCompra;
