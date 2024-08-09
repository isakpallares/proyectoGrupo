import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PropietarioList() {
    const [propietarios, setPropietarios] = useState([]);
    const [propietario, setPropietario] = useState({ 
        nombre: '', 
        apellido: '', 
        documento_identidad: '', 
        telefono: '', 
        email: '', 
        direccion: '' 
    });
    const [editing, setEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        fetchPropietarios();
    }, []);

    const fetchPropietarios = async () => {
        const response = await axios.get('http://localhost:8000/api/propietarios/');
        setPropietarios(response.data);
    };

    const handleChange = (e) => {
        setPropietario({
            ...propietario,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editing) {
            await axios.put(`http://localhost:8000/api/propietarios/${currentId}/`, propietario);
            setEditing(false);
        } else {
            await axios.post('http://localhost:8000/api/propietarios/', propietario);
        }
        fetchPropietarios();
        setPropietario({ 
            nombre: '', 
            apellido: '', 
            documento_identidad: '', 
            telefono: '', 
            email: '', 
            direccion: '' 
        });
    };

    const handleEdit = (propietario) => {
        setEditing(true);
        setCurrentId(propietario.id);
        setPropietario(propietario);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8000/api/propietarios/${id}/`);
        fetchPropietarios();
    };

    return (
        <div>
            <h1>Propietarios</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="nombre" value={propietario.nombre} onChange={handleChange} placeholder="Nombre" required />
                <input type="text" name="apellido" value={propietario.apellido} onChange={handleChange} placeholder="Apellido" required />
                <input type="text" name="documento_identidad" value={propietario.documento_identidad} onChange={handleChange} placeholder="Documento de Identidad" required />
                <input type="text" name="telefono" value={propietario.telefono} onChange={handleChange} placeholder="Teléfono" required />
                <input type="email" name="email" value={propietario.email} onChange={handleChange} placeholder="Email" required />
                <input type="text" name="direccion" value={propietario.direccion} onChange={handleChange} placeholder="Dirección" required />
                <button type="submit">{editing ? "Actualizar" : "Agregar"}</button>
            </form>
            <ul>
                {propietarios.map(propietario => (
                    <li key={propietario.id}>
                        {propietario.nombre} {propietario.apellido} 
                        <button onClick={() => handleEdit(propietario)}>Editar</button>
                        <button onClick={() => handleDelete(propietario.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PropietarioList;
