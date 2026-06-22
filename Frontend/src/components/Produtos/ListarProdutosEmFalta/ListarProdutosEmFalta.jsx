import React, { useState } from 'react'
import { supabase } from '../../../config/supabase'

import './ListarProdutosEmFalta.css'

function ListarProdutosEmFalta() {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);

    const fetchProdutos = async () => {
        const { data, error } = await supabase
        .from('produtos')
        .select('*')
        .lt('quantidade', 10)
        .order('quantidade', { ascending: true });
        setItems(data || []);
    };

    return (
        <div>
            <div className='listagem-produto'>
            <h1>Listagem de Produtos em Falta</h1>

            <button className="btn-adicionar" type="button" onClick={fetchProdutos}>Carregar relatório</button>
          
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
                    <tr>
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
            </div> 
        </div>
  );
}    

export default ListarProdutosEmFalta