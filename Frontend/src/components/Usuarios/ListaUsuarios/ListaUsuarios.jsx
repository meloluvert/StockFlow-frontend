import React, { useEffect, useState } from 'react';
import { supabase } from '../../../config/supabase';

function ListaUsuarios({session}) {
  return (
    <div>
        {/*<div >
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
      </div> */}
    </div>
  );
}    


export default ListaUsuarios