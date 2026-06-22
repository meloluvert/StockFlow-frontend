import React, { useState, useEffect } from 'react'
import { supabase } from '../../../config/supabase';

import './AdicionarProdutos.css'

function AdicionarProdutos({ showModal, setShowModal }) {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');
    const [categoriaId, setCategoriaId] = useState('');
    const [categorias, setCategorias] = useState('');

    const handleSave = async (e) => {
        e.preventDefault();

        console.log("executei")

        if (!nome.trim()) {
            alert('Nome é obrigatório.');
            return;
        }

        const { data, error } = await supabase
        .from('produtos')
        .insert([{
            nome : nome,
            descricao : descricao,
            categoria_id : categoriaId,
            preco : preco,
            quantidade: 0
        }])

        .select()
        .single();

        if (error) {
            console.log(error.message);
            return;
        }
    };

    const fetchCategorias = async () => {
        const { data, error } = await supabase.from('categorias_produtos').select('*');
    
        console.log(data);
        console.log(error);
    
        setCategorias(data || []);
    };

    const toggleModal = () => {
    setShowModal(prev => !showModal)
    }

    if(showModal){
        document.body.classList.add("active-modal")
    }else{
        document.body.classList.remove("active-modal")
    }

    useEffect(() => {
        fetchCategorias();
    }, []);

  return (
    <>
    {showModal && (    
        <div className="modal-produto">
            <div className="overlay"></div>
            <div className="modal-produto-conteudo">
                <h1>Adicionar Produto</h1>
                <form>

                <label>Nome:</label>
                    <input type="text" placeholder='nome do produto' value={nome} onChange={(e) => setNome(e.target.value)}/>
            
                <label>Descrição:</label>
                    <input type="text" placeholder='descrição do produto' value={descricao} onChange={(e) => setDescricao(e.target.value)}/>

                <label>Preço:</label>
                    <input type="number" placeholder='Preço' value={preco} onChange={(e) => setPreco(e.target.value)}/>
            
                <label>Categorias:</label>
                <select value={categoriaId} onChange={(e) => setCategoriaId(parseInt(e.target.value))}>

                    <option value="">Selecione uma categoria</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
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

export default AdicionarProdutos