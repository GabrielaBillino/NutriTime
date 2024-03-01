import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import markerIcon from '../../imagen/loc.png';
import Spinner  from '../Spinner';
import {spinnerCargando} from '../../features/spinnerSlice';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {cargarUsuarioPais} from '../../features/paises.Slice';
import { cargarPais } from '../../features/paises.Slice';

const MapaUserPais = () => {

  const url = "https://calcount.develotion.com/";
 
 // const listaPaises = useSelector(state => state.pais.pais);
  const usuarioLogueado = useSelector(state => state.usuario.usuarioLogueado);
  const usuarioCarga = useSelector(state => state.spinner.loading);

  const [userPaises, setUserPaises] = useState([]);
  const [paises, setPaises] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();


useEffect(() => {
  dispatch(spinnerCargando(true));
  //Carga usuario por paises*******
  fetch(`${url}/usuariosPorPais.php`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'apikey': localStorage.getItem('token'),
        'iduser': localStorage.getItem('id'),
    },

  })
    .then(response => response.json())
    .then(data => {
        dispatch(cargarUsuarioPais(data.paises));
        setUserPaises(data.paises);
        dispatch(spinnerCargando(false));
    })
    .catch(error => {
        console.error('Error:', error);
        setError(error);
    });

}, []);

useEffect(() => {
  fetch(`${url}/paises.php`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },

  })
    .then(response => response.json())
    .then(data => {    
      
        dispatch(cargarPais(data.paises));
        setPaises(data.paises);
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }, []);
//--------------------------------------------------------------------------------------------------


const customMarkerIcon = L.icon({
  iconUrl: markerIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

const markersData = paises.map(pais => {
  const userPais = userPaises.find(userP => userP.id === pais.id);
  const cantidad = userPais ? userPais.cantidadDeUsuarios : 0;
  
  return {
    lat: pais.latitude,
    lng: pais.longitude,
    cantidad: cantidad,
    pais: pais.name,
  };
});
 
const maxMarkers = 10;
const marcadoresFiltrados = markersData.slice(0, maxMarkers);


  return (
    <div className="tarjeta">
    {usuarioCarga ? <Spinner /> : null}   
    <div >
      <h2>Mapa Usuario por País</h2>
          <MapContainer center={[ -32.522779, -55.765835]} zoom={4} style={{ height: '400px', width: '100%' }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {marcadoresFiltrados.map(marker => (
                      <Marker key={`${marker.lat}-${marker.lng}`} position={[marker.lat, marker.lng]} icon={customMarkerIcon}>
                          <Popup>
                              <h3>{marker.pais}</h3>
                              <p>Cantidad de usuarios: {marker.cantidad}</p>
                          </Popup>
                      </Marker>
                      ))}
          </MapContainer>
      </div>  

  </div>
)
  
}

export default MapaUserPais
