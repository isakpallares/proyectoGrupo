import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ContratoServicios() {
    const [contratos, setContratos] = useState([]);
    const [contrato, setContrato] = useState({ 
        proveedor: '', 
        tipo_servicio: '', 
        fecha_inicio: '', 
        fecha_fin: '', 
        monto: '' 
    });
    const [editing, setEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        fetchContratos();
    }, []);

    const fetchContratos = async () => {
        const response = await axios.get('http://localhost:8000/contratoServicios/');
        setContratos(response.data);
    };

    const handleChange = (e) => {
        setContrato({
            ...contrato,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editing) {
            await axios.put(`http://localhost:8000/contratoServicios/${currentId}/`, contrato);
            setEditing(false);
        } else {
            await axios.post('http://localhost:8000/contratoServicios/', contrato);
        }
        fetchContratos();
        setContrato({ 
            proveedor: '', 
            tipo_servicio: '', 
            fecha_inicio: '', 
            fecha_fin: '', 
            monto: '' 
        });
    };

    const handleEdit = (contrato) => {
        setEditing(true);
        setCurrentId(contrato.id);
        setContrato(contrato);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8000/contratoServicios/${id}/`);
        fetchContratos();
    };

    return (
        <div>
            <h1>Contratos de Servicios</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="proveedor" value={contrato.proveedor} onChange={handleChange} placeholder="Proveedor" required />
                <input type="text" name="tipo_servicio" value={contrato.tipo_servicio} onChange={handleChange} placeholder="Tipo de Servicio" required />
                <input type="date" name="fecha_inicio" value={contrato.fecha_inicio} onChange={handleChange} required />
                <input type="date" name="fecha_fin" value={contrato.fecha_fin} onChange={handleChange} required />
                <input type="number" name="monto" value={contrato.monto} onChange={handleChange} placeholder="Monto" required />
                <button type="submit">{editing ? "Actualizar" : "Agregar"}</button>
            </form>
            <ul>
                {contratos.map(contrato => (
                    <li key={contrato.id}>
                        {contrato.proveedor} - {contrato.tipo_servicio} - {contrato.fecha_inicio} - {contrato.fecha_fin} - {contrato.monto}
                        <button onClick={() => handleEdit(contrato)}>Editar</button>
                        <button onClick={() => handleDelete(contrato.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ContratoServicios;
