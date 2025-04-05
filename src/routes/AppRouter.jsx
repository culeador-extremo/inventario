import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Productos from '../pages/Productos';
import Proveedores from '../pages/Proveedores';
import Usuarios from '../pages/Usuarios';
import Ventas from '../pages/Ventas';
import RegistroVentas from '../pages/RegistroVentas'; 

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/proveedores" element={<Proveedores />} />
                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/ventas" element={<Ventas />} /> 
                <Route path="/ventas-realizadas" element={<RegistroVentas />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
