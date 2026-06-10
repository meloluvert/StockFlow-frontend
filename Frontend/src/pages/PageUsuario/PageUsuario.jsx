import React, { useState } from 'react'
import ListaUsuarios from '../../components/Usuarios/ListaUsuarios/ListaUsuarios'
import AdicionarUsuarios from '../../components/Usuarios/AdicionarUsuarios/AdicionarUsuarios'
import Navbar from '../../components/Navbar/Navbar'
import './PageUsuario.css'

function PageUsuario({session}) {
  const [showModal, setShowModal] = useState(false)
  const gerente = session.user.user_metadata.cargo === "gerente";

  return (
    <div className='PageUsuario'>
      <Navbar session={session}/>
      <div className='PageUsuario-content'>

        {gerente && (
          <div className='funcoes-gerente'>
            <button onClick={() => setShowModal(true)}>Adicionar Usuarios</button>
            <AdicionarUsuarios 
              showModal={showModal} 
              setShowModal={setShowModal} 
            />
          </div>
        )}
        <ListaUsuarios session={session} />
      </div>
    </div>
  )
}

export default PageUsuario