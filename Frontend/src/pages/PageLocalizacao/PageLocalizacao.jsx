import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

import Navbar from '../../components/Navbar/Navbar'
import ListaLocalizacoes from '../../components/Localizacao/ListaLocalizacoes/ListaLocalizacoes'
import AdicionarLocalizacoes from '../../components/Localizacao/AdicionarLocalizacoes/AdicionarLocalizacoes'

import './PageLocalizacao.css'

function PageLocalizacao({session}) {
    if (!session) {
    return <Navigate to="/" replace />;
    }

    const [showModal, setShowModal] = useState(false)
    const gerente = session.user.user_metadata.cargo === "gerente";

  return (
    <div className='PageLocalizacao'>

        <Navbar session={session}/>

        <div className='PageLocalizacao-content'>

            {gerente && (
                <div className='funcoes-gerente'>

                    <button onClick={() => setShowModal(true)}>Adicionar Localização</button>

                    <AdicionarLocalizacoes 
                    showModal={showModal} 
                    setShowModal={setShowModal} 
                    />

                </div>
            )}

            <ListaLocalizacoes session={session}/>

        </div>
    </div>
  )
}

export default PageLocalizacao