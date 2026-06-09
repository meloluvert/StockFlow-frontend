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
                <h1>Adicionar Usuários</h1>
                <form>

                <label>Email:</label>
                    <input type="email" placeholder="email@exemplo.com"/>
                
                <label>Senha:</label>
                    <input type="password" placeholder='senha'/>
                
                <label>Nome completo:</label>
                    <input type="text" placeholder='nome completo'/>
            
                <label>CPF:</label>
                    <input type="text" placeholder='CPF'/>
            
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