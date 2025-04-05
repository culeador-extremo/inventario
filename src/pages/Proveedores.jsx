import React, { useState, useEffect } from 'react';

const Proveedores = () => {
    const [proveedores, setProveedores] = useState([]);
    const [nuevoProveedor, setNuevoProveedor] = useState({
        nombre: '',
        contacto: '',
        direccion: '',
        productos: ''
    });
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        const proveedoresGuardados = JSON.parse(localStorage.getItem('proveedores')) || [];
        const pedidosGuardados = JSON.parse(localStorage.getItem('pedidos')) || [];
        setProveedores(proveedoresGuardados);
        setPedidos(pedidosGuardados);
    }, []);

    const agregarProveedor = () => {
        if (!nuevoProveedor.nombre || !nuevoProveedor.contacto || !nuevoProveedor.direccion || !nuevoProveedor.productos) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        const listaActualizada = [...proveedores, nuevoProveedor];
        setProveedores(listaActualizada);
        localStorage.setItem('proveedores', JSON.stringify(listaActualizada));

        setNuevoProveedor({ nombre: '', contacto: '', direccion: '', productos: '' });
    };

    const registrarPedido = (proveedorNombre) => {
        const fechaPedido = new Date().toISOString().split('T')[0];
        const nuevoPedido = { proveedor: proveedorNombre, fechaPedido, fechaRecepcion: '' };

        const listaActualizada = [...pedidos, nuevoPedido];
        setPedidos(listaActualizada);
        localStorage.setItem('pedidos', JSON.stringify(listaActualizada));
    };

    const recibirPedido = (index) => {
        const fechaRecepcion = new Date().toISOString().split('T')[0];
        const pedidosActualizados = [...pedidos];
        pedidosActualizados[index].fechaRecepcion = fechaRecepcion;

        setPedidos(pedidosActualizados);
        localStorage.setItem('pedidos', JSON.stringify(pedidosActualizados));
    };

    return (
        <div className="gestion-proveedores">
            <h1>Gestión de Proveedores</h1>

            <div className="formulario-proveedor">
                <h2>Añadir Proveedor</h2>
                <input type="text" placeholder="Nombre" value={nuevoProveedor.nombre} onChange={e => setNuevoProveedor({ ...nuevoProveedor, nombre: e.target.value })} />
                <input type="text" placeholder="Contacto" value={nuevoProveedor.contacto} onChange={e => setNuevoProveedor({ ...nuevoProveedor, contacto: e.target.value })} />
                <input type="text" placeholder="Dirección" value={nuevoProveedor.direccion} onChange={e => setNuevoProveedor({ ...nuevoProveedor, direccion: e.target.value })} />
                <input type="text" placeholder="Productos suministrados" value={nuevoProveedor.productos} onChange={e => setNuevoProveedor({ ...nuevoProveedor, productos: e.target.value })} />
                <button onClick={agregarProveedor}>Agregar Proveedor</button>
            </div>

            <h2>Lista de Proveedores</h2>
            <table className="tabla-proveedores">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Contacto</th>
                        <th>Dirección</th>
                        <th>Productos</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {proveedores.length > 0 ? (
                        proveedores.map((proveedor, index) => (
                            <tr key={index}>
                                <td>{proveedor.nombre}</td>
                                <td>{proveedor.contacto}</td>
                                <td>{proveedor.direccion}</td>
                                <td>{proveedor.productos}</td>
                                <td><button onClick={() => registrarPedido(proveedor.nombre)}>Registrar Pedido</button></td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No hay proveedores registrados.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <h2>Registro de Pedidos</h2>
            <table className="tabla-pedidos">
                <thead>
                    <tr>
                        <th>Proveedor</th>
                        <th>Fecha de Pedido</th>
                        <th>Fecha de Recepción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.length > 0 ? (
                        pedidos.map((pedido, index) => (
                            <tr key={index}>
                                <td>{pedido.proveedor}</td>
                                <td>{pedido.fechaPedido}</td>
                                <td>{pedido.fechaRecepcion || 'Pendiente'}</td>
                                <td>
                                    {!pedido.fechaRecepcion && <button onClick={() => recibirPedido(index)}>Marcar como Recibido</button>}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No hay pedidos registrados.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Proveedores;
