import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PropiedadList() {

    const [propiedades, setPropiedades] = useState([]);
    const [propiedad, setPropiedad] = useState({ 
        direccion: '', 
        numero_pisos: '', 
        numero_unidades: '', 
        año_construcción: '', 
        nombre_edificio: '' 
    });
    const [editing, setEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        fetchPropiedades();
    }, []);

    const fetchPropiedades = async () => {
        const response = await axios.get('http://localhost:8000/api/propiedades/');
        setPropiedades(response.data);
    };

    const handleChange = (e) => {
        setPropiedad({
            ...propiedad,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editing) {
            await axios.put(`http://localhost:8000/api/propiedades/${currentId}/`, propiedad);
            setEditing(false);
        } else {
            await axios.post('http://localhost:8000/api/propiedades/', propiedad);
        }
        fetchPropiedades();
        setPropiedad({ 
            direccion: '', 
            numero_pisos: '', 
            numero_unidades: '', 
            año_construcción: '', 
            nombre_edificio: '' 
        });
    };

    const handleEdit = (propiedad) => {
        setEditing(true);
        setCurrentId(propiedad.id);
        setPropiedad(propiedad);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8000/api/propiedades/${id}/`);
        fetchPropiedades();
    };

    return (
        <div>
            <h1>Propiedades</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="direccion" value={propiedad.direccion} onChange={handleChange} placeholder="Dirección" required />
                <input type="number" name="numero_pisos" value={propiedad.numero_pisos} onChange={handleChange} placeholder="Número de Pisos" required />
                <input type="number" name="numero_unidades" value={propiedad.numero_unidades} onChange={handleChange} placeholder="Número de Unidades" required />
                <input type="number" name="año_construcción" value={propiedad.año_construcción} onChange={handleChange} placeholder="Año de Construcción" required />
                <input type="text" name="nombre_edificio" value={propiedad.nombre_edificio} onChange={handleChange} placeholder="Nombre del Edificio" required />
                <button type="submit">{editing ? "Actualizar" : "Agregar"}</button>
            </form>
            <ul>
                {propiedades.map(propiedad => (
                    <li key={propiedad.id}>
                        {propiedad.nombre_edificio} - {propiedad.direccion} 
                        <button onClick={() => handleEdit(propiedad)}>Editar</button>
                        <button onClick={() => handleDelete(propiedad.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PropiedadList;