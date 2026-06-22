import React, { useState } from 'react'
import { supabase } from '../../../config/supabase'

import EditarFornecedores from '../EditarFornecedor/EditarFornecedores';

import './ListaFornecedores.css'

function ListaFornecedores({session}) {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const isGerente = session.user.user_metadata.cargo === "gerente";

  const fetchFornecedores = async () => {

    const { data, error } = await supabase.from('fornecedores').select('*');
    setItems(data || []);

  }

  const handleRowClick = (item) => {
    if (!isGerente){
      return
    }

    setSelectedItem(item)
    setShowModal(true)
  }



  return (
    <div>
        <div className='listagem-fornecedores'>
        <h1>Listagem de Fornecedores</h1>

        <button className="btn-adicionar" type="button" onClick={fetchFornecedores}>Carregar Fornecedores</button>
          
          <input className='input-search' placeholder='Buscar' type={Text} value={search} onChange={(e) => setSearch(e.target.value)}/>
         
          <table>
            <thead>
                <tr> 
                    <th>Nome</th>
                    <th>CNPJ</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
              {items.filter((item) => {
                return search === '' ? item :
                item.nome.toLowerCase().includes(search) ||
                item.status.toLowerCase().includes(search)
              }).map
              ((item) => {
                return (
                  <tr 
                    key={item.id} onClick={(e) => handleRowClick(item)}
                    className={isGerente ? "clickable-row" : ""}
                  >
                    <td>{item.nome}</td>
                    <td>{item.cnpj}</td>
                    <td>{item.status}</td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>
          <EditarFornecedores
              showModal={showModal} 
              setShowModal={setShowModal}
              item={selectedItem}/>
      </div> 
    </div>
  );
}    

export default ListaFornecedores