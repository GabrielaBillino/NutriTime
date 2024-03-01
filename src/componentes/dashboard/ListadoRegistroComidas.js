import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import {Spinner} from 'react-bootstrap';
import {spinnerCargando} from '../../features/spinnerSlice';
import {eliminarRegistro} from '../../features/registrosSlice';
import { differenceInCalendarDays, differenceInCalendarMonths } from 'date-fns';


const ListadoRegistroComidas = () => {
    const dispatch = useDispatch();
    const url = "https://calcount.develotion.com/"; 

    const [mje, setMje] = useState(null);
    const [seleccionado, setSeleccionado] = useState("todos");
    
    const usuarioCarga = useSelector(state => state.spinner.loading);
    const registro = useSelector((state) => state.registros.registros);
    const alimentos = useSelector(state => state.alimentos.alimentos);  

    const handleChangeRadio = (event) => {
        setSeleccionado(event.target.value);
        console.log(event.target.value);       
    };


    // const mappedRegistros = registro.map()((registro) => {
    //     const alimento = alimentos.find((ali) => ali.id === registro.idAlimento)        
    //     return {
    //       id: registro.id,
    //       idAlimento: alimento.id,
    //       nombre: alimento.nombre,
    //       cantidad: registro.cantidad,
    //       calorias: alimento.calorias,
    //       fecha: registro.fecha,
    //     };       
    // });
    // console.log(mappedRegistros);
//******************************************************************************************* */
   //Realizo calculos para realizar el filtrado de los registro por mes, semana o anio 
    const fechaActual = new Date()

    const filtarRegTodo = () => {
       return registro;
    }

    const filtarRegMes = () => {
        const registrosFiltrados = registro.filter((registro) => {
            const fechaRegistro = Date.parse(registro.fecha);           
            const diferenciaMeses = differenceInCalendarMonths(fechaActual, fechaRegistro);          
            return diferenciaMeses < 1;
          });
         
        return registrosFiltrados;
     }

     const filtrarRegSemana = () => {
        const registrosFiltrados = registro.filter((registro) => {
            const fechaRegistro = Date.parse(registro.fecha);
            const diferenciaDias = differenceInCalendarDays(fechaActual, fechaRegistro);
            return diferenciaDias <= 7;
          });
          return registrosFiltrados;
     }

     const filtro = seleccionado === "todos" ? filtarRegTodo : seleccionado === "ultimoMes" ? filtarRegMes :  filtrarRegSemana; 
    
   

//***************************ELIMINAR REGISTRO*********************************** */
    const eliminar = (id) => {     
        dispatch(spinnerCargando(true));

        fetch(`${url}/registros.php?idRegistro=${id}`, {
            method: 'DELETE',
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
                setMje(data.mensaje);             
                                          
                dispatch(eliminarRegistro(id));                
          }else{               
               setMje(data.mensaje);  
               
          }
          dispatch(spinnerCargando(false));
        })
        .catch(error => {
            console.error('Error:', error);
            setMje(error);  
            dispatch(spinnerCargando(false));
        });       
    
       }

  
 
    return (
        <div className="tarjeta ">
            <h3>Listado de Registros de comidas</h3>
            <br/>
            {usuarioCarga ? <Spinner/> : null} 
            <div className='d-flex'>
                <div className="form-check form-check-inline">
                <input className="form-check-input " type="radio" name="ultimaSemana" id="ultimaSemana" value="ultimaSemana" checked={seleccionado === "ultimaSemana"}
                          onChange={handleChangeRadio}/>
                <label className="form-check-label text-left" htmlFor="ultimaSemana">
                    Ultima Semana
                </label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="ultimoMes" id="ultimoMes" value="ultimoMes" checked={seleccionado === "ultimoMes"}
                          onChange={handleChangeRadio}/>
                    <label className="form-check-label" htmlFor="ultimoMes">
                        Ultimo Mes
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="todos" id="todos" value="todos" checked={seleccionado === "todos"}
                          onChange={handleChangeRadio} />
                    <label className="form-check-label" htmlFor="todos">
                        Todos
                    </label>                    
                </div>
           </div>     
              
        <br/>

        <table className="table table-striped table-warning">
            <thead>
                <tr>
                    <th>Img</th>
                    {/* <th>Comida</th> */}
                    <th>Cantidad</th>
                    <th>Fecha</th>
                    <th></th>
                </tr>
            </thead>
            {filtro().map((item) =>(
                <tr key={item.id}>                
                    <td><img src={`https://calcount.develotion.com/imgs/${item.idAlimento}.png`} alt={item.idAlimento} width="50" height="50"/></td>
                    {/* <td>{item.nombre}</td> */}
                    <td className='text-center'> {item.cantidad} </td>
                    <td> {item.fecha} </td>
                    <td><input type="button" className="btn btn-success" id="btnEliminar" onClick={() => eliminar(item.id)} value="Eliminar" /></td>
                </tr>
            ))}
            
        </table>
      
        {mje ? <div className="alert alert-info text-bg-info p-3" role="alert">{mje}</div> : null}    
    </div>
    
  )
}

export default ListadoRegistroComidas
