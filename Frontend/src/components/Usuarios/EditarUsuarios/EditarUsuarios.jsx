import React, { useState, useEffect } from 'react'
import './EditarUsuarios.css'
import { supabase } from '../../../config/supabase';

function EditarUsuarios({ showModal, setShowModal, usuario }){
    const [editingUserId, setEditingUserId] = useState(null);
    const [editNome, setEditNome] = useState('');
    const [editCargo, setEditCargo] = useState('');
    const [editStatus, setEditStatus] = useState('ativo');

    useEffect(() => {
        if (usuario) {
            setEditingUserId(usuario.id);
            setEditNome(usuario.nome || '');
            setEditCargo(usuario.cargo || 'funcionario');
            setEditStatus(usuario.status || 'ativo');
        }
    }, [usuario]);

    const handleSaveUser = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase
            .from('usuarios')
            .update({ nome: editNome, cargo: editCargo, status: editStatus })
            .eq('id', editingUserId)
            .select()
            .single();

            console.log(data)
            console.log(error)
        setEditingUserId(null);
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
        <div className="modal-editar-usuario">
            <div className="overlay"></div>
            <div className="modal-editar-usuario-conteudo">
                <h1>Editar Usuário</h1>
                <form>

                <label>Nome completo:</label>
                    <input type="text" placeholder='nome completo' value={editNome} onChange={(e) => setEditNome(e.target.value)}/>
        
                <label>Cargo:</label>
                    <select value={editCargo} onChange={(e) => setEditCargo(e.target.value)}>
                    <option value="funcionario">funcionario</option>
                    <option value="gerente">gerente</option>
                    </select>

                <label>Status:</label>
                    <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
                    <option value="ativo">ativo</option>
                    <option value="inativo">inativo</option>
                    </select>

                <button className="btn-adicionar-edicao" onClick={(e) => {handleSaveUser(e); toggleModal()}}>Salvar</button>
                <button className="btn-cancelar" onClick={toggleModal} type="button">Cancelar</button>

                </form>

            </div>
        </div>)}
    </>
  );
}

export default EditarUsuarios