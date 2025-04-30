import React from 'react';
import{ BrowserRouter, Router, Routes } from "react-router-dom"

import './App.css';
import { Route } from 'react-router-dom';
import Login from './componets/Login';
import Profile from './componets/Profile';


function App() {
  return (
  
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/profile" element={<Profile/>} />
    </Routes>
    </BrowserRouter>
   
  );
}

export default App;
