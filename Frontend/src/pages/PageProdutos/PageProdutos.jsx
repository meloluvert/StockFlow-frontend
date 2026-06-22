import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import AdicionarProdutos from '../../components/Produtos/AdicionarProdutos/AdicionarProdutos';
import ListarProdutos from '../../components/Produtos/ListarProdutos/ListarProdutos';
import EditarProdutos from '../../components/Produtos/EditarProdutos/EditarProdutos';
import ListarProdutosEmFalta from '../../components/Produtos/ListarProdutosEmFalta/ListarProdutosEmFalta';

import './PageProdutos.css'

function PageProdutos({session}) {
    if (!session) {
        return <Navigate to="/" replace />;
    }

    const [showModal, setShowModal] = useState(false)
    const gerente = session.user.user_metadata.cargo === "gerente";

    return (
        <div className='PageProduto'>
            <Navbar session={session} />
            <div className='PageProduto-content'>

            {gerente && (
                <div className='funcoes-gerente'>
                    <button onClick={() => setShowModal(true)}>Adicionar Produto</button>
                    <AdicionarProdutos 
                    showModal={showModal} 
                    setShowModal={setShowModal} 
                    />
                </div>
            )}
            <ListarProdutos session = {session}/>
            <ListarProdutosEmFalta/>

            </div>
        </div>
    )
}

export default PageProdutos