import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cambiarOpcionSelecionada } from '../../features/alimentosSlice';
import {Spinner} from 'react-bootstrap';
import {spinnerCargando} from '../../features/spinnerSlice';
import {agregarRegistros} from '../../features/registrosSlice';

    const RegistroAlimento = () => {
    const dispatch = useDispatch();

    const [cantidadInicial, setCantidadInicial] = useState(null);
    const [porcionAlfabetica, setPorcionAlfabetica] = useState(null);

    const [mensaje, setMensaje] = useState(null); 
    const [error, setError] = useState(null); 
    const [botonRegistro, setBotonRegistro] = useState(false);

    const alimentos = useSelector(state => state.alimentos.alimentos);      
    const usuarioCarga = useSelector(state => state.spinner.loading);
    
    const url = "https://calcount.develotion.com/";

    const alimento = useRef(null);
    const cantidad = useRef(null);
    const fecha = useRef(null);       
    
   
   
    //----------------------------------------------------------------------------------
    function obtenerPorcionNumerica(porcion) {
        const regex = /^(\d+)([a-zA-Z]*)$/;
        const match = porcion.match(regex);
  
        return parseFloat(match[1]);
       
    }

    function obtenerPorcionAlfabetica(porcion) {
        const regex = /^(\d+)([a-zA-Z]*)$/;
        const match = porcion.match(regex);
        
        return match[2];       
    }
    
    
    const handleChangeAlimento = (e) => {      
        const idAlimento = parseInt(e.target.value);
        const alimentoSeleccionado = alimentos.find((alimento) => alimento.id === idAlimento);
        const porcionNumerica = obtenerPorcionNumerica(alimentoSeleccionado.porcion);
        const porcionAlfabetica = obtenerPorcionAlfabetica(alimentoSeleccionado.porcion);
        
        // Actualizar el estado de cantidadInicial con la porción numerica
        setCantidadInicial(porcionNumerica);
         // Actualizar el estado de medida con la porcion alfabetica
        setPorcionAlfabetica(porcionAlfabetica);
      };

      const handleChangeCantidad = (event) => {
        const cantidad = event.target.value;

        cantidad && fecha.current.value && alimento.current.value ? setBotonRegistro(true): setBotonRegistro(false)
        
        if (cantidad < cantidadInicial) {             
          setError("La cantidad no puede ser menor a: " + cantidadInicial);
          setMensaje(null);
          setBotonRegistro(false);
        }else{
            setError(null);

        }
      };



//****************CONTROL FEHCA********************************* */
    const validateDate = (fecha) => {
        const hoy = new Date();
        const fechaSeleccionada = new Date(fecha);
        return fechaSeleccionada <= hoy;
      };

    const handleChangeFecha = (event) => {
        const fecha = event.target.value;
        cantidad.current.value && fecha && alimento.current.value ? setBotonRegistro(true): setBotonRegistro(false)
        if (!validateDate(fecha)) {             
          setError("La fecha seleccionada debe ser hoy o un día anterior.");
          setMensaje(null);
          setBotonRegistro(false);
        }else{
            setError(null);

        }
      };
   //*********************FIN CONTROL FEHCA**************** */


////***********************Cargar registro alimento *******************************
   const agregarAlimento = (event) => {
    dispatch(spinnerCargando(true));
    setError(null);
    const bodyData ={
        "idAlimento": alimento.current.value,
        "idUsuario": localStorage.getItem("id"),
        "cantidad": cantidad.current.value,
        "fecha": fecha.current.value
    }

    fetch(`${url}/registros.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': localStorage.getItem('token'),
            'iduser': localStorage.getItem('id'),
        },
        body: JSON.stringify(bodyData)
    })
    .then(response => response.json())
    .then(data => {              
        if(data.codigo === 200){
           dispatch(spinnerCargando(false));
            const nuevoRegistro = {
                id: data.idRegistro,
                idAlimento: alimento.current.value,                
                cantidad: cantidad.current.value,
                fecha: fecha.current.value
            }
           setError(null); 
           console.log(data); 
           alimento.current.value = null;           
           cantidad.current.value = null;
           fecha.current.value = null;         
           setMensaje(data.mensaje);            
         
           dispatch(agregarRegistros(nuevoRegistro));     
          
        }else{           
            setError(data.mensaje);
        }
        dispatch(spinnerCargando(false));
    })
    .catch(error => {
        console.error('Error:', error);
        setError(error);
    });

  }

    
  return (
    <div >
        <div className="tarjeta">
         {mensaje ? <div className="alert alert-info text-bg-info p-3" role="alert">{mensaje}</div> : null}
         {error ? <div className="alert alert-danger text-bg-danger p-3" role="alert">{error}</div> : null}                  
        <h4>Agregar Registro Alimento</h4>
                    <br/>
                    <div className="inputLabel">
                        <label htmlFor="txtAlimento">Alimento:</label>
                        <select name="txtAlimento" ref={alimento} onChange={handleChangeAlimento }>
                           
                              {alimentos.map(alimento => <option key={alimento.id} value={alimento.id}>{alimento.nombre}
                            </option>)}
                                
                      </select>
                    </div>                    
                    <br/>
                    <div className="inputLabel">
                        <label htmlFor="txtCantidad">Cantidad:</label>
                        <input type="number" name="txtCantidad" id="txtCantidad" ref={cantidad} min={cantidadInicial} style={{ width: "60px" }} onChange={handleChangeCantidad}  />
                        <p>Medida: {porcionAlfabetica}</p>
                    </div>
                 
                    <br/>
                    <div className="inputLabel">
                        <label htmlFor="txtFecha">Fecha:</label>
                        <input type="date" name="txtFecha" id="txtFecha" ref={fecha} onChange={handleChangeFecha}/>
                    </div>                    
                    <br></br>
                    {usuarioCarga ? <Spinner/> : null}                    
                    <input className="btn btn-success" type="button" value="Agregar registro" onClick={agregarAlimento} disabled={!botonRegistro}/>
                              
        </div>                    
    </div>
  )
}

export default RegistroAlimento