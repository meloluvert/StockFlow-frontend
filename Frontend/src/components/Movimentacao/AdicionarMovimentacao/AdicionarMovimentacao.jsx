import React, { useState,useEffect } from 'react'
import { supabase } from '../../../config/supabase'

import './AdicionarMovimentacao.css'

function AdicionarMovimentacao({ showModal, setShowModal }) {
    const [tipo, setTipo] = useState('entrada');
    const [quantidade, setQuantidade] = useState('');
    const [produtoId, setProdutoId] = useState('');
    const [produtos, setProdutos] = useState('');
    const [fornecedorId, setFornecedorId] = useState('');
    const [fornecedores, setFornecedores] = useState('');
    const [localEntradas, setlocalEntrada] = useState('');
    const [localEntradaId, setlocalEntradaId] = useState('');
    const [localSaidas, setlocalSaida] = useState('');
    const [localSaidaId, setlocalSaidaId] = useState('');
    const [usuarios, setUsuarios] = useState('')
    const [usuarioId, setUsuarioId] = useState('')

    const handleSave = async (e) => {
        e.preventDefault();

        console.log("executei")

        const payload = {
        produto_id : produtoId,
        quantidade : quantidade,
        tipo : tipo, // 'entrada' | 'saida' | 'transferencia'
        fornecedor_id: fornecedorId || null,
        localizacao_entrada: localEntradaId || null,
        localizacao_saida: localSaidaId || null
        };

        // No frontend chamamos uma função que faz inserção e cria o vínculo de auditoria
        const { data, error } = await supabase
        .from('movimentacoes')
        .insert([payload])
        .select()
        .single();

        // Em seguida inserir na tabela de vínculo
        await supabase.from('usuarios_movimentacoes').insert([{ movimentacao_id: data.id, usuario_id: usuarioId}]);
        };

    const fetchUsuarios = async () => {
        const { data, error } = await supabase.from('usuarios').select('*');

        setUsuarios(data || []);
    }

    const fetchProdutos = async () => {
        const { data, error } = await supabase.from('produtos').select('*');
    
        console.log(data);
        console.log(error);
    
        setProdutos(data || []);
    };

    const fetchFornecedores = async () => {
        const { data, error } = await supabase.from('fornecedores').select('*');
    
        console.log(data);
        console.log(error);
    
        setFornecedores(data || []);
    };

    const fetchLocalSaida = async () => {
        const { data, error } = await supabase.from('localizacoes').select('*');
    
        console.log(data);
        console.log(error);
    
        setlocalSaida(data || []);
    };

    const fetchLocalEntrada = async () => {
        const { data, error } = await supabase.from('localizacoes').select('*');
    
        console.log(data);
        console.log(error);
    
        setlocalEntrada(data || []);
    };
    

    const handleTipoChange = (e) => {
        const novoTipo = e.target.value
        setTipo(novoTipo)

        if (novoTipo === 'entrada')
        {
            setlocalEntradaId('')
        }
        else
        {
            setlocalSaidaId('')
        }
    }

    const toggleModal = () => {
    setShowModal(prev => !showModal)
    }

    if(showModal){
        document.body.classList.add("active-modal")
    }else{
        document.body.classList.remove("active-modal")
    }

    useEffect(() => {
        fetchLocalEntrada();
        fetchLocalSaida();
        fetchFornecedores();
        fetchProdutos();
        fetchUsuarios();
    }, []);

  return (
    <>
    {showModal && (    
        <div className="modal-movimentacao">
            <div className="overlay"></div>
            <div className="modal-movimentacao-conteudo">
                <h1>Adicionar Movimentação</h1>
                <form>

                <label>Produtos:</label>
                <select value={produtoId} onChange={(e) => setProdutoId(e.target.value)}>
                    <option value="">Selecione um produto</option>
                    {produtos.map((produto) => (
                        <option key={produto.id} value={produto.id}>{produto.nome}</option>
                    ))}
                </select>

                <label>Fornecedor:</label>
                <select value={fornecedorId} onChange={(e) => setFornecedorId(e.target.value)}>
                    <option value="">Selecione um fornecedor</option>
                    {fornecedores.map((fornecedor) => (
                        <option key={fornecedor.id} value={fornecedor.id}>{fornecedor.nome}</option>
                    ))}
                </select>

                <label>Usuário:</label>
                <select value={usuarioId} onChange={(e) => setUsuarioId(e.target.value)}>
                    <option value="">Selecione um usuário</option>
                    {usuarios.map((usuario) => (
                        <option key={usuario.id} value={usuario.id}>{usuario.nome}</option>
                    ))}
                </select>

                <label>Quantidade:</label>
                    <input type="number" placeholder='Quantidade' value={quantidade} onChange={(e) => setQuantidade(e.target.value)}/>
            
                <label>Tipo:</label>
                <select value={tipo} onChange={handleTipoChange}>
                    <option value="entrada">Entrada</option>
                    <option value="saida">Saída</option>
                </select>


                <label>Local de Entrada:</label>
                <select value={localEntradaId} onChange={(e) => setlocalEntradaId(parseInt(e.target.value))} disabled={tipo === 'saida'}>

                    <option value="">Selecione um local</option>
                    {localEntradas.map((localEntrada) => (
                        <option key={localEntrada.id} value={localEntrada.id}>{localEntrada.nome}</option>
                    ))}

                </select>

                <label>Local de Saída:</label>
                <select value={localSaidaId} onChange={(e) => setlocalSaidaId(parseInt(e.target.value))} disabled={tipo === 'entrada'}>

                    <option value="">Selecione um local</option>
                    {localSaidas.map((localSaida) => (
                        <option key={localSaida.id} value={localSaida.id}>{localSaida.nome}</option>
                    ))}

                </select>

                <button className="btn-adicionar" onClick={(e) => {handleSave(e); toggleModal()}}>Adicionar</button>
                <button className="btn-cancelar" onClick={toggleModal} type="button">Cancelar</button>

                </form>

            </div>
        </div>)}
    </>
    );
}

export default AdicionarMovimentacao