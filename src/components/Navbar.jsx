import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleLogout = () => {
        setIsAuthenticated(false);
        navigate("/login");
    };

    const handleMenuItemClick = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link className="navbar-brand" to="/">StockMaster</Link>

                {isMobile && (
                    <>
                        <input type="checkbox" id="checkbox" checked={menuOpen} onChange={() => setMenuOpen(!menuOpen)} />
                        <label htmlFor="checkbox" className="toggle">
                            <div className="bars" id="bar1"></div>
                            <div className="bars" id="bar2"></div>
                        </label>
                    </>
                )}

                <ul className={`navbar-menu ${menuOpen || !isMobile ? 'active' : ''}`}>
                    <li className="nav-item">
                        <Link className="nav-link" to="/" onClick={handleMenuItemClick}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/ventas" onClick={handleMenuItemClick}>Registrar Venta</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/ventas-realizadas" onClick={handleMenuItemClick}>Historial de Ventas</Link>
                    </li>

                    {isAuthenticated ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/productos" onClick={handleMenuItemClick}>Gestión de Productos</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/proveedores" onClick={handleMenuItemClick}>Proveedores</Link>
                            </li>
                            <li className="nav-item">
                                <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
                            </li>
                        </>
                    ) : (
                        <li className="nav-item">
                            <Link className="nav-link" to="/login" onClick={handleMenuItemClick}>Admin Login</Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
