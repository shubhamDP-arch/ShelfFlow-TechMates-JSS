import React from "react";
import { Package, ShoppingCart, DollarSign, TrendingUp, AlertTriangle, User, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Productdetail({ product, destination }) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/product/${destination}`);
    };

    const getStockStatus = (quantity, threshold) => {
        const qty = parseInt(quantity) || 0;
        const thresh = parseInt(threshold) || 0;

        if (qty === 0) return { status: 'Out of Stock', color: 'text-red-600 bg-red-100', icon: AlertTriangle };
        if (qty <= thresh) return { status: 'Low Stock', color: 'text-yellow-600 bg-yellow-100', icon: AlertTriangle };
        return { status: 'In Stock', color: 'text-green-600 bg-green-100', icon: Package };
    };

    const stockInfo = getStockStatus(product.quantity, product.productthreshold);
    const StockIcon = stockInfo.icon;

    return (
        <div className="p-4">
            <div
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer 
                border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2 hover:scale-105
                w-80 overflow-hidden group relative"
                onClick={handleNavigate}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6 relative">
                    <div className="absolute inset-0 bg-black opacity-10"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <Package className="w-6 h-6 text-white" />
                                <h3 className="text-white font-bold text-lg">Product Details</h3>
                            </div>
                            <ArrowRight className="w-5 h-5 text-white opacity-70 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <h2 className="text-xl font-bold text-white truncate">
                            {product.productname || "Unnamed Product"}
                        </h2>
                    </div>
                </div>

                {/* Stock Status */}
                <div className="px-6 pt-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${stockInfo.color}`}>
                        <StockIcon className="w-4 h-4" />
                        {stockInfo.status}
                    </div>
                </div>

                {/* Details */}
                <div className="p-6 pt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <Package className="w-4 h-4 text-gray-500" />
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Quantity</span>
                            </div>
                            <span className="text-lg font-bold text-gray-900">
                                {product.quantity || "0"}
                            </span>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <DollarSign className="w-4 h-4 text-gray-500" />
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Price</span>
                            </div>
                            <span className="text-lg font-bold text-gray-900">
                                ₹{product.price || "0"}
                            </span>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 pt-4">
                        <div className="grid grid-cols-2 gap-4 mb-3">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <ShoppingCart className="w-4 h-4 text-blue-500" />
                                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Sold</span>
                                </div>
                                <span className="text-sm font-semibold text-gray-900">
                                    {product.total_sold || "0"} units
                                </span>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <TrendingUp className="w-4 h-4 text-green-500" />
                                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Revenue</span>
                                </div>
                                <span className="text-sm font-semibold text-green-600">
                                    ₹{product.revenue_generated || "0"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 border-t border-gray-100 pt-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-500">Threshold</span>
                            <span className="text-sm font-semibold text-gray-900">
                                {product.productthreshold || "0"}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-gray-400" />
                                <span className="text-sm font-medium text-gray-500">Supplier</span>
                            </div>
                            <span className="text-sm font-semibold text-gray-900 truncate max-w-32">
                                {product.supplierName || "N/A"}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
        </div>
    );
}

export default Productdetail;
