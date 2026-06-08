import React, { useState } from 'react';
import './pageSignIn.css'
import SignIn from '../../components/SignIn/SignIn';


function PageSignIn({session}) {

  return (
    <div className="PageSignIn">
        <SignIn session={session} />
    </div>
  );
}

export default PageSignIn
