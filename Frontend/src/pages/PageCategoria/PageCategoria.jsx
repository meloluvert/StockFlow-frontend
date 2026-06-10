import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import ListaCategorias from '../../components/Categorias/ListaCategorias/ListaCategorias';
import AdicionarCategoria from '../../components/Categorias/AdicionarCategorias/AdicionarCategorias';
import Navbar from '../../components/Navbar/Navbar';
import './PageCategoria.css'

function PageCategoria({session}) {
  if (!session) {
    return <Navigate to="/" replace />;
  }

  const [showModal, setShowModal] = useState(false)
  const gerente = session.user.user_metadata.cargo === "gerente";


  return (
    <div className='PageCategoria'>
      <Navbar session={session} />
      <div className='PageCategoria-content'>

        {gerente && (
          <div className='funcoes-gerente'>
            <button onClick={() => setShowModal(true)}>Adicionar Categorias</button>
            <AdicionarCategoria 
              showModal={showModal} 
              setShowModal={setShowModal} 
            />
          </div>
        )}
        <ListaCategorias session = {session}/>

      </div>
    </div>
  )
}

export default PageCategoria