import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';

function Options() {
   const navigate = useNavigate();

    const optClick = () => {
        navigate("/usuario")
    }

    return (
        <div className='Options'>
            <button onClick={optClick}>Usuários</button>
            <button>Categorias</button>
        </div>
  )
}

export default Options