import BarcodeScanner from "./pages/react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App(){
    
  return(
    <Router>
      <Routes>

         <Route path="/scan" element={<BarcodeScanner />} />

      </Routes>
    </Router>
      
)
}

export default App