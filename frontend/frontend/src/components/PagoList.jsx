import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Pagos() {
    const [pagos, setPagos] = useState([]);
    const [cuotas, setCuotas] = useState([]);
    const [propietarios, setPropietarios] = useState([]);
    const [pago, setPago] = useState({ 
        cuota: '', 
        propietario: '', 
        fecha: '', 
        monto: '' 
    });
    const [editing, setEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        fetchPagos();
        fetchCuotas();
        fetchPropietarios();
    }, []);

    const fetchPagos = async () => {
        const response = await axios.get('http://localhost:8000/api/pagos/');
        setPagos(response.data);
    };

    const fetchCuotas = async () => {
        const response = await axios.get('http://localhost:8000/api/cuotas-mantenimiento/');
        setCuotas(response.data);
    };

    const fetchPropietarios = async () => {
        const response = await axios.get('http://localhost:8000/api/propietarios/');
        setPropietarios(response.data);
    };

    const handleChange = (e) => {
        setPago({
            ...pago,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editing) {
            await axios.put(`http://localhost:8000/api/pagos/${currentId}/`, pago);
            setEditing(false);
        } else {
            await axios.post('http://localhost:8000/api/pagos/', pago);
        }
        fetchPagos();
        setPago({ 
            cuota: '', 
            propietario: '', 
            fecha: '', 
            monto: '' 
        });
    };

    const handleEdit = (pago) => {
        setEditing(true);
        setCurrentId(pago.id);
        setPago(pago);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8000/api/pagos/${id}/`);
        fetchPagos();
    };

    return (
        <div>
            <h1>Pagos</h1>
            <form onSubmit={handleSubmit}>
                <select name="cuota" value={pago.cuota} onChange={handleChange} required>
                    <option value="">Seleccionar Cuota</option>
                    {cuotas.map(cuota => (
                        <option key={cuota.id} value={cuota.id}>{cuota.unidad.numero_unidad}</option>
                    ))}
                </select>
                <select name="propietario" value={pago.propietario} onChange={handleChange} required>
                    <option value="">Seleccionar Propietario</option>
                    {propietarios.map(propietario => (
                        <option key={propietario.id} value={propietario.id}>{propietario.nombre} {propietario.apellido}</option>
                    ))}
                </select>
                <input type="date" name="fecha" value={pago.fecha} onChange={handleChange} required />
                <input type="number" name="monto" value={pago.monto} onChange={handleChange} placeholder="Monto" required />
                <button type="submit">{editing ? "Actualizar" : "Agregar"}</button>
            </form>
            <ul>
                {pagos.map(pago => (
                    <li key={pago.id}>
                        {pago.fecha} - {pago.monto} - {pago.cuota.unidad.numero_unidad} 
                        <button onClick={() => handleEdit(pago)}>Editar</button>
                        <button onClick={() => handleDelete(pago.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Pagos;
