import React, { useEffect, useState } from 'react';
import { supabase } from '../../config/supabase.js';
import "./SignIn.css";


function SignIn({session}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [statusText, setStatusText] = useState('');

    const handleSignIn = async (e) => {
    e.preventDefault();
    setStatusText('Efetuando login...');

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert("Senha e/ou endereço de email errado(s)");
      return;
    }

    alert("Enviando os dados: " + email + " - " + password)

    setStatusText(`Logado como ${data.user?.email}`);
  };

    return (
    <div>
        <h1 className='logo'>Stock<span>Flow</span></h1>
        <div className="container">
            <form>
                <h1>Sign In</h1>
                <div className='input-field'>
                    <label>Endereço de E-mail</label>
                    <input type='email' placeholder='email@exemplo.com' onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className='input-field'>
                    <label>Senha</label>
                    <input type='password' placeholder='senha' onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type='button' onClick={handleSignIn}>Entrar</button>
            </form>
        </div>
    </div>
  )
}

export default SignIn