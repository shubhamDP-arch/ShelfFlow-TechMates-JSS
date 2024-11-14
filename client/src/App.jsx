import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import SupplierDetails from './components/SupplierDetails'
import Contactus from './components/Contactus'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>

        <Route path="/supplierdetail" element={<SupplierDetails />} />
        <Route path="/contactus" element={<Contactus />} />
        
        </Routes>
      </Router>
    </>
  )
}

export default App
