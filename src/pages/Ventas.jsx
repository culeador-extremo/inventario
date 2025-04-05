import React, { useState, useEffect } from 'react';

const Ventas = () => {
    const [productos, setProductos] = useState([]);
    const [productosVenta, setProductosVenta] = useState([]);
    const [totalVenta, setTotalVenta] = useState(0);
    const [metodoPago, setMetodoPago] = useState('');
    const [productoBuscado, setProductoBuscado] = useState('');
    const [ticket, setTicket] = useState('');

    useEffect(() => {
        const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
        setProductos(productosGuardados);
    }, []);

    useEffect(() => {
        localStorage.setItem('productosVenta', JSON.stringify(productosVenta));
        localStorage.setItem('totalVenta', JSON.stringify(totalVenta));
        localStorage.setItem('metodoPago', JSON.stringify(metodoPago));
    }, [productosVenta, totalVenta, metodoPago]);

    const agregarProducto = (producto) => {
        if (producto.cantidad <= 0) {
            alert('No hay suficiente stock de este producto.');
            return;
        }

        const productoExistente = productosVenta.find(p => p.id === producto.id);

        if (productoExistente) {
            const productosActualizados = productosVenta.map(p =>
                p.id === producto.id ? { ...p, cantidad: p.cantidad + 1, total: p.precio * (p.cantidad + 1) } : p
            );
            setProductosVenta(productosActualizados);
        } else {
            const nuevoProducto = {
                ...producto,
                cantidad: 1,
                total: producto.precio,
            };
            setProductosVenta([...productosVenta, nuevoProducto]);
        }

        const productosActualizados = productos.map(p =>
            p.id === producto.id ? { ...p, cantidad: p.cantidad - 1 } : p
        );
        setProductos(productosActualizados);
        setTotalVenta(totalVenta + producto.precio);
    };

    const buscarProducto = () => {
        return productos.filter(producto =>
            producto.nombre.toLowerCase().includes(productoBuscado.toLowerCase())
        );
    };

    const generarTicket = () => {
        if (productosVenta.length === 0) {
            alert("No hay productos en la venta.");
            return;
        }

        let contenidoTicket = "🛒 **Ticket de Compra** 🛒\n\n";
        contenidoTicket += productosVenta.map(p => `${p.nombre} x${p.cantidad} - $${p.total}`).join("\n");
        contenidoTicket += `\n\n💰 **Total: $${totalVenta}**`;
        contenidoTicket += `\n💳 Método de Pago: ${metodoPago || "No seleccionado"}`;
        setTicket(contenidoTicket);
    };

    const finalizarVenta = () => {
        if (productosVenta.length === 0 || !metodoPago) {
            alert('Debe agregar productos y seleccionar un método de pago.');
            return;
        }

        generarTicket();

        setTimeout(() => {
            alert(`Venta finalizada. Total: $${totalVenta} | Método de pago: ${metodoPago}`);

            const ventasPrevias = JSON.parse(localStorage.getItem('registroVentas')) || [];
            const nuevaVenta = {
                fecha: new Date().toISOString().split('T')[0],
                productos: productosVenta,
                total: totalVenta,
                metodoPago,
            };
            const ventasActualizadas = [...ventasPrevias, nuevaVenta];
            localStorage.setItem('registroVentas', JSON.stringify(ventasActualizadas));

            localStorage.setItem('productos', JSON.stringify(productos));

            setProductosVenta([]);
            setTotalVenta(0);
            setMetodoPago('');
        }, 500);
    };

    return (
        <div className="ventas-container">
            <h1>Registrar Venta</h1>

            <div className="busqueda-productos">
                <input
                    type="text"
                    placeholder="Buscar producto..."
                    value={productoBuscado}
                    onChange={e => setProductoBuscado(e.target.value)}
                />
                <div className="productos-buscados">
                    {buscarProducto().map(producto => (
                        <div key={producto.id} className="producto-item">
                            <span>{producto.nombre}</span>
                            <span>${producto.precio}</span>
                            <span>Stock: {producto.cantidad}</span>
                            <button onClick={() => agregarProducto(producto)}>Agregar</button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="lista-productos">
                <h2>Productos en la Venta</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productosVenta.map((producto, index) => (
                            <tr key={index}>
                                <td>{producto.nombre}</td>
                                <td>{producto.cantidad}</td>
                                <td>${producto.precio}</td>
                                <td>${producto.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="metodo-pago">
                <h2>Método de Pago</h2>
                <select onChange={(e) => setMetodoPago(e.target.value)} value={metodoPago}>
                    <option value="">Seleccione un método</option>
                    <option value="efectivo">Efectivo</option>
                    <option value="tarjeta">Tarjeta</option>
                </select>
            </div>

            <div className="total-venta">
                <h3>Total: ${totalVenta}</h3>
            </div>

            <div className="acciones">
                <button onClick={finalizarVenta}>Finalizar Venta</button>
            </div>

            {ticket && (
                <div className="ticket">
                    <h2>Ticket de Compra</h2>
                    <pre>{ticket}</pre>
                </div>
            )}
        </div>
    );
};

export default Ventas;
