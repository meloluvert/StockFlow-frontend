import React from 'react'
import ListaCategorias from '../../components/ListaCategorias/ListaCategorias'

function PageCategoria({session}) {
  return (
    <div>
        <ListaCategorias session = {session}/>
    </div>
  )
}

export default PageCategoria