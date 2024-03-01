import { useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { logearUsuario } from '../features/usuarioSlice';
import { spinnerCargando } from '../features/spinnerSlice';
import { cargarAlimentos } from "../features/alimentosSlice";
import { cargarRegistros } from "../features/registrosSlice";
import Spinner from './Spinner';

const Login = () => {
  let navigate = useNavigate();
  let url = "https://calcount.develotion.com/";
  let token ="";
  let usuarioLogueado = "";
  let idUsuario = "";

  const irRegistro= (event) =>{
    navigate('registro');

  }
  const usuarioCarga = useSelector(state => state.spinner.loading);
  const dispatch = useDispatch();

  const usuario = useRef(null);
  const password = useRef(null);

  const [mensajeError, setMensajeError] = useState(null);
  const [error, setError] = useState(false);
  const [botonRegistro, setBotonRegistro] = useState(false);

  const cambioInput = event => {
    usuario.current.value && password.current.value ? setBotonRegistro(true): setBotonRegistro(false)
  }


  const loguearse = (event) =>{
    dispatch(spinnerCargando(true));
 

    const bodyData = {
        "usuario": usuario.current.value,
        "password": password.current.value
    };

    fetch(`${url}/login.php`, {
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
              calorias: data.caloriasDiarias, 
            }
            dispatch(logearUsuario(userLogueado));
            token = data.apiKey;
            idUsuario = data.id;
            usuarioLogueado = usuario.current.value;
            localStorage.setItem('token', token);
            localStorage.setItem('usuario', usuarioLogueado); 
            localStorage.setItem('id', idUsuario);  
            localStorage.setItem('calorias', data.calorias);
            
            setMensajeError(null);
            setError(false);
           
            navigate('../dashboard');
            dispatch(spinnerCargando(false));
          }else{
            alert(data.mensaje);
            dispatch(spinnerCargando(false));
            setError(true);
            setMensajeError(data.mensaje);
          }

      })
      .catch(error => {
          console.error('Error:', error);
          setError(true);
          setMensajeError(error);
      });
  }


  return (
          <div className='registro'>
             <div  id='seccionLogin' className='row justify-content-center align-items-center mt-5'>
                <h3>Bienvenido</h3>
                <br/>
                <div > 
                  <label htmlFor="txtUsuario">Usuario: </label>
                  <input type="text" name="txtUsuario" id="txtUsuario" placeholder='Ingrese su usuario' onChange={cambioInput} ref={usuario} required/>
                </div>              
                <br/><br/>
                <div > 
                  <label htmlFor="txtPass">Contraseña: </label>
                  <input type="password" name="txtPass" id="txtPass" placeholder='Ingrese contraseña' onChange={cambioInput} ref={password} required/>
                </div>               
                <br/><br/>
                <div className='botonLogin'>
                  <input className="btn btn-success" type="button" value="Registrarse" onClick={irRegistro} />
                  <input className="btn btn-success" type="button" value="Login" disabled={!botonRegistro} onClick={loguearse}/>
                </div>
                {error ? <p>{mensajeError}</p> : null}
                {usuarioCarga ? <Spinner/> : null}
            </div>
          </div>
        

   
    
  )
}

export default Login