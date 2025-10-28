import React, { useState, useEffect } from 'react';
import Navbar from '../essentials/Navbar';
function Supplier() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderLoading, setOrderLoading] = useState({});
  const shopid = localStorage.getItem("shopid");  
  const backapi = 'http://localhost:5000';

  // Fetch products that need restocking
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${backapi}/api/supplier/products/restock`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shopid: shopid }),
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch products');
      }

      if (data.success) {
        setProducts(data.data);
      } else {
        throw new Error(data.message || 'Failed to load products');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle quantity change
  const handleQuantityChange = (productId, quantity) => {
    setOrders(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        quantity: quantity
      }
    }));
  };

  // Handle delivery date change
  const handleDateChange = (productId, date) => {
    setOrders(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        deliveryDate: date
      }
    }));
  };

  // Handle supplier email change
  const handleSupplierEmailChange = (productId, email) => {
    setOrders(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        supplierEmail: email
      }
    }));
  };

  // Calculate suggested restock quantity
  const getSuggestedQuantity = (product) => {
    const suggestedQty = Math.max((product.threshold * 2) - product.quantity, 50);
    return suggestedQty;
  };

  // Handle order submission
  const handleOrder = async (product) => {
    const orderDetails = orders[product.id];
    
    if (!orderDetails?.quantity || !orderDetails?.deliveryDate) {
      alert('Please enter quantity and delivery date');
      return;
    }

    

    if (parseInt(orderDetails.quantity) <= 0) {
      alert('Please enter a valid quantity greater than 0');
      return;
    }

    // Validate email format
    

    setOrderLoading(prev => ({ ...prev, [product.id]: true }));

    try {
      const response = await fetch(`${backapi}/api/supplier/giveorder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productCode: product.barcodeid,
          quantity: parseInt(orderDetails.quantity),
          expectedDate: orderDetails.deliveryDate,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert(`Order placed successfully! 

Product: ${product.name}
Current Stock: ${product.quantity}
Order Quantity: ${orderDetails.quantity}
Total Cost: ₹${(product.priceNumeric * parseInt(orderDetails.quantity)).toLocaleString()}
Delivery Date: ${orderDetails.deliveryDate}

Email sent to supplier successfully!`);
        
        // Clear the order form
        setOrders(prev => ({
          ...prev,
          [product.id]: { quantity: '', deliveryDate: '', supplierEmail: '' }
        }));

        // Refresh the products list
        fetchProducts();

      } else {
        throw new Error(result.message || 'Failed to send order email');
      }

    } catch (error) {
      console.error('Error placing order:', error);
      alert(`Failed to place order: ${error.message}`);
    } finally {
      setOrderLoading(prev => ({ ...prev, [product.id]: false }));
    }
  };

  // Get tomorrow's date for minimum delivery date
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // Auto-fill suggested values
  const autoFillSuggested = (product) => {
    const suggestedQty = getSuggestedQuantity(product);
    const suggestedDate = getTomorrowDate();
    
    setOrders(prev => ({
      ...prev,
      [product.id]: {
        ...prev[product.id],
        quantity: suggestedQty.toString(),
        deliveryDate: suggestedDate
      }
    }));
  };

  // Loading state
  if (loading) {
    return (
      <>
        <Navbar/>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading products...</p>
        </div>
      </div>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <Navbar/>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Products</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchProducts}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
      </>
    );
  }

  // Empty state
  if (!products || products.length === 0) {
    return (
      <>
        <Navbar/>
        <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <span className="text-green-600 text-4xl">✅</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">All Products Well Stocked!</h2>
            <p className="text-gray-600 mb-8">All your products are above their threshold levels. No restocking needed at the moment.</p>
            <button
              onClick={fetchProducts}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              🔄 Check Again
            </button>
          </div>
        </div>
      </div>
      </>
    );
  }

  return (
    <>
      <Navbar/>
      <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            📦 Restock Products
          </h1>
          <p className="text-gray-600 text-lg">
            Order supplies for products that need restocking
          </p>
          <div className="flex justify-center items-center gap-4 mt-4">
            <span className="text-sm text-blue-600 font-medium">
              {products.length} product{products.length !== 1 ? 's' : ''} need restocking
            </span>
            <button
              onClick={fetchProducts}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              🔄 Refresh
            </button>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-xl p-4 mt-6 inline-block shadow-lg">
            <div className="flex items-center gap-6 text-sm">
              <div className="text-center">
                <div className="text-red-600 font-bold text-lg">{products.filter(p => p.quantity === 0).length}</div>
                <div className="text-gray-600">Out of Stock</div>
              </div>
              <div className="text-center">
                <div className="text-orange-600 font-bold text-lg">{products.filter(p => p.quantity > 0).length}</div>
                <div className="text-gray-600">Low Stock</div>
              </div>
              <div className="text-center">
                <div className="text-blue-600 font-bold text-lg">
                  ₹{products.reduce((sum, p) => sum + (getSuggestedQuantity(p) * p.priceNumeric), 0).toLocaleString()}
                </div>
                <div className="text-gray-600">Est. Restock Cost</div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((product) => {
            const suggestedQty = getSuggestedQuantity(product);
            
            return (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                
                {/* Product Image */}
                <div className="relative h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
                  {product.image && product.image !== '/default-product.jpg' ? (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className={`${product.image && product.image !== '/default-product.jpg' ? 'hidden' : 'flex'} w-full h-full items-center justify-center text-gray-400`}>
                    <span className="text-6xl">📦</span>
                  </div>
                  
                  {/* Stock Status */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Stock: {product.quantity}
                    </span>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-500 mb-1">Barcode: {product.barcodeid}</p>
                    <p className="text-sm text-gray-500 mb-2">Supplier: {product.supplierName}</p>
                    <p className="text-2xl font-bold text-blue-600 mb-2">{product.price}</p>
                    
                    {/* Stock Info */}
                    <div className="bg-gray-50 p-3 rounded-lg mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Current Stock:</span>
                        <span className="font-medium">{product.quantity}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Threshold:</span>
                        <span className="font-medium">{product.threshold}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Suggested Order:</span>
                        <span className="font-medium text-green-600">{suggestedQty} units</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Section */}
                  <div className="border-t pt-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-700">
                        🛒 Place Order
                      </h4>
                      <button
                        onClick={() => autoFillSuggested(product)}
                        className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                      >
                        Auto-fill
                      </button>
                    </div>
                    
                    {/* Quantity Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Order Quantity (Suggested: {suggestedQty})
                      </label>
                      <input
                        type="number"
                        min="1"
                        placeholder={`Suggested: ${suggestedQty}`}
                        value={orders[product.id]?.quantity || ''}
                        onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>

                    {/* Delivery Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">
                        Expected Delivery Date
                      </label>
                      <input
                        type="date"
                        min={getTomorrowDate()}
                        value={orders[product.id]?.deliveryDate || ''}
                        onChange={(e) => handleDateChange(product.id, e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>

                    {/* Supplier Email */}
                    

                    {/* Total Amount Display */}
                    {orders[product.id]?.quantity && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-blue-800">
                          Order Total: ₹{(product.priceNumeric * parseInt(orders[product.id].quantity || 0)).toLocaleString()}
                        </p>
                        <p className="text-xs text-blue-600">
                          After delivery: {product.quantity + parseInt(orders[product.id].quantity || 0)} units
                        </p>
                      </div>
                    )}

                    {/* Order Button */}
                    <button
                      onClick={() => handleOrder(product)}
                      disabled={orderLoading[product.id]}
                      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      {orderLoading[product.id] ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Sending Order...
                        </>
                      ) : (
                        '📧 Send Order'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Help Section */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg inline-block">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              Contact our support team for assistance with bulk orders or automated restocking
            </p>
            <button className="bg-green-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              📞 Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Supplier;