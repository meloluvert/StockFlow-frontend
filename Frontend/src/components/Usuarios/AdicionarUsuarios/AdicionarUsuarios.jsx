import React, { useState} from 'react'
import './AdicionarUsuarios.css'

function AdicionarUsuarios({ showModal, setShowModal }){
    
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
        <div className="modal-usuario">
            <div className="overlay"></div>
            <div className="modal-usuario-conteudo">
                <h3>Adicionar Usuários</h3>
                <form>

                <label>Email:</label>
                    <input type="email"/>
                
                <label>Senha:</label>
                    <input type="password"/>
                
                <label>Nome completo:</label>
                    <input type="text"/>
            
                <label>CPF:</label>
                    <input type="text"/>
            
                <label>Cargo:</label>
                    <select>
                    <option value="funcionario">funcionario</option>
                    <option value="gerente">gerente</option>
                    </select>

                <button className="btn-adicionar">Adicionar</button>
                <button className="btn-cancelar" onClick={toggleModal} type="button">Cancelar</button>

                </form>

            </div>
        </div>)}
    </>
  );
}

export default AdicionarUsuarios