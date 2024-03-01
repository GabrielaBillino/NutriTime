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

const GraficoCaloriasFecha = () => {

  const alimentos = useSelector(state => state.alimentos.alimentos);
  const registros = useSelector((state) => state.registros.registros);


const today = new Date();
 

// Calcular la fecha hace una semana

const lastWeek = new Date(today);

lastWeek.setDate(lastWeek.getDate() - 6);

 

// Filtrar los registros de la última semana

const registrosUltimaSemana = registros.filter(registro => new Date(registro.fecha) >= lastWeek);

 

// Obtener un array de fechas de la última semana

const fechasUltimaSemana = [];

for (let i = 0; i < 7; i++) {

    const date = new Date(lastWeek);

    date.setDate(date.getDate() + i);

    fechasUltimaSemana.push(date.toISOString().split('T')[0]);

}

console.log('registrosUltimaSemana', registrosUltimaSemana);

console.log('fechasUltimaSemana', fechasUltimaSemana);

// Crear un nuevo array con la cantidad de calorías ingeridas cada día

const caloriasPorDia = fechasUltimaSemana.map(fecha => {

    // Filtrar los registros de la fecha actual

    const registrosDelDia = registrosUltimaSemana.filter(registro => registro.fecha === fecha);

    // Sumar las calorías de los alimentos consumidos en ese día

    const totalCalorias = registrosDelDia.reduce((acumulador, registro) => {

        // Encontrar el alimento correspondiente al registro actual

        const alimento = alimentos.find(a => a.id === registro.idAlimento);

        // Sumar las calorías del alimento por la cantidad consumida

        return acumulador + (alimento ? alimento.calorias * registro.cantidad : 0);

    }, 0);

    // Retornar objeto con la fecha y las calorías totales

    console.log('fecha', fecha,);

    console.log('totalCalorias', totalCalorias);

    console.log('registrosDelDia', registrosDelDia);

    return { fecha, totalCalorias };

});

 

console.log(caloriasPorDia);




  return (
  
    <div className="">
    <div className="tarjeta">
      <h3>Gráfico de calorías por fecha</h3>
      <Bar options={{
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Calorias última semana',
          },
        },
        scales: {
          x: {
            type: 'category',
          },
          y: {
            beginAtZero: true,
          },    
        },
      }} data={{
        labels: caloriasPorDia.map(datos => datos.fecha),
        datasets: [
          {
              label: 'Cantidad de calorias',
              data:  caloriasPorDia.map(datos => datos.totalCalorias),
              backgroundColor: 'rgb(5, 219, 74)',
          }
          ],
      }} />
    </div>
  </div>
  )
}

export default GraficoCaloriasFecha
