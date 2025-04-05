import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Proveedores from './pages/Proveedores';
import Usuarios from './pages/Usuarios';
import Ventas from './pages/Ventas';
import RegistroVentas from './pages/RegistroVentas';
import Login from './pages/Login';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAdmin") === "true");

  useEffect(() => {
    localStorage.setItem("isAdmin", isAuthenticated ? "true" : "false");
  }, [isAuthenticated]);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <div className="app-content" style={{ paddingTop: '70px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/ventas-realizadas" element={<RegistroVentas />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

          {/* Rutas protegidas solo para el Admin */}
          {isAuthenticated ? (
            <>
              <Route path="/productos" element={<Productos />} />
              <Route path="/proveedores" element={<Proveedores />} />
              <Route path="/usuarios" element={<Usuarios />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
