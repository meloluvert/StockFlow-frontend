import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

import Navbar from '../../components/Navbar/Navbar'
import AdicionarMovimentacao from '../../components/Movimentacao/AdicionarMovimentacao/AdicionarMovimentacao'
import ListarMovimentacao from '../../components/Movimentacao/ListarMovimentacao/ListarMovimentacao'

import './PageMovimentacao.css'

function PageMovimentacao({session}) {
    if (!session) {
        return <Navigate to="/" replace />;
    }

    const [showModal, setShowModal] = useState(false)
    const gerente = session.user.user_metadata.cargo === "gerente";

    return (
        <div className='PageMovimentacao'>
            <Navbar session={session} />
            <div className='PageMovimentacao-content'>

            {gerente && (
                <div className='funcoes-gerente'>
                    <button onClick={() => setShowModal(true)}>Adicionar Movimentação</button>
                    <AdicionarMovimentacao 
                    showModal={showModal} 
                    setShowModal={setShowModal}
                    />
                </div>
            )}

            <ListarMovimentacao session = {session}/>

            </div>
        </div>
    )
}

export default PageMovimentacao