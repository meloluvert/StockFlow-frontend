import React, { useState } from 'react';
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import Options from '../../components/Options/Options';
import { Navigate } from 'react-router-dom';

function Home({session}) {

  if (!session) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="Home">
        <Navbar session={session}/>
        <Options />
    </div>
  )
}

export default Home