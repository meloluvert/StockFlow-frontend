import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../../config/supabase';

import Navbar from '../../components/Navbar/Navbar'

import './PageRelatorios.css'


function PageRelatorios({session}) {
    if (!session) {
    return <Navigate to="/" replace />;
    }

    const handleRelatorioProdutos = async (e) => {
        const { data, error } = await supabase.functions.invoke('gerar-relatorio', {
        body: { tipoRelatorio: 'produtos' }, // 'produtos' | 'movimentacoes'
        headers: { 'Accept': 'application/pdf' }
        });

        if (error) {
        console.error('Falha ao gerar relatório', error);
        return;
        }

        // data vem como array buffer/binário — crie um Blob para abrir/baixar
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        setTimeout(() => URL.revokeObjectURL(url), 10000);
    }

    const handleRelatorioMovimentacoes = async (e) => {
        const { data, error } = await supabase.functions.invoke('gerar-relatorio', {
        body: { tipoRelatorio: 'movimentacoes' }, // 'produtos' | 'movimentacoes'
        headers: { 'Accept': 'application/pdf' }
        });

        if (error) {
        console.error('Falha ao gerar relatório', error);
        return;
        }

        // data vem como array buffer/binário — crie um Blob para abrir/baixar
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        setTimeout(() => URL.revokeObjectURL(url), 10000);
    }



    return (
        <div className='PageRelatorios'>
            <Navbar session={session}/>
            <div className='PageRelatorios-content'>
                <div className='btn-relatorio-produto'>
                    <button onClick={handleRelatorioProdutos}>Relatório Produtos</button>
                </div>
                <div className='btn-relatorio-movimentacao'>
                    <button onClick={handleRelatorioMovimentacoes}>Relatório movimentações</button>
                </div>
            </div>
        </div>
    )
}

export default PageRelatorios