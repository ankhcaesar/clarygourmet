import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

import Inicial from "./src/pages/Inicial/Index"
import E404 from "./src/pages/E404/Index"

import Categorias from "./src/pages/Categorias/Index"
import Filtrado from "./src/pages/Filtrado/Index"
import Carrito from "./src/pages/Carrito/Index"
import FinCompra from "./src/pages/FinCompra/Index"
import CarritoCerrado from "./src/pages/CarritoCerrado/Index"

import LayoutApp from "./src/components/LayoutApp/Index";

function AppRoute() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Inicial/>} />
                <Route path="*" element={<E404 />} />
                
                <Route element={<LayoutApp />}>
                    <Route path="/Categorias" element={<Categorias />} />
                    <Route path="/Filtrado" element={<Filtrado />} />
                    <Route path="/Carrito" element={<Carrito />} />
                    <Route path="/FinCompra" element={<FinCompra />} />
                    <Route path="/CarritoCerrado" element={<CarritoCerrado />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoute