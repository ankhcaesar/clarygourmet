import styles from "./FinCompra.module.css";
import Boton from "../../components/Boton/Index";
import CampoForm from "../../components/CampoForm/Index";
import { useDebounce } from "use-debounce";
import { useState, useContext, useEffect } from "react";
import { useGuardarDatosEnvio } from "../../hooks/useGuardarDatosEnvio"
import { useValidarCliente } from "../../hooks/useValidarCliente";
import { useGeorefMendoza } from "../../hooks/useGeorefMendoza"
import { GlobalContext } from "../../context/GlobalContext";
import db from "../../db/db"

function FinCompra() {


    const [form, setForm] = useState({
        nombre: "",
        whatsapp: "",
        nro_alternativo: "",
        departamento: "",
        distrito: "",
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
    const { departamentos, distritos, calles, loadDistritos, buscarCalles } = useGeorefMendoza();
    const [errores, setErrores] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // Cuando cambia departamento, cargar distritos
    useEffect(() => {
        if (form.departamento) loadDistritos(form.departamento);
    }, [form.departamento]);

    const [debouncedCalle] = useDebounce(form.calle, 300);

    // Buscar calles cuando cambia texto, y ya hay depto + distrito
    useEffect(() => {
        if (form.departamento && debouncedCalle.length >= 3) {
            buscarCalles(form.departamento, debouncedCalle);
        }
    }, [debouncedCalle, form.departamento]);


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


            <section className={styles.finCompra__principal}>

                <form className={styles.finCompra__formulario} onSubmit={handleSubmit}>

                    <h3 className={styles.finCompra__titulo}>Datos del cliente</h3>
                    <div className={styles.fincompra_formulario_01}>
                        <CampoForm
                            label="Nombre"
                            name="nombre"
                            type="text"
                            ancho="80%"
                            minLength="3"
                            required
                            value={form.nombre}
                            onChange={handleChange}
                            title="Debe ingresar su nombre"
                            error={errores.nombre}
                        />
                    </div>
                    <div className={styles.fincompra_formulario_02}>
                        <CampoForm
                            label="WhatsApp"
                            name="whatsapp"
                            type="tel"
                            ancho="35%"
                            minLength="9"
                            value={form.whatsapp}
                            onChange={handleChange}
                            title="Debe ingresar numeros"
                            error={errores.whatsapp}
                        />
                        <CampoForm
                            label="Número alternativo"
                            name="nro_alternativo"
                            type="tel"
                            ancho="35%"
                            minLength="9"
                            value={form.nro_alternativo}
                            onChange={handleChange}
                            error={errores.nro_alternativo}
                            title="Debe ingresar numeros"

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
                            title="Error"
                            error={errores.envio_a_domicilio}
                        />
                    </div>

                    {form.envio_a_domicilio && (
                        <>
                            <h3 className={styles.finCompra__titulo}>Datos del envio</h3>
                            <div className={styles.fincompra_formulario_02}>
                                <CampoForm
                                    label="departamento"
                                    name="departamento"
                                    type="select"
                                    ancho="35%"
                                    required
                                    value={form.departamento}
                                    onChange={handleChange}
                                    title="no debe estar vacio"
                                    error={errores.departamento}
                                    options={departamentos}
                                />
                                <CampoForm
                                    label="distrito"
                                    name="distrito"
                                    type="select"
                                    ancho="35%"
                                    value={form.distrito}
                                    onChange={handleChange}
                                    title="error"
                                    error={errores.distrito}
                                    options={distritos}
                                />
                            </div>

                            <div className={styles.fincompra_formulario_01}>

                                <CampoForm
                                    label="Calle"
                                    name="calle"
                                    type="autocomplete"
                                    ancho="80%"
                                    required
                                    value={form.calle}
                                    onChange={handleChange}
                                    title="no debe estar vacio"
                                    error={errores.calle}
                                    options={calles}
                                />

                            </div>

                            <div className={styles.fincompra_formulario_02}>
                                <CampoForm
                                    label="Número"
                                    name="numero_calle"
                                    type="number"
                                    ancho="25%"
                                    value={form.numero_calle}
                                    onChange={handleChange}
                                    title="debe ser numero"
                                    error={errores.numero_calle}
                                />
                                <CampoForm
                                    label="Piso"
                                    name="piso"
                                    type="number"
                                    ancho="15%"
                                    value={form.piso}
                                    onChange={handleChange}
                                    title="debe ser numero"
                                    error={errores.piso}
                                />
                                <CampoForm
                                    label="Depto"
                                    name="depto"
                                    type="text"
                                    ancho="15%"
                                    value={form.depto}
                                    onChange={handleChange}
                                    title="error"
                                />
                            </div>

                            <h3 className={styles.finCompra__titulo}>Dia y hora de entrega</h3>
                            <div className={styles.fincompra_formulario_01}>


                                <CampoForm
                                    label="Fecha y hora de entrega"
                                    name="fecha_hora_entrega"
                                    type="datetime-local"
                                    ancho="60%"
                                    value={form.fecha_hora_entrega}
                                    onChange={handleChange}
                                    title="error"
                                    error={errores.fecha_hora_entrega}
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
                            ancho="35%"
                            type="submit"
                            label="Confirmar"
                        />
                        <Boton
                            ancho="35%"
                            type="reset"
                            label="Limpiar"
                        />
                    </div>

                </form>
            </section>
        </section>

    );
}

export default FinCompra;
