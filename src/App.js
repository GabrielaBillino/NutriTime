import './App.css';
import Dashboard from './componentes/dashboard/Dashboard';
import Login from './componentes/Login';
import Registro from './componentes/Registro';
import Menu from './componentes/Menu'
import './estilos.css';
import './bootstrap-5.3.2-dist/css/bootstrap.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store/store';
import 'leaflet/dist/leaflet.css';

const App = () => {
  return (
   
      <Provider store={store}>
            <BrowserRouter>
                  <Routes>
                    <Route path='/' element={<Login/>}/>
                    <Route path='registro' element={<Registro/>}/>
                    
                    <Route path='/dashboard' element={<Menu/>}>                      
                      <Route path='/dashboard' element={<Dashboard/>}/>
                    </Route>

                  </Routes>
            </BrowserRouter>     
          
      </Provider>
    
   
  );
}

export default App;