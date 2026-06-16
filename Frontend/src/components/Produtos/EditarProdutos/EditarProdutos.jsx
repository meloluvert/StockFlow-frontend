import React, { useState , useEffect } from 'react'
import { supabase } from '../../../config/supabase'

import './EditarProdutos.css'

function EditarProdutos({ showModal, setShowModal, item }) {
    const [editNome, setEditNome] = useState('');
    const [editDescricao, setEditDescricao] = useState('');
    const [editPreco, setEditPreco] = useState('');
    const [editStatus, setEditStatus] = useState('ativo');
    const [editingItemId, setEditingItemId] = useState(null);

    useEffect(() => {
        if (item) {
            setEditingItemId(item.id);
            setEditNome(item.nome || '');
            setEditDescricao(item.descricao || '');
            setEditPreco(item.preco || '');
            setEditStatus(item.status || 'ativo');
        }
    }, [item]);

    const handleSaveItem = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase
            .from('produtos')
            .update({nome: editNome, descricao: editDescricao, preco: editPreco, status: editStatus })
            .eq('id', editingItemId)
            .select()
            .single();

            console.log(data)
            console.log(error)
        setEditingItemId(null);
    };


    const toggleModal = () => {
        setShowModal(prev => !showModal)
    }

    if(showModal){
        document.body.classList.add("active-modal")
    }else{
        document.body.classList.remove("active-modal")
    }

  return (
    <>
    {showModal && (    
        <div className="modal-editar-produtos">
            <div className="overlay"></div>
            <div className="modal-editar-produtos-conteudo">
                <h1>Editar Categoria</h1>
                <form>

                <label>Nome:</label>
                    <input type="text" placeholder='nome do produto' value={editNome} onChange={(e) => setEditNome(e.target.value)}/>
            
                <label>Descrição:</label>
                    <input type="text" placeholder='descrição do produto' value={editDescricao} onChange={(e) => setEditDescricao(e.target.value)}/>

                <label>Preço:</label>
                    <input type="number" placeholder='Preço' value={editPreco} onChange={(e) => setEditPreco(e.target.value)}/>

                <label>Status:</label>
                    <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
                    <option value="ativo">ativo</option>
                    <option value="inativo">inativo</option>
                    </select>

                <button className="btn-adicionar-edicao" onClick={(e) => {handleSaveItem(e); toggleModal()}}>Salvar</button>
                <button className="btn-cancelar" onClick={toggleModal} type="button">Cancelar</button>

                </form>

            </div>
        </div>)}
    </>
  );
}

export default EditarProdutos