import Dashboard from './Components/Dashboard';


import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import SupplierDetails from './components/SupplierDetails'
import Contactus from './components/Contactus'

import BarcodeScanner from "./pages/react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App(){


  return (
    <>
      <Router>
        <Routes>

        <Route path="/supplierdetail" element={<SupplierDetails />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/scan" element={<BarcodeScanner />} />
          <Route path="/" element={<Dashboard />} /> {/* Home component */}
        </Routes>
      </Router>
    </>
  )


}


export default App
