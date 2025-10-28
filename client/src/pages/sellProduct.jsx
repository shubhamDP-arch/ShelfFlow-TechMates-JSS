import React, { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import { useAuth } from '../../store/auth';
import toast from "react-hot-toast";
import Navbar from '../components/essentials/Navbar';
import { Trash2, ShoppingCart, Package, Minus, Plus } from 'lucide-react';

const BarcodeScanner = () => {
  const [data, setData] = useState("");
  const [items, setItems] = useState("");
  const [amountInput, setAmountInput] = useState(false);
  const [itemDetails, setItemDetails] = useState([]);
  const [amount, setAmount] = useState(0);
  const { token } = useAuth();
  const [add, setAdd] = useState(false);
  const [incart, setIncart] = useState([]);
  const [table, setTable] = useState(false);
  const [shopid] = useState(localStorage.getItem("shopid"));
  const backapi = "http://localhost:5000";

  const startScanner = async () => {
    const targetElement = document.querySelector('#interactive');
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: targetElement,
        constraints: {
          facingMode: "environment"
        }
      },
      decoder: {
        readers: ["code_128_reader"]
      }
    }, function (err) {
      if (err) {
        console.error(err);
        return;
      }
      Quagga.start();
    });

    Quagga.onDetected(function (result) {
      const code = result.codeResult.code;
      setData(code);
      document.getElementById('result').innerText = `Scanned Code: ${code}`;
    });
  };

  const getCartItems = async () => {
    try {
      const response = await fetch(`${backapi}/api/auth/getcartitems`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ shopid })
      });
      const message = await response.json();
      setIncart(message.cartItems);
      setAdd(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (add) setTable(true);
  }, [add]);

  useEffect(() => {
    startScanner();
    getCartItems();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const fetchData = async () => {
        const response = await fetch(`${backapi}/api/auth/scanproduct`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ data, shopid })
        });
        const message = await response.json();
        if (message.productname !== "Scan Again") {
          setAmountInput(true);
          setItems(message.productname);
        } else {
          toast.error("Product Not Found. Scan Again.");
        }
      };
      fetchData();
    }
  }, [data]);

  const handleScan = () => {
    setData("");
    setAmountInput(false);
    setItems("");
    startScanner();
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setItemDetails([...itemDetails, { productname: items, quantity: Number(amount) }]);
    setAmountInput(false);
  };

  const addToCart = async () => {
    await fetch(`${backapi}/api/auth/addtocart`, {
      method: "POST",
      headers: {
        "Content-Type": `application/json`,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...itemDetails[itemDetails.length - 1], shopid })
    });
    await getCartItems();
  };

  useEffect(() => {
    if (itemDetails.length > 0) {
      addToCart();
    }
  }, [itemDetails]);

  const handleAmount = (e) => setAmount(e.target.value);

  const deleteUserById = async (itemId) => {
    const response = await fetch(`${backapi}/api/auth/deleteitemincart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ itemId, shopid })
    });
    const data = await response.json();
    setIncart(data.cartItems);
  };

  const handleUpdate = async () => {
    const data = { cartItems: incart };
    const response = await fetch(`${backapi}/api/auth/updatestock`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...data, shopid })
    });

    const result = await response.json();
    await getCartItems();

    if (result.success) {
      toast.success(result.message);
    } else {
      result.errorItems.forEach(element => {
        toast(`${element.productname} insufficient! Only ${element.quantity} are available`);
      });
    }
  };

  // Calculate total items
  const totalItems = incart.reduce((sum, item) => sum + item.quantity, 0);

  if (!token) return <Navigate to="/" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />
      <div className="flex flex-col items-center justify-center py-10 px-4">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 mb-8 border border-white/20">
          <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Barcode Scanner
          </h1>
          <div id="interactive" className="w-[600px] h-[400px] border-2 border-gray-300 rounded-2xl mb-4 overflow-hidden shadow-inner"></div>
          <div id="result" className="text-lg text-gray-700 mb-4 text-center font-medium"></div>

          {amountInput && (
            <form onSubmit={handleAdd} className="flex bg-white rounded-2xl shadow-lg w-[410px] mb-4 border border-gray-200 overflow-hidden">
              <input
                onChange={handleAmount}
                type="number"
                placeholder="Enter Quantity"
                name="quantity"
                className="flex-grow px-4 py-3 outline-none text-black bg-gray-50"
              />
              <button type="submit" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold px-6 py-3 transition duration-300 flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </form>
          )}

          <button
            onClick={handleScan}
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-2xl transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Scan Again
          </button>
        </div>

        {/* Fancy Cart Table */}
        <div className="w-full max-w-5xl">
          {/* Cart Header */}
          <div className="bg-white/80 backdrop-blur-lg rounded-t-3xl p-6 border border-white/20 border-b-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
                  <p className="text-gray-600">{incart.length} items • Total: {totalItems} pieces</p>
                </div>
              </div>
              {incart.length > 0 && (
                <div className="flex items-center space-x-2 text-green-600">
                  <Package className="w-5 h-5" />
                  <span className="font-semibold">Ready to checkout</span>
                </div>
              )}
            </div>
          </div>

          {/* Cart Items */}
          <div className="bg-white/70 backdrop-blur-sm border border-white/20 border-t-0 max-h-96 overflow-y-auto">
            {incart.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <ShoppingCart className="w-16 h-16 mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                <p>Start scanning products to add them to your cart</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {incart.map((item, index) => (
                  <div key={index} className="group p-6 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Package className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-gray-900">
                            {item.productname}
                          </h3>
                          <p className="text-gray-500 text-sm">Product ID: {item._id?.slice(-8)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-gray-500">Qty:</span>
                          <div className="bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full">
                            <span className="text-lg font-bold text-gray-700">{item.quantity}</span>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => deleteUserById(item._id)}
                          className="group/btn p-3 rounded-full bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 transition-all duration-300 hover:scale-110"
                          title="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          <div className="bg-white/80 backdrop-blur-lg rounded-b-3xl p-6 border border-white/20 border-t-0">
            <div className="flex items-center justify-between mb-4">
              <div className="text-gray-600">
                <span className="text-sm">Total Items: </span>
                <span className="text-2xl font-bold text-gray-800">{totalItems}</span>
              </div>
              <div className="text-gray-600">
                <span className="text-sm">Products: </span>
                <span className="text-2xl font-bold text-gray-800">{incart.length}</span>
              </div>
            </div>
            
            <button
              onClick={handleUpdate}
              disabled={incart.length === 0}
              className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform ${
                incart.length === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl hover:scale-105'
              }`}
            >
              {incart.length === 0 ? 'Cart is Empty' : 'Update Stocks & Checkout'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarcodeScanner;