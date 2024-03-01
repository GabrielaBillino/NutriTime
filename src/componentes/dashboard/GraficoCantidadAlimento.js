
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement, 
  LineElement
);

const GraficoCantidadAlimento = () => {

  const alimentos = useSelector(state => state.alimentos.alimentos);
  const registros = useSelector((state) => state.registros.registros);

  
  const alimentosData = alimentos.map(alimentos => ({
    id: alimentos.id,
    name: alimentos.nombre,
    calorias: alimentos.calorias,
    cantidad: registros.filter(reg => reg.idAlimento === alimentos.id).length,
  }));
   
 

  return (
    <div>
   <div className="tarjeta">
        <div >
            <h3>Gráfico de cantidades por alimento</h3>
            <div >
        
          <Bar options={{
              responsive: true,
              plugins: {
                  legend: {
                  position: 'top',
                  },
                  title: {
                  display: true,
                  text: 'Alimentos',
                  },
              },
              }} data={{
                  labels: alimentosData.map(item => item.name),
                  datasets: [
                  {
                      label: 'Cantidad de alimentos',
                      data: alimentosData.map(item => item.cantidad),
                      backgroundColor: 'rgba(22, 224, 231, 0.623)',
                  }
                  ],
              }} />
          </div>
        </div>

    </div>
    </div>
 
  )
}

export default GraficoCantidadAlimento
