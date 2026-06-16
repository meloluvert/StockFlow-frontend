import './App.css'

import PageSignIn from "./pages/pageSignIn/pageSignIn.jsx"
import Home from "./pages/Home/Home.jsx"
import PageUsuario from "./pages/PageUsuario/PageUsuario.jsx"
import PageCategoria from './pages/PageCategoria/PageCategoria.jsx';
import PageFornecedor from './pages/PageFornecedor/PageFornecedor.jsx';
import PageLocalizacao from './pages/PageLocalizacao/PageLocalizacao.jsx';
import PageProdutos from './pages/PageProdutos/PageProdutos.jsx';

import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { supabase } from './config/supabase';
import React, { useState, useEffect  } from 'react';

function App() {
  const [session, setSession] = useState(null);

 useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>

        <Route path='/' element={<PageSignIn session={session}/>}/>
        <Route path='/home' element={<Home session={session}/>}/>
        <Route path='/usuario' element={<PageUsuario session={session}/>}/>
        <Route path='/categoria' element={<PageCategoria session={session}/>}/>
        <Route path='/fornecedor' element={<PageFornecedor session={session}/>}></Route>
        <Route path='/localizacao' element={<PageLocalizacao session={session}/>}></Route>
        <Route path='/produto' element={<PageProdutos session={session}/>}> </Route>
        
      </Routes>
    </Router>
  );
}

export default App
