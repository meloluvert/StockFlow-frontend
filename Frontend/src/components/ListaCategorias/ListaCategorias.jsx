import React, { useEffect, useState } from 'react';
import { supabase } from '../../config/supabase';

function ListaCategorias({session}) {
  const [items, setItems] = useState([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('ativo');
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategorias();
  }, [session]);

  const fetchCategorias = async () => {
    setLoading(true);
    setMessage('Carregando categorias...');
    const { data, error } = await supabase.from('categorias_produtos').select('*');
    setLoading(false);

    if (error) {
      setMessage(`Erro ao buscar categorias: ${error.message}`);
      return;
    }

    setItems(data || []);
    setMessage(`Foram carregadas ${data?.length || 0} categorias.`);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!nome.trim()) {
      setMessage('Nome é obrigatório.');
      return;
    }

    setLoading(true);
    setMessage(editId ? 'Atualizando categoria...' : 'Criando categoria...');

    const payload = { nome: nome.trim(), descricao: descricao.trim(), status };
    const query = editId
      ? supabase.from('categorias_produtos').update(payload).eq('id', editId).select().single()
      : supabase.from('categorias_produtos').insert(payload).select().single();

    const { data, error } = await query;
    setLoading(false);

    if (error) {
      setMessage(`Erro ao salvar categoria: ${error.message}`);
      return;
    }

    setMessage(editId ? 'Categoria atualizada.' : 'Categoria criada.');
    clearForm();
    fetchCategorias();
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setNome(item.nome || '');
    setDescricao(item.descricao || '');
    setStatus(item.status || 'ativo');
    setMessage(`Editando categoria id=${item.id}`);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Excluir esta categoria?');
    if (!confirmed) return;

    setLoading(true);
    setMessage('Excluindo categoria...');
    const { error } = await supabase.from('categorias_produtos').delete().eq('id', id);
    setLoading(false);

    if (error) {
      setMessage(`Erro ao excluir categoria: ${error.message}`);
      return;
    }

    setMessage('Categoria excluída.');
    if (editId === id) clearForm();
    fetchCategorias();
  };

  const clearForm = () => {
    setEditId(null);
    setNome('');
    setDescricao('');
    setStatus('ativo');
  };
  return (
    <div>
      <h2>CRUD de Categorias de Produto</h2>
      <p>Usuário atual: <strong>{session?.user?.email || 'anônimo'}</strong></p>
      <p>{message}</p>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '520px' }}>
        <label>
          Nome:
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </label>
        <label>
          Descrição:
          <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        </label>
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="ativo">ativo</option>
            <option value="inativo">inativo</option>
          </select>
        </label>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" disabled={loading}>{editId ? 'Atualizar' : 'Criar'}</button>
          <button type="button" onClick={clearForm} disabled={loading}>Limpar</button>
          <button type="button" onClick={fetchCategorias} disabled={loading}>Recarregar</button>
        </div>
      </form>

      <div style={{ marginTop: '20px' }}>
        <h3>Lista de Categorias</h3>
        {loading && <p>Carregando...</p>}
        {!loading && items.length === 0 && <p>Nenhuma categoria encontrada.</p>}
        {!loading && items.length > 0 && (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: '6px' }}>ID</th>
                <th style={{ border: '1px solid #ccc', padding: '6px' }}>Nome</th>
                <th style={{ border: '1px solid #ccc', padding: '6px' }}>Status</th>
                <th style={{ border: '1px solid #ccc', padding: '6px' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td style={{ border: '1px solid #ccc', padding: '6px' }}>{item.id}</td>
                  <td style={{ border: '1px solid #ccc', padding: '6px' }}>{item.nome}</td>
                  <td style={{ border: '1px solid #ccc', padding: '6px' }}>{item.status}</td>
                  <td style={{ border: '1px solid #ccc', padding: '6px' }}>
                    <button type="button" onClick={() => handleEdit(item)} disabled={loading} style={{ marginRight: '8px' }}>Editar</button>
                    <button type="button" onClick={() => handleDelete(item.id)} disabled={loading}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}


export default ListaCategorias