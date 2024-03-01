import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';


const InformeCalorias = () => {
  
  const alimentos = useSelector(state => state.alimentos.alimentos);
  const registros = useSelector(state => state.registros.registros);
  const userLog = useSelector(state => state.usuario.usuarioLogeado);
 
///************Calculo el total de calorias***************************

const totalCalorias = () => {
  if (registros.length === 0 || alimentos.length === 0) {
    return 0;
  } else {
    let total = 0;
    for (const registro of registros) {
      const alimento = alimentos.find(alimento => alimento.id === registro.idAlimento);
      if (alimento) {
        total += registro.cantidad * alimento.calorias;
      }
    }
    return total;
  }
};
//***********************Calorias diarias********** */

const caloriasDiarias = () => {
  if (registros.length === 0 || alimentos.length === 0) {
    return 0;
  } else {
   
    let totalCalorias = 0;
    const today = new Date();

    for (const registro of registros) {
      const alimento = alimentos.find(alimento => alimento.id === registro.idAlimento);
      if (alimento) {
        const partesFecha = registro.fecha.split('-');
        let dia = partesFecha[2];
        let mes = partesFecha[1];
        const anio = partesFecha[0];

        if (mes < 10) {
          mes = mes.slice(-1);
        }                

        let diaN = Number(dia);
        let diaNT = Number(today.getDate());
        let mesN = Number(mes);
        let mesNT = Number((today.getMonth() + 1));
        let anioN = Number(anio);
        let anioNT = Number(today.getFullYear());

        if (mesNT === 12) {
          mesNT = 1;
        }

        if (diaN === diaNT && mesN === mesNT && anioN === anioNT) {
          totalCalorias = totalCalorias + registro.cantidad * alimento.calorias;
        }
      }
    }

    return totalCalorias;
  }
};




const limiteCalorias = userLog.calorias;


const colorCalorias = () => {
  if (caloriasDiarias() > limiteCalorias) {
    return 'danger';
  } else if (caloriasDiarias() < (limiteCalorias * 0.9)) {
    return 'success';
  } else {
    return 'warning';
  }
};

console.log(colorCalorias());
  return (
    <div className="tarjeta">
            <h3>Informe de Calorias</h3>
        <br/>
        <p className='text-bg-primary p-3 text-center text-center fw-bolder'>Calorías totales: {totalCalorias()}</p>

        <Alert variant={colorCalorias()}>
            <p className='text-center fw-bolder'>Calorías diarias: {caloriasDiarias()}</p>
        </Alert>

        <p className='text-bg-success p-3 text-center text-center fw-bolder'>Calorías objetivo diario: {limiteCalorias}</p>        
    </div>
  )
}

export default InformeCalorias
