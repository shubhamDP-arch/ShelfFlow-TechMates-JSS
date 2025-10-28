import Dashboard from './components/essentials/Dashboard';
import './App.css'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Contactus from './components/contactUs/Contactus'
import Updateproduct from './components/updateProduct/Updateproduct'
import Addproduct from './components/addProduct/Addproduct'
import Login from "./components/authentication/Login"
import Logout from './components/authentication/Logout';
import BarcodeScanner from "./pages/sellProduct"
import SupplierDetails from './components/supplier/SupplierDetails';
import ProductDetailPage from './components/productDetail/ProductDetailPage';
import NotificationPage from './components/notification/NotificationPage';
import Supplier from './components/supplier/supplier'

import HomePage from './components/essentials/Homepage';

import AddByBarcodeScanner from './pages/addStock';
import ProductTable from './components/stats/Moresoldproduct';


function App(){


  return (
    <>
      <Router>
        <Routes>

        <Route path="/supplierdetail" element={<SupplierDetails />} />
        <Route path="/contactus" element={<Contactus />} />
        <Route path="/updateproduct" element={<Updateproduct />} />
        <Route path="/Addproduct" element={<Addproduct />} />
        <Route path='/notification' element={<NotificationPage/>}/>
        <Route path='/soldproducts' element={<ProductTable/>}/>
        <Route path='/suppliers' element={<SupplierDetails/>}/>
        <Route path="/Productdetail" element={<ProductDetailPage />} />
        <Route path="/scan" element={<BarcodeScanner />} />
        <Route path="/" element={<Dashboard />} />
        <Route path='/notification' element={<NotificationPage/>}/>
        <Route path="product/:product" element={<Updateproduct/>}/>

        <Route path='/supplier' element={<Supplier/>}/>
        <Route path="/Login" element={<Login />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/Notification" element={<Notification />} />
        <Route path='/AddProductDetail' element={<AddByBarcodeScanner/>}/>
        <Route path="/scan" element={<BarcodeScanner />} />
        <Route path="/" element={<Dashboard />} />
        {/* <Route path='/notification' element={<NotificationPage/>}/> */}

        </Routes>
      </Router>
    </>
  )


}


export default App
