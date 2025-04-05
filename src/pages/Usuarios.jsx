import React, { useState, useEffect } from 'react';

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [nuevoUsuario, setNuevoUsuario] = useState({
        nombre: '',
        correo: '',
        contraseña: '',
        rol: 'Vendedor'
    });

    useEffect(() => {
        const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
        setUsuarios(usuariosGuardados);
    }, []);

    const agregarUsuario = () => {
        if (!nuevoUsuario.nombre || !nuevoUsuario.correo || !nuevoUsuario.contraseña) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        const listaActualizada = [...usuarios, nuevoUsuario];
        setUsuarios(listaActualizada);
        localStorage.setItem('usuarios', JSON.stringify(listaActualizada));

        setNuevoUsuario({ nombre: '', correo: '', contraseña: '', rol: 'Vendedor' });
    };

    return (
        <div className="control-usuarios">
            <h1>Control de Usuarios</h1>

            <div className="formulario-usuario">
                <h2>Añadir Usuario</h2>
                <input type="text" placeholder="Nombre" value={nuevoUsuario.nombre} onChange={e => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })} />
                <input type="email" placeholder="Correo" value={nuevoUsuario.correo} onChange={e => setNuevoUsuario({ ...nuevoUsuario, correo: e.target.value })} />
                <input type="password" placeholder="Contraseña" value={nuevoUsuario.contraseña} onChange={e => setNuevoUsuario({ ...nuevoUsuario, contraseña: e.target.value })} />
                <select value={nuevoUsuario.rol} onChange={e => setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value })}>
                    <option value="Admin">Admin</option>
                    <option value="Vendedor">Vendedor</option>
                </select>
                <button onClick={agregarUsuario}>Agregar Usuario</button>
            </div>

            <h2>Lista de Usuarios</h2>
            <table className="tabla-usuarios">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Rol</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.length > 0 ? (
                        usuarios.map((usuario, index) => (
                            <tr key={index}>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.correo}</td>
                                <td>{usuario.rol}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No hay usuarios registrados.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Usuarios;
