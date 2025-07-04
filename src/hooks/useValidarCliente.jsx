export function useValidarCliente() {
    const validar = (cliente) => {
        const errores = {};

        if (!cliente.nombre || cliente.nombre.trim() === "") {
            errores.nombre = "El nombre es obligatorio.";
        }

        const tieneWhatsapp = cliente.whatsapp && cliente.whatsapp.trim() !== "";
        const tieneAlternativo = cliente.nro_alternativo && cliente.nro_alternativo.trim() !== "";
        if (!tieneWhatsapp && !tieneAlternativo) {
            errores.telefonos = "Debés ingresar al menos un número de contacto.";
        }

        if (cliente.envio_a_domicilio) {
            if (!cliente.departamento || cliente.departamento.trim() === "") {
                errores.departamento = "La departamento es obligatoria si el envío es a domicilio.";
            }
            if (!cliente.distrito || cliente.distrito.trim() === "") {
                errores.distrito = "El distrito es obligatorio.";
            }
            if (!cliente.calle || cliente.calle.trim() === "") {
                errores.calle = "La calle es obligatoria.";
            }
            if (!cliente.numero_calle || cliente.numero_calle.toString().trim() === "") {
                errores.numero_calle = "El número de calle es obligatorio.";
            }
        }

        const esValido = Object.keys(errores).length === 0;

        return { esValido, errores };
    };

    return { validar };
}