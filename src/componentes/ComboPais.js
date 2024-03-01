const ComboPais = ({ idPais, name }) => {
    return ( 
          <option value={`${idPais}`} >{name}</option>      
        
    )
}

export default ComboPais