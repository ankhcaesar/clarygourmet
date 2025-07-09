export function useValidarCliente() {
    const validar = (cliente) => {
        const errores = {};

        // --- Validacion Nombre ---
        if (cliente.nombre && cliente.nombre.trim().length < 3) {
            errores.nombre = "El nombre debe tener al menos 3 caracteres.";
        }

        // Validacion numero de contacto
        const tieneWhatsapp = cliente.whatsapp && cliente.whatsapp.trim() !== "";
        const tieneAlternativo = cliente.nro_alternativo && cliente.nro_alternativo.trim() !== "";
        const phoneRegex = /^\d+$/; // Expresión regular para solo dígitos

        if (!tieneWhatsapp && !tieneAlternativo) {
            errores.whatsapp = "Ingresa al menos un número.";
        } else {
            if (tieneWhatsapp) {
                if (!phoneRegex.test(cliente.whatsapp.trim())) {
                    errores.whatsapp = "Solo debe contener dígitos.";
                }
                if (cliente.whatsapp.trim().length < 9) {
                    // Esta validación complementa minLength de HTML5
                    errores.whatsapp = "Ingresa al menos 9 dígitos.";
                }
            }

            if (tieneAlternativo) {
                if (!phoneRegex.test(cliente.nro_alternativo.trim())) {
                    errores.nro_alternativo = "Solo debe contener dígitos.";
                }
                if (cliente.nro_alternativo.trim().length < 9) {
                    // Esta validación complementa minLength de HTML5
                    errores.nro_alternativo = "Ingresa al menos 9 dígitos.";
                }
            }
            if (tieneWhatsapp && tieneAlternativo && cliente.whatsapp.trim() === cliente.nro_alternativo.trim()) {
                errores.telefonos = "Los números no pueden ser iguales.";
            }
        }

        //Validacion Datos del envio condicional
        if (cliente.envio_a_domicilio) {
            if (!cliente.departamento || cliente.departamento.trim() === "") {
                errores.departamento = "El departamento es obligatorio.";
            }

            if (!cliente.calle || cliente.calle.trim() === "") {
                errores.calle = "La calle es obligatoria.";
            }
            if (!cliente.numero_calle || cliente.numero_calle.trim() === "") {
                errores.numero_calle = "El número de calle es obligatorio.";
            }

            // Validacion fecha 
            if (!cliente.fecha_hora_entrega) {
                errores.fecha_hora_entrega = "La fecha y hora es obligatoria.";
            } else {
                const fechaEntrega = new Date(cliente.fecha_hora_entrega);
                const ahora = new Date();
               //Normalizar la fecha
                ahora.setHours(0, 0, 0, 0);
                fechaEntrega.setHours(0, 0, 0, 0);

                if (fechaEntrega < ahora) {
                    errores.fecha_hora_entrega = "La fecha no puede ser anterior a la actual.";
                }
            }
        }

        const esValido = Object.keys(errores).length === 0;

        return { esValido, errores };
    };

    return { validar };
}
