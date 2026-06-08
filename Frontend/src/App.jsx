import './App.css'
import PageSignIn from "./pages/pageSignIn/pageSignIn.jsx"
import Home from "./pages/Home/home"
import React, { useState, useEffect  } from 'react';
import PageUsuario from "./pages/PageUsuario/PageUsuario"
import PageCategoria from './pages/PageCategoria/PageCategoria';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { supabase } from './config/supabase';

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
      </Routes>
    </Router>
  );
}

export default App
