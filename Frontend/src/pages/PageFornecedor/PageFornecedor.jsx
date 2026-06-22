import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

import Navbar from '../../components/Navbar/Navbar'
import ListaFornecedores from '../../components/Fornecedores/ListaFornecedor/ListaFornecedores'
import AdicionarFornecedores from '../../components/Fornecedores/AdicionarFornecedores/AdicionarFornecedores'

import './PageFornecedor.css'

function PageFornecedor({session}) {
  if (!session) {
    return <Navigate to="/" replace />;
  }

  const [showModal, setShowModal] = useState(false)
  const gerente = session.user.user_metadata.cargo === "gerente";

  return (
    <div className='PageFornecedor'>

        <Navbar session={session}/>

        <div className='PageFornecedor-content'>

            {gerente && (
                <div className='funcoes-gerente'>

                    <button onClick={() => setShowModal(true)}>Adicionar Fornecedor</button>

                    <AdicionarFornecedores 
                    showModal={showModal} 
                    setShowModal={setShowModal} 
                    />

                </div>
            )}

            <ListaFornecedores session={session}/>

        </div>
    </div>
  )
}

export default PageFornecedor