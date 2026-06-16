import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';

import './Options.css'

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

    const optClickLocalizacao = () => {
        navigate("/localizacao")
    }

    const optClickProduto = () => {
        navigate("/produto")
    }


    return (
        <div className='Options'>

            <button onClick={optClickUser}>Usuários</button>
            <button onClick={optClickCategoria}>Categorias</button>
            <button onClick={optClickFornecedores}>Fornecedores</button>
            <button onClick={optClickLocalizacao}>Localizações</button>
            <button onClick={optClickProduto}>Produtos</button>

        </div>
  )
}

export default Options