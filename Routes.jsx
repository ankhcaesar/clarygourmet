import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import Inicial from "./src/pages/Inicial/Index"
import E404 from "./src/pages/E404/Index"
import Categorias from "./src/pages/Categorias/Index"

import FinCompra from "./src/pages/FinCompra/Index"
import RsmCompra from "./src/pages/RsmCompra/Index"
import CarritoCerrado from "./src/pages/CarritoCerrado/Index"

import LayoutApp from "./src/components/LayoutApp/Index";

import { useEffect } from "react";

const Carrito = lazy(() => import("./src/pages/Carrito/Index"));
const Filtrado = lazy(() => import("./src/pages/Filtrado/Index"));

function AppRoute() {
    useEffect(() => {
        const handleContextMenu = (e) => {
            e.preventDefault();
        };
        document.addEventListener("contextmenu", handleContextMenu);
        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    }, []);
    
    return (
        <BrowserRouter>
            <Suspense fallback={null}>
                <Routes>
                    <Route element={<LayoutApp />}>
                        <Route index element={<Inicial />} />
                        <Route path="*" element={<E404 />} />
                        <Route path="/Categorias" element={<Categorias />} />
                        <Route path="/Filtrado" element={<Filtrado />} />
                        <Route path="/Carrito" element={<Carrito />} />
                        <Route path="/FinCompra" element={<FinCompra />} />
                        <Route path="/RsmCompra" element={<RsmCompra />} />
                        <Route path="/CarritoCerrado" element={<CarritoCerrado />} />

                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default AppRoute