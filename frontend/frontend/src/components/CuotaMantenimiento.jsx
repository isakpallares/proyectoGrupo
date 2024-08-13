import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CuotaMantenimiento() {
    const [cuotas, setCuotas] = useState([]);
    const [unidades, setUnidades] = useState([]);
    const [cuota, setCuota] = useState({ 
        unidad: '', 
        fecha: '', 
        monto: '', 
        estado: 'pendiente' 
    });
    const [editing, setEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        fetchCuotas();
        fetchUnidades();
    }, []);

    const fetchCuotas = async () => {
        const response = await axios.get('http://localhost:8000/cuotaMantenimiento/');
        setCuotas(response.data);
    };

    const fetchUnidades = async () => {
        const response = await axios.get('http://localhost:8000/unidades/');
        setUnidades(response.data);
    };

    const handleChange = (e) => {
        setCuota({
            ...cuota,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editing) {
            await axios.put(`http://localhost:8000/cuotaMantenimiento/${currentId}/`, cuota);
            setEditing(false);
        } else {
            await axios.post('http://localhost:8000/cuotaMantenimiento/', cuota);
        }
        fetchCuotas();
        setCuota({ 
            unidad: '', 
            fecha: '', 
            monto: '', 
            estado: 'pendiente' 
        });
    };

    const handleEdit = (cuota) => {
        setEditing(true);
        setCurrentId(cuota.id);
        setCuota(cuota);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8000/cuotaMantenimiento/${id}/`);
        fetchCuotas();
    };

    return (
        <div>
            <h1>Cuotas de Mantenimiento</h1>
            <form onSubmit={handleSubmit}>
                <select name="unidad" value={cuota.unidad} onChange={handleChange} required>
                    <option value="">Seleccionar Unidad</option>
                    {unidades.map(unidad => (
                        <option key={unidad.id} value={unidad.id}>{unidad.numero_unidad}</option>
                    ))}
                </select>
                <input type="date" name="fecha" value={cuota.fecha} onChange={handleChange} required />
                <input type="number" name="monto" value={cuota.monto} onChange={handleChange} placeholder="Monto" required />
                <select name="estado" value={cuota.estado} onChange={handleChange} required>
                    <option value="pagada">Pagada</option>
                    <option value="pendiente">Pendiente</option>
                </select>
                <button type="submit">{editing ? "Actualizar" : "Agregar"}</button>
            </form>
            <ul>
                {cuotas.map(cuota => (
                    <li key={cuota.id}>
                        {cuota.unidad.numero_unidad} - {cuota.fecha} - {cuota.monto} - {cuota.estado}
                        <button onClick={() => handleEdit(cuota)}>Editar</button>
                        <button onClick={() => handleDelete(cuota.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CuotaMantenimiento;
