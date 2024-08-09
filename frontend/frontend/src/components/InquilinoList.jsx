import React, { useState, useEffect } from 'react';
import axios from 'axios';

function InquilinoList() {
    const [inquilinos, setInquilinos] = useState([]);
    const [unidades, setUnidades] = useState([]);
    const [inquilino, setInquilino] = useState({ 
        unidad: '', 
        nombre: '', 
        apellido: '', 
        numero_documento_identidad: '', 
        telefono: '', 
        email: '' 
    });
    const [editing, setEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        fetchInquilinos();
        fetchUnidades();
    }, []);

    const fetchInquilinos = async () => {
        const response = await axios.get('http://localhost:8000/api/inquilinos/');
        setInquilinos(response.data);
    };

    const fetchUnidades = async () => {
        const response = await axios.get('http://localhost:8000/api/unidades/');
        setUnidades(response.data);
    };

    const handleChange = (e) => {
        setInquilino({
            ...inquilino,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editing) {
            await axios.put(`http://localhost:8000/api/inquilinos/${currentId}/`, inquilino);
            setEditing(false);
        } else {
            await axios.post('http://localhost:8000/api/inquilinos/', inquilino);
        }
        fetchInquilinos();
        setInquilino({ 
            unidad: '', 
            nombre: '', 
            apellido: '', 
            numero_documento_identidad: '', 
            telefono: '', 
            email: '' 
        });
    };

    const handleEdit = (inquilino) => {
        setEditing(true);
        setCurrentId(inquilino.id);
        setInquilino(inquilino);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8000/api/inquilinos/${id}/`);
        fetchInquilinos();
    };

    return (
        <div>
            <h1>Inquilinos</h1>
            <form onSubmit={handleSubmit}>
                <select name="unidad" value={inquilino.unidad} onChange={handleChange} required>
                    <option value="">Seleccionar Unidad</option>
                    {unidades.map(unidad => (
                        <option key={unidad.id} value={unidad.id}>{unidad.numero_unidad}</option>
                    ))}
                </select>
                <input type="text" name="nombre" value={inquilino.nombre} onChange={handleChange} placeholder="Nombre" required />
                <input type="text" name="apellido" value={inquilino.apellido} onChange={handleChange} placeholder="Apellido" required />
                <input type="text" name="numero_documento_identidad" value={inquilino.numero_documento_identidad} onChange={handleChange} placeholder="Documento de Identidad" required />
                <input type="text" name="telefono" value={inquilino.telefono} onChange={handleChange} placeholder="Teléfono" required />
                <input type="email" name="email" value={inquilino.email} onChange={handleChange} placeholder="Email" required />
                <button type="submit">{editing ? "Actualizar" : "Agregar"}</button>
            </form>
            <ul>
                {inquilinos.map(inquilino => (
                    <li key={inquilino.id}>
                        {inquilino.nombre} {inquilino.apellido} 
                        <button onClick={() => handleEdit(inquilino)}>Editar</button>
                        <button onClick={() => handleDelete(inquilino.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default InquilinoList;
