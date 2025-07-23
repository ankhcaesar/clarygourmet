import { createContext, useContext, useState, useEffect } from "react"

const CargaContext = createContext()

export function CargaProvider({ children }) {
    const [total, setTotal] = useState(0)
    const [cargadas, setCargadas] = useState(0)
    const [online, setOnline] = useState(navigator.onLine)

    // Escuchamos estado online/offline
    useEffect(() => {
        const handleOnline = () => setOnline(true)
        const handleOffline = () => setOnline(false)

        window.addEventListener("online", handleOnline)
        window.addEventListener("offline", handleOffline)

        return () => {
            window.removeEventListener("online", handleOnline)
            window.removeEventListener("offline", handleOffline)
        }
    }, [])

    const porcentaje = total > 0 ? (cargadas / total) * 100 : 0

    const registrarCarga = (cant = 1) => {
        setCargadas((prev) => Math.min(prev + cant, total))
    }

    const reiniciarCarga = (nuevaTotal) => {
        setTotal(nuevaTotal)
        setCargadas(0)
    }

    return (
        <CargaContext.Provider value={{
            total,
            cargadas,
            porcentaje,
            online,
            registrarCarga,
            reiniciarCarga
        }}>
            {children}
        </CargaContext.Provider>
    )
}

export function useCargaGlobal() {
    return useContext(CargaContext)
}
