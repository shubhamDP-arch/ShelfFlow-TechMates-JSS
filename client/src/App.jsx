
import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import SupplierDetails from './components/SupplierDetails'
import Contactus from './components/Contactus'
import Updateproduct from './components/Updateproduct'
import Addproduct from './components/Addproduct'

import BarcodeScanner from "./pages/react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App(){
    
  return(
    <Router>
      <Routes>

  return (
    <>
      <Router>
        <Routes>

        <Route path="/supplierdetail" element={<SupplierDetails />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/updateproduct" element={<Updateproduct />} />
        <Route path="/Addproduct" element={<Addproduct />} />
        </Routes>
      </Router>
    </>
  )

         <Route path="/scan" element={<BarcodeScanner />} />

      </Routes>
    </Router>
      
)
}

export default App