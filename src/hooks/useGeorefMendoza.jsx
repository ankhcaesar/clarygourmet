import { useState, useEffect } from "react";
const API_BASE = "https://apis.datos.gob.ar/georef/api";

export function useGeorefMendoza() {
    const [departamentos, setDepartamentos] = useState([]);
    const [distritos, setDistritos] = useState([]);
    const [calles, setCalles] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    // Departamentos habilitados
    useEffect(() => {
        (async () => {
            try {
                setCargando(true);
                const res = await fetch(`${API_BASE}/departamentos?provincia=mendoza&campos=nombre&max=100`);
                const { departamentos: data } = await res.json();
                const ALLOWED = ["Capital", "Godoy Cruz", "Guaymallén", "Las Heras", "Luján de Cuyo", "Maipú"];
                const filtrados = data.map(d => d.nombre).filter(nombre => ALLOWED.includes(nombre)).sort();
                setDepartamentos(filtrados);
            } catch (e) {
                setError(e);
            } finally {
                setCargando(false);
            }
        })();
    }, []);

    // Cargar distritos según departamento
    const loadDistritos = async (departamentoNombre) => {
        try {
            setCargando(true);
            setDistritos([]);
            const res = await fetch(
                `${API_BASE}/localidades?provincia=mendoza&departamento=${encodeURIComponent(departamentoNombre)}&campos=nombre&max=100`
            );
            const { localidades } = await res.json();
            setDistritos(localidades.map(l => l.nombre).sort());
        } catch (e) {
            setError(e);
        } finally {
            setCargando(false);
        }
    };

    // Buscar calles filtradas por nombre parcial y localidad (distrito)
    
    const buscarCalles = async (departamentoNombre, calleParcial) => {
    
        if (!departamentoNombre || calleParcial.length < 3) {
            setCalles([]);
            return [];
        }

        try {
            setCargando(true);
    const res = await fetch(`${API_BASE}/calles?provincia=mendoza&departamento=${encodeURIComponent(departamentoNombre)}&nombre=${encodeURIComponent(calleParcial)}&max=20`);
    const { calles: data } = await res.json();
    const callesConId = data.map(c => ({ nombre: c.nombre, id: c.id })); // Guarda nombre + ID
    setCalles(callesConId);
    return callesConId;
        } catch (e) {
            setError(e);
            return [];
        } finally {
            setCargando(false);
        }
    };

    return {
        departamentos,
        distritos,
        calles,
        loadDistritos,
        buscarCalles,
        cargando,
        error
    };
}
