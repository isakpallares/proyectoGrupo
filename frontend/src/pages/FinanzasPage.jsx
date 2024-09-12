import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../App.css";

function FinanzasPage() {
  const [dataPropiedades, setDataProp] = useState([]);
  const [dataPagos, setDataPagos] = useState([]);
  const [dataUnidad, setDataUni] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/propiedades/')
      .then(response => {
        setDataProp(response.dataPropiedades);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8000/api/pagos/')
      .then(response => {
        setDataPagos(response.dataPagos);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);


  useEffect(() => {
    axios.get('http://localhost:8000/api/unidades/')
      .then(response => {
        setDataUni(response.dataUnidad);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const crearPago = async (data) => {
    try {
      const response = await axios.post('http://localhost:8000/api/pagos/', data);
      console.log('Pago creado:', response.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.detail); 
      } else {
        alert('Ocurrió un error desconocido.');
      }
    }
  };
  
  return (
    <div className="flex m-0">
      <Sidebar />
      <Header />
      <Routes></Routes>
    </div>
  );
}

export default FinanzasPage;
