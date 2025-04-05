import React, { useState, useEffect } from 'react';

const Productos = () => {
    const productosIniciales = [
        { id: 1, codigo: 'P001', nombre: 'Arroz', precio: 20, cantidad: 10, proveedor: 'Proveedor A', categoria: 'Alimentos' },
        { id: 2, codigo: 'P002', nombre: 'Frijoles', precio: 15, cantidad: 8, proveedor: 'Proveedor B', categoria: 'Alimentos' },
        { id: 3, codigo: 'P003', nombre: 'Aceite', precio: 30, cantidad: 5, proveedor: 'Proveedor C', categoria: 'Abarrotes' },
    ];

    const [productos, setProductos] = useState(() => {
        const productosGuardados = localStorage.getItem('productos');
        if (productosGuardados) {
            return JSON.parse(productosGuardados);
        } else {
            localStorage.setItem('productos', JSON.stringify(productosIniciales));
            return productosIniciales;
        }
    });

    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: '',
        precio: '',
        cantidad: '',
        proveedor: '',
        categoria: '',
    });

    const [productoEditando, setProductoEditando] = useState(null);

    useEffect(() => {
        localStorage.setItem('productos', JSON.stringify(productos));
    }, [productos]);

    const generarCodigo = () => {
        return 'P' + Date.now();
    };

    const agregarProducto = () => {
        if (Object.values(nuevoProducto).some(val => !val)) {
            alert('Por favor, complete todos los campos');
            return;
        }

        const producto = {
            ...nuevoProducto,
            id: Date.now(),
            codigo: generarCodigo(),
            cantidad: Number(nuevoProducto.cantidad),
            precio: Number(nuevoProducto.precio),
        };

        const nuevosProductos = [...productos, producto];
        setProductos(nuevosProductos);

        setNuevoProducto({
            nombre: '',
            precio: '',
            cantidad: '',
            proveedor: '',
            categoria: '',
        });
    };

    const editarProducto = (producto) => {
        const nuevosDatos = { ...producto };

        nuevosDatos.nombre = prompt('Nuevo nombre:', producto.nombre) || producto.nombre;
        nuevosDatos.precio = Number(prompt('Nuevo precio:', producto.precio)) || producto.precio;
        nuevosDatos.cantidad = Number(prompt('Nueva cantidad:', producto.cantidad)) || producto.cantidad;
        nuevosDatos.proveedor = prompt('Nuevo proveedor:', producto.proveedor) || producto.proveedor;
        nuevosDatos.categoria = prompt('Nueva categoría:', producto.categoria) || producto.categoria;

        setProductos(productos.map(p => (p.id === producto.id ? nuevosDatos : p)));
    };

    return (
        <div className="productos-container">
            <h1>Gestión de Productos</h1>
            <div className="formulario-producto">
                <h2>Añadir Producto</h2>
                <input
                    type="text"
                    placeholder="Nombre del producto"
                    value={nuevoProducto.nombre}
                    onChange={e => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Precio"
                    value={nuevoProducto.precio}
                    onChange={e => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Cantidad"
                    value={nuevoProducto.cantidad}
                    onChange={e => setNuevoProducto({ ...nuevoProducto, cantidad: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Proveedor"
                    value={nuevoProducto.proveedor}
                    onChange={e => setNuevoProducto({ ...nuevoProducto, proveedor: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Categoría"
                    value={nuevoProducto.categoria}
                    onChange={e => setNuevoProducto({ ...nuevoProducto, categoria: e.target.value })}
                />
                <button onClick={agregarProducto}>Agregar Producto</button>
            </div>

            <div className="lista-productos">
                <h2>Lista de Productos</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Código</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Proveedor</th>
                            <th>Categoría</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map(producto => (
                            <tr key={producto.id}>
                                <td>{producto.nombre}</td>
                                <td>{producto.codigo}</td>
                                <td>${producto.precio}</td>
                                <td>{producto.cantidad}</td>
                                <td>{producto.proveedor}</td>
                                <td>{producto.categoria}</td>
                                <td>
                                    <button onClick={() => editarProducto(producto)}>Editar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Productos;
