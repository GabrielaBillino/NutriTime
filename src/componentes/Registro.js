import { useEffect, useState, useRef } from "react";

import { useNavigate, NavLink } from "react-router-dom"
import {cargarPais} from '../features/paises.Slice';
import { useSelector, useDispatch } from 'react-redux';
import { logearUsuario } from '../features/usuarioSlice';

const Registro = () => {
  let token ="";
  let usuarioLogueado = "";
  let idUsuario = "";
  let url = "https://calcount.develotion.com/";
  const [paises, setPaises] = useState([]);
  
  const usuario = useRef(null);
  const password = useRef(null);
  const caloriasDiarias = useRef(null);
  const paisR = useRef(null);

  
  const [botonRegistro, setBotonRegistro] = useState(false);
  const [mensajeError, setMensajeError] = useState(null)
  const [mje, setMje] = useState(false);

  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
      fetch(`${url}/paises.php`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },

      })
        .then(response => response.json())
        .then(data => {
            console.log(data);
          
            dispatch(cargarPais(data.paises));
            setPaises(data.paises);
        })
        .catch(error => {
            console.error('Error:', error);
            setMensajeError(error);
        });
      }, []);
  
  const [selectedIdPais, setIdPais] = useState('');

  const handleSelectChange = (event) => {
    setIdPais(event.target.value);
  }

  const cambioInput = event => {
    usuario.current.value && password.current.value && caloriasDiarias.current.value ? setBotonRegistro(true): setBotonRegistro(false)
  }

      const AgregarRegistro = (event) => {        
        console.log("Agregar registro");
          const bodyData = {
            usuario: usuario.current.value,
            password: password.current.value,
            idPais: paisR.current.value,
            caloriasDiarias: caloriasDiarias.current.value
    
          };         
  
        fetch(`${url}/usuarios.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData)
            })
            .then(response => response.json())
            .then(data => {    
             
                if(data.codigo === 200){
                  const userLogueado = {
                    user: usuario.current.value,
                    pass: password.current.value,
                    id: data.id,
                    calorias: caloriasDiarias.current.value,
                  }
                  dispatch(logearUsuario(userLogueado));
                  token = data.apiKey;
                  idUsuario = data.id;
                  usuarioLogueado = usuario.current.value;
                  localStorage.setItem('token', token);
                  localStorage.setItem('usuario', usuarioLogueado); 
                  localStorage.setItem('id', idUsuario);
                  localStorage.setItem('calorias', caloriasDiarias.current.value);  
                  //Navegar a Dashboard
                  console.log("registro"+ data.mensaje);
                  setMje(data.mensaje);
                  navigate('../dashboard');
                  
                }else{                 
                  setMensajeError(data.mensaje);
                }
                      
            })
            .catch(error => {
                console.error('Error:', error);
                setMensajeError(error);
            });
        
        }
       
  
  return ( 
    <div className='registro'>
    <div  id='seccionLogin' className='row justify-content-center align-items-center mt-5'>
              <h3>Registro Usuario</h3>
              <br/>
              <div className="inputLabel">
                <label htmlFor="txtUsuario">Usuario: </label>
                <input type="text" name="txtUsuario" id="txtUsuario" ref={usuario} onChange={cambioInput} required/>
              </div>             
              <br/><br/>
              <div className="inputLabel">
                  <label htmlFor="txtPass">Contraseña: </label>
                  <input type="password" name="txtPass" id="txtPass" ref={password} onChange={cambioInput} required/>
              </div>              
              <br/><br/>           
               <div className="inputLabel">
                        <label htmlFor="txtPais">Pais origen:</label>
                        <select htmlFor="slcPais" id="slcPais" name="txtPais" ref={paisR} >
                           
                              {paises.map(p => <option key={p.id} value={p.id}>{p.name}
                            </option>)}
                                
                      </select>
                </div>                      
             
              <br/><br/>
              <div className="inputLabel">
                <label htmlFor="txtUCalorias">Calorias diarias:</label>
                <input type="number" name="txtUCalorias" id="txtUCalorias" ref={caloriasDiarias} min="1" onChange={cambioInput} required/>
              </div>
            
              <br/><br/>
              <NavLink className="nav-link" to="/">Tengo cuenta</NavLink>    
              <input className="btn btn-success" type="button" value="Registrar" disabled={!botonRegistro} onClick={AgregarRegistro} />
              {mensajeError ? <p>{mensajeError}</p>  : null}
              {mje ? <p>{mje}</p>  : null}
          </div>
      </div>
    
    
  )
}

export default Registro