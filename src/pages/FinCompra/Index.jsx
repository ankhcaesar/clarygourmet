import styles from "./FinCompra.module.css";
import Cabecera from "../../components/Cabecera/Index";
import Boton from "../../components/Boton/Index";
import { useState } from "react";
import { useGuardarClienteYEntrega } from "../../hooks/useGuardarClienteYEntrega";
import { useValidarCliente } from "../../hooks/useValidarCliente";
import CampoForm from "../../components/CampoForm/Index";

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
        aclaraciones: "",
    });

    const [errores, setErrores] = useState({});
    const { guardar } = useGuardarClienteYEntrega();
    const { validar } = useValidarCliente();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { esValido, errores } = validar(form);
        if (!esValido) {
            setErrores(errores);
            return;
        }

        const { envio_a_domicilio, aclaraciones, ...datosCliente } = form;

        guardar({
            cliente: datosCliente,
            entrega: {
                envio_a_domicilio,
                aclaraciones,
            },
        });
    };

    return (
        <section className={styles.finCompra}>
            <Cabecera
                titulo="Datos del envío"
                origen="carrito"
            />

            <section className={styles.finCompra__principal}>


                <div className={styles.finCompra__titulo}>
                    <h2>Complete los datos para el envio</h2>
                </div>


                <form className={styles.finCompra__formulario} onSubmit={handleSubmit}>
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
                        </>
                    )}
                    <div className={styles.fincompra_formulario_01}>

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
