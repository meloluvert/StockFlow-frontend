import React, { useState} from 'react'
import './AdicionarUsuarios.css'
import { supabase } from '../../../config/supabase';

function AdicionarUsuarios({ showModal, setShowModal }){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [cargo, setCargo] = useState('funcionario');

    const handleCreateUser = async (e) => {
    e.preventDefault();

    console.log("executei")

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      options: {
        data: {
          nome,
          cpf,
          cargo,
        },
      },
    });


    if (error) {
      alert(error.message)
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
        <div className="modal-usuario">
            <div className="overlay"></div>
            <div className="modal-usuario-conteudo">
                <h1>Adicionar Usuários</h1>
                <form>

                <label>Email:</label>
                    <input type="email" placeholder="email@exemplo.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                
                <label>Senha:</label>
                    <input type="password" placeholder='senha' value={password} onChange={(e) => setPassword(e.target.value)}/>
                
                <label>Nome completo:</label>
                    <input type="text" placeholder='nome completo' value={nome} onChange={(e) => setNome(e.target.value)}/>
            
                <label>CPF:</label>
                    <input type="text" placeholder='CPF' value={cpf} onChange={(e) => setCpf(e.target.value)}/>
            
                <label>Cargo:</label>
                    <select value={cargo} onChange={(e) => setCargo(e.target.value)}>
                    <option value="funcionario">funcionario</option>
                    <option value="gerente">gerente</option>
                    </select>

                <button className="btn-adicionar" onClick={(e) => {handleCreateUser(e); toggleModal()}}>Adicionar</button>
                <button className="btn-cancelar" onClick={toggleModal} type="button">Cancelar</button>

                </form>

            </div>
        </div>)}
    </>
  );
}

export default AdicionarUsuarios