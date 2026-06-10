import React, { useEffect, useState } from 'react';
import { supabase } from '../../../config/supabase';

function ListaUsuarios({session}) {
  const [usuarios, setUsuarios] = useState([]);
  const [search, setSearch] = useState('')

  const handleRowClick = () => {
    alert("row clicada")
  }

  const fetchUsuarios = async () => {
    const { data, error } = await supabase.from('usuarios').select('*');

    console.log(data);
    console.log(error);

    setUsuarios(data || []);
  };


  return (
    <div>
        <div >
        <h3>Listagem de Usuários</h3>

        <button type="button" onClick={fetchUsuarios}>Carregar usuários</button>
          
          <label className='form-search'>Buscar</label>
          <input className='input-search' type={Text} value={search} onChange={(e) => setSearch(e.target.value)}/>
         
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
                usuario.cargo.toLowerCase().includes(search)

              }).map
              ((usuario) => {
                return (
                  <tr key={usuario.id} onClick={handleRowClick}>
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
      </div> 
    </div>
  );
}    


export default ListaUsuarios