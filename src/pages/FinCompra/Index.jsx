import styles from "./FinCompra.module.css";
import Cabecera from "../../components/Cabecera/Index";
import Boton from "../../components/Boton/Index";
import CampoForm from "../../components/CampoForm/Index";
import { useState, useContext, useEffect } from "react";
import { useGuardarDatosEnvio } from "../../hooks/useGuardarDatosEnvio"
import { useValidarCliente } from "../../hooks/useValidarCliente";
import { GlobalContext } from "../../context/GlobalContext";
import db from "../../db/db"

function FinCompra() {


    const [form, setForm] = useState({
        nombre: "",
        whatsapp: "",
        nro_alternativo: "",
        ciudad: "",
        barrio: "",
        calle: "",
        numero_calle: "",
        piso: "",
        depto: "",
        envio_a_domicilio: true,
        fecha_hora_entrega: "",
        aclaraciones: "",
    });

    const { itemsCarrito, ir } = useContext(GlobalContext);
    const { guardar } = useGuardarDatosEnvio();
    const { validar } = useValidarCliente();
    const [errores, setErrores] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    /** si funciona agregar desde la creacion, lo sacamos de aca
        useEffect(() => {
            const cargarDatosCliente = async () => {
                const clientes = await db.clientes.toArray();
                if (clientes.length > 0) {
                    setForm(prev => ({ ...prev, ...clientes[0] }));
                }
            };
            cargarDatosCliente();
        }, [])
     */


    useEffect(() => {
        const cargarDatosCliente = async () => {
            const clientes = await db.clientes.toArray();
            if (clientes.length > 0) {
                const cliente = clientes[0];
                setForm(prev => ({ ...prev, ...cliente }));

                const id_vta = itemsCarrito?.id_vta;
                if (id_vta) {
                    await db.ventas.update(id_vta, { id_cli: cliente.id_cli });
                }
            }
        };

        cargarDatosCliente();
    }, []);



    const handleSubmit = async (e) => {
        e.preventDefault();

        const { esValido, errores } = validar(form);
        if (!esValido) {
            setErrores(errores);
            return;
        }

        try {
            await guardar(form, itemsCarrito.id_vta);
            ir("resumen")
        } catch (error) {
            console.error("Error al guardar datos de envío:", error);
        }
    };




    return (
        <section className={styles.finCompra}>
            <Cabecera
                titulo="Datos del envío"
                origen="carrito"
            />

            <section className={styles.finCompra__principal}>

                <form className={styles.finCompra__formulario} onSubmit={handleSubmit}>

                    <h3>Datos del cliente</h3>
                    <div className={styles.fincompra_formulario_01}>
                        <CampoForm
                            label="Nombre"
                            name="nombre"
                            ancho="80%"
                            value={form.nombre}
                            onChange={handleChange}
                            error={errores.nombre}
                        />
                    </div>
                    <div className={styles.fincompra_formulario_02}>
                        <CampoForm
                            label="WhatsApp"
                            name="whatsapp"
                            ancho="35%"
                            value={form.whatsapp}
                            onChange={handleChange}
                        />
                        <CampoForm
                            label="Número alternativo"
                            name="nro_alternativo"
                            ancho="35%"
                            value={form.nro_alternativo}
                            onChange={handleChange}
                            error={errores.telefonos}
                        />
                    </div>
                    <div className={styles.fincompra_formulario_01}>
                        <CampoForm
                            label="Envío a domicilio"
                            name="envio_a_domicilio"
                            type="checkbox"
                            ancho="80%"
                            checked={form.envio_a_domicilio}
                            onChange={handleChange}
                        />
                    </div>

                    {form.envio_a_domicilio && (
                        <>
                            <h3>Datos del envio</h3>
                            <div className={styles.fincompra_formulario_02}>
                                <CampoForm
                                    label="Ciudad"
                                    name="ciudad"
                                    ancho="35%"
                                    value={form.ciudad}
                                    onChange={handleChange}
                                    error={errores.ciudad}
                                />
                                <CampoForm
                                    label="Barrio"
                                    name="barrio"
                                    ancho="35%"
                                    value={form.barrio}
                                    onChange={handleChange}
                                    error={errores.barrio}
                                />
                            </div>

                            <div className={styles.fincompra_formulario_01}>

                                <CampoForm
                                    label="Calle"
                                    name="calle"
                                    ancho="80%"
                                    value={form.calle}
                                    onChange={handleChange}
                                    error={errores.calle}
                                />

                            </div>

                            <div className={styles.fincompra_formulario_02}>
                                <CampoForm
                                    label="Número"
                                    name="numero_calle"
                                    ancho="25%"
                                    value={form.numero_calle}
                                    onChange={handleChange}
                                    error={errores.numero_calle}
                                />
                                <CampoForm
                                    label="Piso"
                                    name="piso"
                                    ancho="15%"
                                    value={form.piso}
                                    onChange={handleChange}
                                />
                                <CampoForm
                                    label="Depto"
                                    name="depto"
                                    ancho="15%"
                                    value={form.depto}
                                    onChange={handleChange}
                                />
                            </div>

                            <h3>dia y hora de entrega</h3>
                            <div className={styles.fincompra_formulario_01}>


                                <CampoForm
                                    label="Fecha y hora de entrega"
                                    name="fecha_hora_entrega"
                                    type="datetime-local"
                                    ancho="60%"
                                    value={form.fecha_hora_entrega}
                                    onChange={handleChange}
                                />
                            </div>


                        </>
                    )}


                    <div className={styles.fincompra_formulario_02}>

                        <CampoForm
                            label="Aclaraciones (opcional)"
                            name="aclaraciones"
                            ancho="100%"
                            value={form.aclaraciones}
                            onChange={handleChange}
                            type="textarea"
                        />

                    </div>

                    <div className={styles.finCompra__boton}>
                        <Boton
                            ancho="65%"
                            type="submit"
                            label="Confirmar"
                        />
                    </div>

                </form>
            </section>
        </section>

    );
}

export default FinCompra;
