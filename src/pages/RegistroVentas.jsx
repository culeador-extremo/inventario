import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const RegistroVentas = () => {
    const [ventas, setVentas] = useState([]);
    const [ventasFiltradas, setVentasFiltradas] = useState([]);
    const [filtroFecha, setFiltroFecha] = useState('');
    const [filtroProducto, setFiltroProducto] = useState('');

    useEffect(() => {
        const ventasGuardadas = JSON.parse(localStorage.getItem('registroVentas')) || [];
        setVentas(ventasGuardadas);
        setVentasFiltradas(ventasGuardadas);
    }, []);

    useEffect(() => {
        let ventasFiltradas = ventas;

        if (filtroFecha) {
            ventasFiltradas = ventasFiltradas.filter(venta => venta.fecha === filtroFecha);
        }

        if (filtroProducto) {
            ventasFiltradas = ventasFiltradas.filter(venta =>
                venta.productos.some(prod => prod.nombre.toLowerCase().includes(filtroProducto.toLowerCase()))
            );
        }

        setVentasFiltradas(ventasFiltradas);
    }, [filtroFecha, filtroProducto, ventas]);

    useEffect(() => {
        const canvas = document.getElementById('ventasChart');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (window.ventasChartInstance) {
                window.ventasChartInstance.destroy();
            }

            const ventasPorFecha = ventas.reduce((acc, venta) => {
                acc[venta.fecha] = (acc[venta.fecha] || 0) + venta.total;
                return acc;
            }, {});

            const labels = Object.keys(ventasPorFecha);
            const data = Object.values(ventasPorFecha);

            window.ventasChartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels,
                    datasets: [{
                        label: 'Ventas ($)',
                        data,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: { beginAtZero: true }
                    }
                }
            });
        }
    }, [ventas]);

    return (
        <div className="registro-ventas">
            <h1>Registro de Ventas</h1>

            <div className="filtros">
                <input
                    type="date"
                    value={filtroFecha}
                    onChange={e => setFiltroFecha(e.target.value)}
                    placeholder="Filtrar por fecha"
                />
                <input
                    type="text"
                    value={filtroProducto}
                    onChange={e => setFiltroProducto(e.target.value)}
                    placeholder="Filtrar por producto"
                />
            </div>

            <table className="tabla-ventas">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Productos</th>
                        <th>Total</th>
                        <th>Método de Pago</th>
                    </tr>
                </thead>
                <tbody>
                    {ventasFiltradas.length > 0 ? (
                        ventasFiltradas.map((venta, index) => (
                            <tr key={index}>
                                <td>{venta.fecha}</td>
                                <td>
                                    {venta.productos.map((p, i) => (
                                        <div key={i}>{p.nombre} x{p.cantidad}</div>
                                    ))}
                                </td>
                                <td>${venta.total}</td>
                                <td>{venta.metodoPago}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No hay ventas registradas.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="grafico">
                <h2>Ventas por Fecha</h2>
                <canvas id="ventasChart"></canvas>
            </div>
        </div>
    );
};

export default RegistroVentas;