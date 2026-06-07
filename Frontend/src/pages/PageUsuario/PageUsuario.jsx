import React from 'react'
import ListaUsuarios from '../../components/ListaUsuarios/ListaUsuarios'

function PageUsuario({session}) {
  return (
    <div>
        <ListaUsuarios session={session} />
    </div>
  )
}

export default PageUsuario