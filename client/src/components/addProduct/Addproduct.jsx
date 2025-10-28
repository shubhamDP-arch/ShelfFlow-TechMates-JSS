import React, { useEffect, useState } from "react";
import { Package, User, Mail, DollarSign, Download, Sparkles, ShoppingBag } from "lucide-react";

// Mock Navbar component
import Navbar from "../essentials/Navbar";

function AddProduct() {
  const [imgSource, setImageSource] = useState("");
  const [path, setPath] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const backApi = `http://localhost:5000`;
  const [shopid] = useState(localStorage.getItem("shopid"));

  const [formData, setFormData] = useState({
    productName: "",
    supplierName: "",
    supplierEmail: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);
    console.log("Submitted Data:", formData);

    try {
      const response = await fetch(`${backApi}/api/auth/insertproduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...formData, shopid: shopid}),
      });
      const message = await response.json();
      setImageSource(message.imagesource); // Backend should return the filename of the image
      setIsSuccess(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update path whenever imgSource is updated
  useEffect(() => {
    if (imgSource) {
      setPath(`/images/${imgSource}`);
    }
  }, [imgSource]);

  const downloadBarcode = () => {
    if (barcodeData) {
      const link = document.createElement('a');
      link.download = `barcode_${formData.productName.replace(/\s+/g, '_')}.png`;
      link.href = barcodeData;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
              <Package className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Add New Product
            </h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Fill in the product details below to generate a unique barcode for your inventory
            </p>
          </div>

          {/* Main Form Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="px-8 py-8">
              <div className="space-y-6">
                {/* Product Name */}
                <div className="group">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <Package className="h-4 w-4 mr-2 text-blue-600" />
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="Enter product name"
                    required
                  />
                </div>

                {/* Supplier Name */}
                <div className="group">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <User className="h-4 w-4 mr-2 text-green-600" />
                    Supplier Name
                  </label>
                  <input
                    type="text"
                    name="supplierName"
                    value={formData.supplierName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="Enter supplier name"
                    required
                  />
                </div>

                {/* Supplier Email */}
                <div className="group">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <Mail className="h-4 w-4 mr-2 text-purple-600" />
                    Supplier Email
                  </label>
                  <input
                    type="email"
                    name="supplierEmail"
                    value={formData.supplierEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="supplier@example.com"
                    required
                  />
                </div>

                {/* Price */}
                <div className="group">
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <span className="h-4 w-4 mr-2 text-yellow-600 text-lg font-semibold">₹</span>
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Generating Barcode...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 mr-2" />
                        Generate Barcode
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Barcode Display & Download */}
            {isSuccess && path && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-t border-green-200 px-8 py-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-green-800">
                        Barcode Generated Successfully!
                      </h3>
                      <p className="text-sm text-green-600">
                        Your product barcode is ready for download
                      </p>
                    </div>
                  </div>

                  {/* Barcode Display */}
                  <div className="bg-white rounded-lg border-2 border-green-200 p-6 mb-6 inline-block">
                    <img 
                      src={path} 
                      alt={`Barcode for ${formData.productName}`}
                      className="mx-auto border border-gray-200 rounded"
                    />
                    <div className="mt-3 text-sm text-gray-600">
                      <p className="font-medium">{formData.productName}</p>
                      <p>Price: ₹{formData.price}</p>
                      <p>Supplier: {formData.supplierName}</p>
                    </div>
                  </div>

                  {/* Download Button */}
                  <a
                    href={path}
                    download="barcode.png"
                    className="inline-flex items-center px-6 py-3 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 shadow-lg"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download Barcode
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Additional Info Card */}
          <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">How it works</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <p className="text-sm text-gray-600">Fill in product details</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-600 font-bold">2</span>
                </div>
                <p className="text-sm text-gray-600">Generate unique barcode</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <p className="text-sm text-gray-600">Download and use</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;