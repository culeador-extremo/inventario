import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [productosBajoStock, setProductosBajoStock] = useState([]);
    const [ultimasVentas, setUltimasVentas] = useState([]);
    const [productosMasVendidos, setProductosMasVendidos] = useState([]);

    useEffect(() => {
        const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
        const ventasGuardadas = JSON.parse(localStorage.getItem('registroVentas')) || [];

        const productosBajoStock = productosGuardados.filter(producto => producto.cantidad < 5);
        setProductosBajoStock(productosBajoStock);

        const ultimasVentas = ventasGuardadas.slice(-3).reverse();
        setUltimasVentas(ultimasVentas);

        const contadorProductos = {};
        ventasGuardadas.forEach(venta => {
            venta.productos.forEach(producto => {
                if (contadorProductos[producto.nombre]) {
                    contadorProductos[producto.nombre] += producto.cantidad;
                } else {
                    contadorProductos[producto.nombre] = producto.cantidad;
                }
            });
        });

        const productosOrdenados = Object.entries(contadorProductos)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([nombre, cantidad]) => ({ nombre, cantidad }));

        setProductosMasVendidos(productosOrdenados);
    }, []);

    return (
        <div className="home-container">
            <div className="home-header">
                <img
                    src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png"
                    alt="Logo "
                    className="logo"
                />
                <h1>Bienvenido a Mi Tienda</h1>
            </div>

            {/* Accesos Rápidos */}
            <div className="quick-access">
                <Link to="/ventas" className="btn-quick">Agregar Venta</Link>
                <Link to="/productos" className="btn-quick">Añadir Producto</Link>
            </div>

            {/* Sección de Alertas */}
            <div className="alerts">
                <div className="alert-item">
                    <h3>Productos con Bajo Stock</h3>
                    {productosBajoStock.length > 0 ? (
                        <ul>
                            {productosBajoStock.map(producto => (
                                <li key={producto.id}>{producto.nombre} - {producto.cantidad} unidades</li>
                            ))}
                        </ul>
                    ) : (
                        <p>Todo en orden, no hay productos con bajo stock.</p>
                    )}
                </div>

                <div className="alert-item">
                    <h3>Últimas Ventas</h3>
                    {ultimasVentas.length > 0 ? (
                        <ul>
                            {ultimasVentas.map((venta, index) => (
                                <li key={index}>
                                    Venta realizada el {venta.fecha}, Total: ${venta.total}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No hay ventas recientes.</p>
                    )}
                </div>

                <div className="alert-item">
                    <h3>Productos Más Vendidos</h3>
                    {productosMasVendidos.length > 0 ? (
                        <ul>
                            {productosMasVendidos.map((producto, index) => (
                                <li key={index}>{producto.nombre} - {producto.cantidad} vendidos</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No hay productos vendidos aún.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;