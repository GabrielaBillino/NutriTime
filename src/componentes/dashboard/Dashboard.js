import RegistroAlimento from './RegistroAlimento'
import ListadoRegistroComidas from './ListadoRegistroComidas'
import InformeCalorias from './InformeCalorias'
import GraficoCantidadAlimento from './GraficoCantidadAlimento'
import GraficoCaloriasFecha from './GraficoCaloriasFecha'
import MapaUserPais from './MapaUserPais'
import TiempoRestObj from './TiempoRestObj'
import { cargarAlimentos } from "../../features/alimentosSlice";
import { cargarRegistros } from "../../features/registrosSlice";
import { cargarPais } from '../../features/paises.Slice';
import { useDispatch, useSelector } from 'react-redux';
import {Spinner} from 'react-bootstrap';


const Dashboard = () => {

  const usuarioCarga = useSelector(state => state.spinner.loading);

 //*********************metodo para cargar apis GET***************** */

 const dispatch = useDispatch();


  fetch(`https://calcount.develotion.com/alimentos.php`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'apikey': localStorage.getItem('token'),
        'iduser': localStorage.getItem('id'),
    },
    body: JSON.stringify()
})
.then(response => response.json())
.then(data => {
    if(data.codigo === 200){          
        dispatch(cargarAlimentos(data.alimentos));
       
    }else{
        alert(data.mensaje);
    }

})
.catch(error => {
    console.error('Error:', error);
});


//**************cargar registros************** */
fetch(`https://calcount.develotion.com/registros.php?idUsuario=${localStorage.getItem("id")}`, {
  method: 'GET',
  headers: {
      'Content-Type': 'application/json',
      'apikey': localStorage.getItem('token'),
      'iduser': localStorage.getItem('id'),
  },
  body: JSON.stringify()
})
.then(response => response.json())
.then(data => {
  if(data.codigo === 200){     
    dispatch(cargarRegistros(data.registros));               
            
}else{
    alert(data.mensaje);
  
}

})
.catch(error => {
  console.error('Error:', error);
});          

///***************************Cargar Paises**********************************************/
fetch(`https://calcount.develotion.com/paises.php`, {
  method: 'GET',
  headers: {
      'Content-Type': 'application/json',
  },

})
  .then(response => response.json())
  .then(data => {    
    
      dispatch(cargarPais(data.paises));
      
  })
  .catch(error => {
      console.error('Error:', error);
     
  });  




  return (
    
    <div className="contenido">
            <div className="dashboard ">
              <div className='row'>
                <div className="col-3 mt-5 tamanioCont">
                      <RegistroAlimento/>
                  </div>
                  <div className="col-3 mt-5 tamanioCont">
                      <ListadoRegistroComidas/>
                  </div>
                  <div className="col-3 mt-5 tamanioCont">
                    <InformeCalorias/>
                    {usuarioCarga ? <Spinner/> : null} 
                  </div>
                  <div className="col-3 mt-5 tamanioCont">
                      <TiempoRestObj/>
                  </div>
              </div>                

                <div className='row'>
                  <div className="col-4  mt-5 tamanioCont">
                    <GraficoCantidadAlimento/>
                  </div>
                
                  <div className="col-5  mt-5 tamanioCont">
                  <GraficoCaloriasFecha/>
                  </div>
                  <div className="col-3  mt-5 tamanioCont">
                  <MapaUserPais/>
                  </div>
                 
                </div>
                
            
              
            </div>
        </div>
  )
}

export default Dashboard