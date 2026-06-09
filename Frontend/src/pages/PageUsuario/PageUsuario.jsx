import React, { useState } from 'react'
import ListaUsuarios from '../../components/Usuarios/ListaUsuarios/ListaUsuarios'
import AdicionarUsuarios from '../../components/Usuarios/AdicionarUsuarios/AdicionarUsuarios'
import './PageUsuario.css'

function PageUsuario({session}) {
  const [showModal, setShowModal] = useState(false)
  //const gerente = session.user.options.data.cargo === 0;

  return (
    <div>
      {/*
      {gerente && (
        <div className='funcoes-gerente'>
          <button onClick={() => setShowModal(true)}></button>
          <AdicionarUsuarios 
            showModal={showModal} 
            setShowModal={setShowModal} 
          />
        </div>
      )}*/}

        <div className='funcoes-gerente'>
        <button onClick={() => setShowModal(true)}>Adicionar Usuarios</button>
        <AdicionarUsuarios 
          showModal={showModal} 
          setShowModal={setShowModal} 
        />

      </div>
      <ListaUsuarios session={session} />
    </div>
  )
}

export default PageUsuario