import React, { useEffect, useState } from 'react';
import { supabase } from '../../../config/supabase';
import EditarCategorias from '../EditarCategorias/EditarCategorias'
import "./ListaCategorias.css"

function ListaCategorias({session}) {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const isGerente = session.user.user_metadata.cargo === "gerente";

  const fetchCategorias = async () => {

    const { data, error } = await supabase.from('categorias_produtos').select('*');
    setItems(data || []);

  };

  const handleRowClick = (item) => {
    if (!isGerente){
      return
    }

    setSelectedItem(item)
    setShowModal(true)
  }


  return (
    <div>
        <div className='listagem-categoria'>
        <h1>Listagem de Usuários</h1>

        <button className="btn-adicionar" type="button" onClick={fetchCategorias}>Carregar categorias</button>
          
          <input className='input-search' placeholder='Buscar' type={Text} value={search} onChange={(e) => setSearch(e.target.value)}/>
         
          <table>
            <thead>
                <tr> 
                    <th>Nome</th>
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
                    <td>{item.status}</td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>
          <EditarCategorias
              showModal={showModal} 
              setShowModal={setShowModal}
              item={selectedItem}/>
      </div> 
    </div>
  );
}    

export default ListaCategorias