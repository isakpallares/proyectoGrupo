import axios from 'axios';


const PropiedadesApi=axios.create({
    baseURL: 'http://127.0.0.1:8000/propiedades/'
 })

 export const allPropiedades=()=> PropiedadesApi.get('/')
 export const getPropiedades=(id)=>PropiedadesApi.get(`/${id}/`)
 export const createPropiedades=(cita) =>PropiedadesApi.post('/',cita)
 export const deletePropiedades=(id)=> PropiedadesApi.delete(`/${id}/`)
 export const updatePropiedades=(id,cita)=>PropiedadesApi.put(`/${id}/`,cita)