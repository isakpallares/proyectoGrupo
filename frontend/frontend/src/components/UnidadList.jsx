import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UnidadList() {
    const [unidades, setUnidades] = useState([]);
    const [unidad, setUnidad] = useState({ 
        propiedad: '', 
        numero_unidad: '', 
        tipo_unidad: '', 
        area: '' 
    });
    const [propiedades, setPropiedades] = useState([]);
    const [editing, setEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        fetchUnidades();
        fetchPropiedades();
    }, []);

    const fetchUnidades = async () => {
        const response = await axios.get('http://localhost:8000/api/unidades/');
        setUnidades(response.data);
    };

    const fetchPropiedades = async () => {
        const response = await axios.get('http://localhost:8000/api/propiedades/');
        setPropiedades(response.data);
    };

    const handleChange = (e) => {
        setUnidad({
            ...unidad,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editing) {
            await axios.put(`http://localhost:8000/api/unidades/${currentId}/`, unidad);
            setEditing(false);
        } else {
            await axios.post('http://localhost:8000/api/unidades/', unidad);
        }
        fetchUnidades();
        setUnidad({ 
            propiedad: '', 
            numero_unidad: '', 
            tipo_unidad: '', 
            area: '' 
        });
    };

    const handleEdit = (unidad) => {
        setEditing(true);
        setCurrentId(unidad.id);
        setUnidad(unidad);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8000/api/unidades/${id}/`);
        fetchUnidades();
    };

    return (
        <div>
            <h1>Unidades</h1>
            <form onSubmit={handleSubmit}>
                <select name="propiedad" value={unidad.propiedad} onChange={handleChange} required>
                    <option value="">Seleccionar Propiedad</option>
                    {propiedades.map(propiedad => (
                        <option key={propiedad.id} value={propiedad.id}>{propiedad.nombre_edificio}</option>
                    ))}
                </select>
                <input type="text" name="numero_unidad" value={unidad.numero_unidad} onChange={handleChange} placeholder="Número de Unidad" required />
                <input type="text" name="tipo_unidad" value={unidad.tipo_unidad} onChange={handleChange} placeholder="Tipo de Unidad" required/>
                <input type="number" name="area" value={unidad.area} onChange={handleChange} placeholder="Área" required />
                <button type="submit">{editing ? "Actualizar" : "Agregar"}</button>
            </form>
            <ul>
                {unidades.map(unidad => (
                    <li key={unidad.id}>
                        {unidad.numero_unidad} - {unidad.tipo_unidad} - {unidad.propiedad.nombre_edificio} 
                        <button onClick={() => handleEdit(unidad)}>Editar</button>
                        <button onClick={() => handleDelete(unidad.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
            
}

export default UnidadList;