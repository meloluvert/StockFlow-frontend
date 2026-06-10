import React, { useState, useEffect } from 'react'
import './EditarCategorias.css'
import { supabase } from '../../../config/supabase';

function EditarCategorias({ showModal, setShowModal, item }){
    const [editingItemId, setEditingItemId] = useState(null);
    const [editDescricao, setEditDescricao] = useState('')
    const [editStatus, setEditStatus] = useState('ativo');

    useEffect(() => {
        if (item) {
            setEditingItemId(item.id);
            setEditDescricao(item.descricao || '');
            setEditStatus(item.status || 'ativo');
        }
    }, [item]);

    const handleSaveItem = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase
            .from('categorias_produtos')
            .update({ descricao: editDescricao, status: editStatus })
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

    if(showModal)
    {
        document.body.classList.add("active-modal")
    }else{
        document.body.classList.remove("active-modal")
    }

  return (
    <>
    {showModal && (    
        <div className="modal-editar-categoria">
            <div className="overlay"></div>
            <div className="modal-editar-categoria-conteudo">
                <h1>Editar Usuário</h1>
                <form>

                <label>Descrição:</label>
                    <input type="text" placeholder='Descrição' value={editDescricao} onChange={(e) => setEditDescricao(e.target.value)}/>
        
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

export default EditarCategorias