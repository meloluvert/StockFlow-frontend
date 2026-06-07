import React, { useState } from 'react';
import './App.css'
import SignIn from './components/SignIn/SignIn';

function pageSignIn() {
  const [session] = useState(null);

  return (
    <div className="App">
        <SignIn session={session} />
    </div>
  );
}

export default pageSignIn
