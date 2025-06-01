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
            <Cabecera titulo="Datos del envío" origen="carrito" />

            <form className={styles.finCompra__principal} onSubmit={handleSubmit}>
                
                <CampoForm
                    label="Nombre"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    error={errores.nombre}
                />
                <CampoForm
                    label="WhatsApp"
                    name="whatsapp"
                    value={form.whatsapp}
                    onChange={handleChange}
                />
                <CampoForm
                    label="Número alternativo"
                    name="nro_alternativo"
                    value={form.nro_alternativo}
                    onChange={handleChange}
                    error={errores.telefonos}
                />

                <CampoForm
                    label="Envío a domicilio"
                    name="envio_a_domicilio"
                    type="checkbox"
                    checked={form.envio_a_domicilio}
                    onChange={handleChange}
                />

                {form.envio_a_domicilio && (
                    <>
                        <CampoForm
                            label="Ciudad"
                            name="ciudad"
                            value={form.ciudad}
                            onChange={handleChange}
                            error={errores.ciudad}
                            ancho="80%"
                        />
                        <CampoForm
                            label="Barrio"
                            name="barrio"
                            value={form.barrio}
                            onChange={handleChange}
                            error={errores.barrio}
                        />
                        <CampoForm
                            label="Calle"
                            name="calle"
                            value={form.calle}
                            onChange={handleChange}
                            error={errores.calle}
                        />
                        <CampoForm
                            label="Número de calle"
                            name="numero_calle"
                            value={form.numero_calle}
                            onChange={handleChange}
                            error={errores.numero_calle}
                        />
                        <CampoForm
                            label="Piso"
                            name="piso"
                            value={form.piso}
                            onChange={handleChange}
                        />
                        <CampoForm
                            label="Departamento"
                            name="depto"
                            value={form.depto}
                            onChange={handleChange}
                        />
                    </>
                )}

                <CampoForm
                    label="Aclaraciones (opcional)"
                    name="aclaraciones"
                    value={form.aclaraciones}
                    onChange={handleChange}
                    type="textarea"
                />

                <div className={styles.finCompra__boton}>
                    <Boton ancho="100%" type="submit" label="Confirmar" />
                </div>
            </form>
        </section>
    );
}

function CampoTexto({ label, name, value, onChange, error, ancho }) {
    return (
        <label style={{ width: { ancho }, marginBottom: "0.75rem" }}>
            {label}
            <input
                type="text"
                name={name}
                value={value}
                onChange={onChange}
                style={{ width: "100%", padding: "0.4rem", marginTop: "0.2rem" }}
            />
            {error && (
                <div style={{ color: "red", fontSize: "0.8rem", marginTop: "0.2rem" }}>
                    {error}
                </div>
            )}
        </label>
    );
}

export default FinCompra;
