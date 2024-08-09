import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GastosComunes() {
    const [gastos, setGastos] = useState([]);
    const [gasto, setGasto] = useState({ 
        fecha: '', 
        descripcion: '', 
        monto: '' 
    });
    const [editing, setEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        fetchGastos();
    }, []);

    const fetchGastos = async () => {
        const response = await axios.get('http://localhost:8000/api/gastos-comunes/');
        setGastos(response.data);
    };

    const handleChange = (e) => {
        setGasto({
            ...gasto,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editing) {
            await axios.put(`http://localhost:8000/api/gastos-comunes/${currentId}/`, gasto);
            setEditing(false);
        } else {
            await axios.post('http://localhost:8000/api/gastos-comunes/', gasto);
        }
        fetchGastos();
        setGasto({ 
            fecha: '', 
            descripcion: '', 
            monto: '' 
        });
    };

    const handleEdit = (gasto) => {
        setEditing(true);
        setCurrentId(gasto.id);
        setGasto(gasto);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8000/api/gastos-comunes/${id}/`);
        fetchGastos();
    };

    return (
        <div>
            <h1>Gastos Comunes</h1>
            <form onSubmit={handleSubmit}>
                <input type="date" name="fecha" value={gasto.fecha} onChange={handleChange} required />
                <input type="text" name="descripcion" value={gasto.descripcion} onChange={handleChange} placeholder="Descripción" required />
                <input type="number" name="monto" value={gasto.monto} onChange={handleChange} placeholder="Monto" required />
                <button type="submit">{editing ? "Actualizar" : "Agregar"}</button>
            </form>
            <ul>
                {gastos.map(gasto => (
                    <li key={gasto.id}>
                        {gasto.fecha} - {gasto.descripcion} - {gasto.monto}
                        <button onClick={() => handleEdit(gasto)}>Editar</button>
                        <button onClick={() => handleDelete(gasto.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GastosComunes;
