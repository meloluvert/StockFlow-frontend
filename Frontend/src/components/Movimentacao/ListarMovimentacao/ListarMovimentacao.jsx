import React, { useState } from 'react'
import { supabase } from '../../../config/supabase'

import './ListarMovimentacao.css'

function ListarMovimentacao({session}) {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [usuarios, setUsuarios] = useState('');
  const [fornecedores, setFornecedores] = useState('');
  const [produtos, setProdutos] = useState('');
  const [locaisEntrada, setLocaisEntrada] = useState('');
  const [locaisSaida, setLocaisSaida] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [movimentacoes, setMovimentacoes] = useState('');

  const isGerente = session.user.user_metadata.cargo === "gerente";

  const fetchMovimentacoes = async () => {
    const { data: movimentacoes } = await supabase
      .from('movimentacoes')
      .select('*');

    
  const { data: fornecedores } = await supabase
    .from('fornecedores')
    .select('id, nome');

  const { data: produtos } = await supabase
    .from('produtos')
    .select('id, nome');

  const { data: locaisEntrada } = await supabase
  .from('localizacoes')
  .select('id, nome')

  const { data: locaisSaida } = await supabase
  .from('localizacoes')
  .select('id, nome')

  const movimentacoesComNomes = movimentacoes.map(mov => ({
    ...mov,
    fornecedorNome:
      fornecedores.find(f => f.id === mov.fornecedor_id)?.nome || '',

    produtoNome:
      produtos.find(p => p.id === mov.produto_id)?.nome || '',

    localEntradaNome:
      locaisEntrada.find(le => le.id === mov.localizacao_entrada)?.nome || '',

    localSaidaNome:
      locaisSaida.find(ls => ls.id === mov.localizacao_saida)?.nome || '',

  }));

  setItems(movimentacoesComNomes);

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
        <div className='listagem-movimentacoes'>
        <h1>Listagem de Movimentações</h1>

        <button className="btn-adicionar" type="button" onClick={fetchMovimentacoes}>Carregar Movimentações</button>
          
          <input className='input-search' placeholder='Buscar' type={Text} value={search} onChange={(e) => setSearch(e.target.value)}/>
         
          <table>
            <thead>
                <tr> 
                    <th>Produto</th>
                    <th>Fornecedor</th>
                    <th>Tipo</th>
                    <th>Data</th>
                    <th>Local Entrada</th>
                    <th>Local Saida</th>
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
                    <td>{item.produtoNome}</td>
                    <td>{item.fornecedorNome}</td>
                    <td>{item.tipo}</td>
                    <td>{item.data}</td>
                    <th>{item.localEntradaNome}</th>
                    <th>{item.localSaidaNome}</th>
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

export default ListarMovimentacao