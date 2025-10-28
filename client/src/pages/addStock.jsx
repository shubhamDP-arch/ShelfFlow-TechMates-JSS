import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import toast from 'react-hot-toast';
import Navbar from '../components/essentials/Navbar';
import { Package, Calendar, Hash, Plus, Scan, CheckCircle } from 'lucide-react';

const AddByBarcodeScanner = () => {
  const [data, setData] = useState('');
  const [items, setItems] = useState('');
  const [amountInput, setAmountInput] = useState(false);
  const [itemDetails, setItemDetails] = useState([]);
  const [amount, setAmount] = useState({ quantity: 0, expDate: '', productname: '' });
  const { token } = useAuth();
  const [incart, setIncart] = useState([]);
  const [shopid, setShopid] = useState(localStorage.getItem('shopid'));
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const backapi = 'http://localhost:5000';

  const startScanner = async () => {
    const targetElement = document.querySelector('#interactive');
    Quagga.init({
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: targetElement,
        constraints: { facingMode: 'environment' },
      },
      decoder: { readers: ['code_128_reader'] },
    }, function (err) {
      if (err) return console.error(err);
      Quagga.start();
    });

    Quagga.onDetected((result) => {
      const code = result.codeResult.code;
      Quagga.stop();
      setData(code);
      document.getElementById('result').innerText = `Scanned: ${code}`;
    });
  };

  useEffect(() => {
    startScanner();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
        console.log(data + "DATATATATA");
        const fetchdata = async () => {
        const response = await fetch(`${backapi}/api/auth/scanproduct`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data, shopid: shopid }),
        });
        const message = await response.json();
        if (message.productname !== 'Scan Again') {
          setAmountInput(true);
          setItems(message.productname);
        } else {
          toast.error('Product Not Found. Scan Again.');
        }
      };
      fetchdata();
    }
  }, [data]);

  const handleScan = () => {
    setData('');
    setAmountInput(false);
    setItems('');
    setSuccessMessage('');
    startScanner();
  };

  const handleAdd = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  console.log("HANDL ADD")
  amount.productname = items;
  
  try {
    const response = await fetch(`${backapi}/api/auth/addorder`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...amount, shopid }),
    });
    
    const result = await response.json();
    console.log(result);
    
    if (response.ok) {
      setSuccessMessage(`✅ ${items} updated successfully!`);
      toast.success('Stock updated successfully!');
      // Reset form
      setAmount({ quantity: 0, expDate: '', productname: '' });
      setAmountInput(false);
      setItems('');
      setData('');
    } else {
      // Handle server errors
      toast.error(result.message || 'Failed to update stock');
    }
  } catch (error) {
    console.error('Error updating stock:', error);
    toast.error('Network error. Please try again.');
  } finally {
    // Always reset loading state
    setIsLoading(false);
  }
};

  const handleAmount = (e) => {
    const { name, value } = e.target;
    setAmount({ ...amount, [name]: value });
  };

  if (!token) return <Navigate to="/" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />
      <div className="flex flex-col items-center justify-center py-10 px-4">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <Package className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Add Stock Scanner
          </h1>
          <p className="text-gray-600 text-lg">Scan products to add them to your inventory</p>
        </div>

        {/* Scanner Container */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8 border border-white/20">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Scan className="w-6 h-6 text-blue-600" />
              <span className="text-lg font-semibold text-gray-700">Camera Scanner</span>
            </div>
          </div>
          
          <div id="interactive" className="w-[600px] h-[400px] border-2 border-dashed border-gray-300 rounded-2xl mb-4 overflow-hidden shadow-inner bg-gray-50"></div>
          
          <div id="result" className="text-lg mt-4 mb-6 text-center font-semibold text-gray-700 min-h-[28px] bg-gray-100 rounded-lg p-2"></div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-2xl">
              <div className="flex items-center space-x-2 text-green-700">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">{successMessage}</span>
              </div>
            </div>
          )}

          {/* Product Details Form */}
          {amountInput && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6 border border-blue-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
                <Package className="w-5 h-5 text-blue-600" />
                <span>Product: {items}</span>
              </h3>
              
              <form onSubmit={handleAdd} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Quantity Input */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <Hash className="w-4 h-4" />
                      <span>Quantity</span>
                    </label>
                    <input
                      onChange={handleAmount}
                      type="number"
                      placeholder="Enter quantity"
                      name="quantity"
                      required
                      min="1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 bg-white shadow-sm"
                    />
                  </div>

                  {/* Expiry Date Input */}
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
                      <Calendar className="w-4 h-4" />
                      <span>Expiry Date</span>
                    </label>
                    <input
                      onChange={handleAmount}
                      type="date"
                      name="expDate"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 bg-white shadow-sm"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Adding...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      <span>Add to Inventory</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Scan Again Button */}
          <div className="text-center">
            <button
              onClick={handleScan}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2 mx-auto"
            >
              <Scan className="w-5 h-5" />
              <span>Scan Another Product</span>
            </button>
          </div>
        </div>

        {/* Instructions Card */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 max-w-2xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">📱 How to use:</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start space-x-2">
              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</span>
              <span>Point your camera at the product barcode</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</span>
              <span>Wait for the scanner to detect the barcode automatically</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</span>
              <span>Enter the quantity and expiry date when prompted</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</span>
              <span>Click "Add to Inventory" to save the product</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddByBarcodeScanner;