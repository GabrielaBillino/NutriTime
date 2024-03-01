import React, { useState, useEffect } from 'react';

const TiempoRestObj = () => {
    const [daysDiff, setDaysDiff] = useState(0);

    useEffect(() => {
        const now = Date.now();
        const endDate = new Date(2024, 2, 31);
        const diffMs = endDate - now;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        setDaysDiff(diffDays);
      }, []);


  return (
        <div className="tarjeta">
            <h3>Tiempo restante para definir nuevos objetivos</h3>
            <br/>
            <p className="alert alert-danger alert-heading text-center" role="alert"><strong>Días restantes para finalizar plan son: {daysDiff}</strong></p>
            
        </div>
  )
}

export default TiempoRestObj
