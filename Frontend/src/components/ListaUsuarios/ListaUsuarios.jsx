import React, { useEffect, useState } from 'react';
import { supabase } from '../../config/supabase';

function ListaUsuarios({session}) {
    const [usuarios, setUsuarios] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [cargo, setCargo] = useState('funcionario');
    const [editingUserId, setEditingUserId] = useState(null);
    const [editCpf, setEditCpf] = useState('');
    const [editCargo, setEditCargo] = useState('');
    const [editStatus, setEditStatus] = useState('ativo');

    const fetchUsuarios = async () => {
        const { data, error } = await supabase.from('usuarios').select('*');

        setUsuarios(data || []);
    };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          cpf,
          cargo,
          gerente_id: session?.user?.id,
        },
      },
    });

    if (error) {
      alert(error.message)
      return;
    }

  };


  const handleEditUser = (usuario) => {
      setEditingUserId(usuario.id);
      setEditCpf(usuario.cpf || '');
      setEditCargo(usuario.cargo || 'funcionario');
      setEditStatus(usuario.status || 'ativo');
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();
    if (!editingUserId) {
      setStatusText('Selecione um usuário para editar primeiro.');
      return;
    }

  const { data, error } = await supabase
      .from('usuarios')
      .update({ cpf: editCpf, cargo: editCargo, status: editStatus })
      .eq('id', editingUserId)
      .select()
      .single();

    setEditingUserId(null);
    fetchUsuarios();
  };

  return (
    <div style={{ marginTop: '18px', maxWidth: '700px' }}>

        <h3>Adicionar Usuários</h3>

        <div style={{ backgroundColor: '#f4f4f4', padding: '12px', maxWidth: '700px' }}>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>

          <label>
            Senha:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>

          <label>
            Nome completo:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>

          <label>
            CPF:
            <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} maxLength={11} />
          </label>

          <label>
            Cargo:
            <select value={cargo} onChange={(e) => setCargo(e.target.value)}>
              <option value="funcionario">funcionario</option>
              <option value="gerente">gerente</option>
            </select>
          </label>
          <button type="button" onClick={handleSignUp}>Adicionar usuários</button>

        </form>


        <h3>Listagem de Usuários</h3>
        <button type="button" onClick={fetchUsuarios}>Carregar usuários</button>

        {usuarios.length === 0 && <p>Nenhum usuário carregado.</p>}
        {usuarios.length > 0 && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                    <tr>
                    <th style={{ border: '1px solid #ccc', padding: '6px' }}>ID</th>
                    <th style={{ border: '1px solid #ccc', padding: '6px' }}>Email</th>
                    <th style={{ border: '1px solid #ccc', padding: '6px' }}>CPF</th>
                    <th style={{ border: '1px solid #ccc', padding: '6px' }}>Cargo</th>
                    <th style={{ border: '1px solid #ccc', padding: '6px' }}>Status</th>
                    <th style={{ border: '1px solid #ccc', padding: '6px' }}>Ações</th>
                </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td style={{ border: '1px solid #ccc', padding: '6px' }}>{usuario.id}</td>
                  <td style={{ border: '1px solid #ccc', padding: '6px' }}>{usuario.email}</td>
                  <td style={{ border: '1px solid #ccc', padding: '6px' }}>{usuario.cpf}</td>
                  <td style={{ border: '1px solid #ccc', padding: '6px' }}>{usuario.cargo}</td>
                  <td style={{ border: '1px solid #ccc', padding: '6px' }}>{usuario.status}</td>
                  <td style={{ border: '1px solid #ccc', padding: '6px' }}>
                    <button type="button" onClick={() => handleEditUser(usuario)}>
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        
        {editingUserId && (
        <div style={{ marginTop: '20px', backgroundColor: '#f8f8f8', padding: '12px', maxWidth: '700px' }}>
          <h3>Editando Usuário #{editingUserId}</h3>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} onSubmit={handleSaveUser}>
            <label>
              CPF:
              <input type="text" value={editCpf} onChange={(e) => setEditCpf(e.target.value)} maxLength={11} />
            </label>
            <label>
              Cargo:
              <select value={editCargo} onChange={(e) => setEditCargo(e.target.value)}>
                <option value="funcionario">funcionario</option>
                <option value="gerente">gerente</option>
              </select>
            </label>
            <label>
              Status:
              <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
                <option value="ativo">ativo</option>
                <option value="inativo">inativo</option>
              </select>
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit">Salvar</button>
              <button type="button" onClick={() => setEditingUserId(null)}>Cancelar</button>
            </div>
          </form>
        </div>
      )}
      </div>
    </div>
  );
}    


export default ListaUsuarios