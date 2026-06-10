import React, { useState} from 'react'
import './AdicionarCategorias.css'
import { supabase } from '../../../config/supabase';

function AdicionarCategoria({ showModal, setShowModal }){
    const [nome, setNome] = useState('Alimentos');
    const [descricao, setDescricao] = useState('');

    const handleSave = async (e) => {
    e.preventDefault();

    console.log("executei")

    if (!nome.trim()) {
      alert('Nome é obrigatório.');
      return;
    }

    const payload = { nome, descricao: descricao.trim()};
    const { data, error } = await supabase.from('categorias_produtos').insert(payload).select().single();

    if (error) {
      console.log(error.message);
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
        <div className="modal-categoria">
            <div className="overlay"></div>
            <div className="modal-categoria-conteudo">
                <h1>Adicionar Categoria</h1>
                <form>

                <label>Nome:</label>
                    <select value={nome} onChange={(e) => setNome(e.target.value)}>
                        <option value="Alimentos">Alimentos</option>
                        <option value="Suplementos para Animais">Suplementos para Animais</option>
                        <option value="Artes e Entretenimento">Artes e Entretenimento</option>
                        <option value="Artigos Esportivos">Artigos Esportivos</option>
                        <option value="Brinquedos e Jogos">Brinquedos e Jogos</option>
                        <option value="Casa e Jardim">Casa e Jardim</option>
                        <option value="Comercial e Industrial">Comercial e Industrial</option>
                        <option value="Cameras e Optica">Câmeras e Óptica</option>
                        <option value="Eletronicos">Eletrônicos</option>
                        <option value="Ferragens">Ferragens</option>
                        <option value="Infantil">Infantil</option>
                        <option value="Materiais de Escritorio">Materiais de Escritório</option>
                        <option value="Materiais para Cerimonias">Materiais para Cerimônias</option>
                        <option value="Moveis">Móveis</option>
                        <option value="Saude e Beleza">Saúde e Beleza</option>
                        <option value="Vestuario e Acessorios">Vestuário e Acessórios</option>
                        <option value="Veiculos e Pecas">Veículos e Peças</option>
                    </select>
            
                <label>Descrição:</label>
                    <input type="text" placeholder='Descrição' value={descricao} onChange={(e) => setDescricao(e.target.value)}/>
            
                <button className="btn-adicionar" onClick={(e) => {handleSave(e); toggleModal()}}>Adicionar</button>
                <button className="btn-cancelar" onClick={toggleModal} type="button">Cancelar</button>

                </form>

            </div>
        </div>)}
    </>
  );
}

export default AdicionarCategoria