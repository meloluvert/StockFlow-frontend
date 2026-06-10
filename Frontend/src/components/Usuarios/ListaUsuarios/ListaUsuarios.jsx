import React, { useEffect, useState } from 'react';
import { supabase } from '../../../config/supabase';
import EditarUsuarios from '../EditarUsuarios/EditarUsuarios.jsx'
import './ListaUsuarios.css'

function ListaUsuarios({session}) {
  const [usuarios, setUsuarios] = useState([]);
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false);
  const [selectedUsuario, setSelectedUsuario] = useState(null);

   const isGerente = session.user.user_metadata.cargo === "gerente";

  const handleRowClick = (usuario) => {
    if (!isGerente){
      return
    }

    setSelectedUsuario(usuario)
    setShowModal(true)
  }

  const fetchUsuarios = async () => {
    const { data, error } = await supabase.from('usuarios').select('*');

    console.log(data);
    console.log(error);

    setUsuarios(data || []);
  };


  return (
    <div>
        <div className='listagem-usuario'>
        <h1>Listagem de Usuários</h1>

        <button className="btn-adicionar" type="button" onClick={fetchUsuarios}>Carregar usuários</button>
          
          <input className='input-search' placeholder='Buscar' type={Text} value={search} onChange={(e) => setSearch(e.target.value)}/>
         
          <table>
            <thead>
                <tr> 
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Cargo</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
              {usuarios.filter((usuario) => {
                return search === '' ? usuario :
                usuario.cpf.toString().includes(search) ||
                usuario.cargo.toLowerCase().includes(search) ||
                usuario.status.toLowerCase().includes(search)
              }).map
              ((usuario) => {
                return (
                  <tr 
                    key={usuario.id} onClick={(e) => handleRowClick(usuario)}
                    className={isGerente ? "clickable-row" : ""}
                  >
                    <td>{usuario.nome}</td>
                    <td>{usuario.cpf}</td>
                    <td>{usuario.cargo}</td>
                    <td>{usuario.status}</td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>
          <EditarUsuarios
              showModal={showModal} 
              setShowModal={setShowModal}
              usuario={selectedUsuario}/>
      </div> 
    </div>
  );
}    


export default ListaUsuarios