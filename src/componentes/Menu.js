import { Outlet} from "react-router-dom" 
import { useNavigate, NavLink } from "react-router-dom"

const Menu = () => {
  let navigate = useNavigate();

  const logout = (event) => {
    localStorage.clear();
    navigate('/');
  }

  return (

    <div>
    <nav className="navbar navbar-expand-lg  " style={{ backgroundColor: 'var(--navbar-verde)' }}>
        <div className="container-fluid">
            <NavLink className="navbar-brand" to="/dashboard" ><strong>NUTRATION TIME</strong></NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <NavLink className="nav-link" to="/dashboard">Principal</NavLink>
                    <NavLink className="nav-link" to="/" onClick={logout}>Salir</NavLink>
                </div>
            </div>
            {localStorage.getItem("usuario") ? <span className='navbar-text'><strong>Bienvenido {localStorage.getItem("usuario")}</strong></span> : null}
        </div>
    </nav>
    
    <Outlet/>
</div>
  )
}

export default Menu