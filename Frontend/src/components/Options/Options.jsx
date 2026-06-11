import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';

function Options() {
   const navigate = useNavigate();

    const optClickUser = () => {
        navigate("/usuario")
    }

    const optClickCategoria = () => {
        navigate("/categoria")
    }

    const optClickFornecedores = () => {
        navigate("/fornecedor")
    }


    return (
        <div className='Options'>

            <button onClick={optClickUser}>Usuários</button>
            <button onClick={optClickCategoria}>Categorias</button>
            <button onClick={optClickFornecedores}>Fornecedores</button>

        </div>
  )
}

export default Options