import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react'
import Dashboard from './Components/Dashboard';
  function App(){
    
    return(
        <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} /> {/* Home component */}
        </Routes>
      </Router>
        
)
}


export default App
