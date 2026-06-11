import React, { useState } from 'react'
import { supabase } from '../../../config/supabase'

import './AdicionarFornecedores.css'

function AdicionarFornecedores({ showModal, setShowModal}) {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [cnpj, setCnpj] = useState('');

    const handleSave = async (e) => {
        e.preventDefault();

        if (!nome.trim()) {
        alert('Nome é obrigatório.');
        return;
        }

        const payload = { nome: nome.trim(), descricao: descricao.trim(), cnpj: cnpj.trim()};
        const { data, error } = await supabase.from('fornecedores').insert(payload).select().single();

        if (error) {
        console.log(error.message);
        return;
        }
    };

    const toggleModal = () => {
        setShowModal(prev => !showModal)
    }

    if(showModal)
    {
        document.body.classList.add("active-modal")
    }else{
        document.body.classList.remove("active-modal")
    }

return (
    <>
    {showModal && (    
        <div className="modal-fornecedores">
            <div className="overlay"></div>
            <div className="modal-fornecedores-conteudo">
                <h1>Adicionar Fornecedor</h1>
                <form>

                <label>Nome:</label>
                    <input type="text" placeholder='Nome' value={nome} onChange={(e) => setNome(e.target.value)}/>
            
                <label>Descrição:</label>
                    <input type="text" placeholder='Descrição' value={descricao} onChange={(e) => setDescricao(e.target.value)}/>

                <label>CNPJ:</label>
                    <input type="text" placeholder='CNPJ' value={cnpj} onChange={(e) => setCnpj(e.target.value)}/>
            
                <button className="btn-adicionar" onClick={(e) => {handleSave(e); toggleModal()}}>Adicionar</button>
                <button className="btn-cancelar" onClick={toggleModal} type="button">Cancelar</button>

                </form>

            </div>
        </div>)}
    </>
  );

}

export default AdicionarFornecedores