import React, { useState } from 'react'
import { supabase } from '../../../config/supabase'

import './AdicionarLocalizacoes.css'

function AdicionarLocalizacoes({ showModal, setShowModal }) {
    const [nome, setNome] = useState('');
    const [tipo, setTipo] = useState('galpao');
    const [descricao, setDescricao] = useState('');

    const handleSave = async (e) => {
        e.preventDefault();

        console.log("executei")

        if (!nome.trim()) {
        alert('Nome é obrigatório.');
        return;
        }

        const payload = { nome: nome.trim(), descricao: descricao.trim(), tipo};
        const { data, error } = await supabase.from('localizacoes').insert(payload).select().single();

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
        <div className="modal-categoria">
            <div className="overlay"></div>
            <div className="modal-categoria-conteudo">
                <h1>Adicionar Categoria</h1>
                <form>

                <label>Nome:</label>
                    <input type="text" placeholder='Nome' value={nome} onChange={(e) => setNome(e.target.value)}/>

                <label>Descrição:</label>
                    <input type="text" placeholder='Descrição' value={descricao} onChange={(e) => setDescricao(e.target.value)}/>

                <label>Tipo:</label>
                    <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                        <option value="galpao">galpão</option>
                        <option value="sala">sala</option>
                        <option value="camara_fria">camara_fria</option>
                        <option value="deposito">deposito</option>
                        <option value="recebimento">recebimento</option>
                        <option value="estoque_seco">estoque_seco</option>
                        <option value="patio">patio</option>
                    </select>
            
                <button className="btn-adicionar" onClick={(e) => {handleSave(e); toggleModal()}}>Adicionar</button>
                <button className="btn-cancelar" onClick={toggleModal} type="button">Cancelar</button>

                </form>

            </div>
        </div>)}
    </>
  );
}

export default AdicionarLocalizacoes