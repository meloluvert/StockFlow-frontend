import React, { useState } from 'react'
import { supabase } from '../../../config/supabase'

import EditarProdutos from '../EditarProdutos/EditarProdutos';

import './ListarProdutos.css'

function ListarProdutos({session}) {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const isGerente = session.user.user_metadata.cargo === "gerente";

    const fetchProdutos = async () => {
        const { data, error } = await supabase.from('produtos').select('*');
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
            <div className='listagem-produto'>
            <h1>Listagem de Produtos</h1>

            <button className="btn-adicionar" type="button" onClick={fetchProdutos}>Carregar produto</button>
          
            <input className='input-search' placeholder='Buscar' type={Text} value={search} onChange={(e) => setSearch(e.target.value)}/>
         
            <table>
                <thead>
                    <tr> 
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Quantidade</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                {items.filter((item) => {
                    return search === '' ? item :
                    item.nome.toLowerCase().includes(search) ||
                    item.preco.toString().includes(search) ||
                    item.status.toLowerCase().includes(search)
                }).map
                ((item) => {
                    return (
                    <tr 
                        key={item.id} onClick={(e) => handleRowClick(item)}
                        className={isGerente ? "clickable-row" : ""}
                    >
                        <td>{item.nome}</td>
                        <td>{item.preco}</td>
                        <td>{item.quantidade}</td>
                        <td>{item.status}</td>
                    </tr>
                    )
                })
            }
                </tbody>
            </table>
            <EditarProdutos
                showModal={showModal} 
                setShowModal={setShowModal}
                item={selectedItem}/>
            </div> 
        </div>
  );
}    


export default ListarProdutos