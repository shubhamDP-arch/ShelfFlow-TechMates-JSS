import React, { useState, useEffect } from 'react';
import { Package, DollarSign, TrendingUp, Users, AlertTriangle, ShoppingCart } from 'lucide-react';
import { useParams } from "react-router-dom";

function UpdateProduct() {
    const [product, setProduct] = useState({
        productname: '',
        quantity: '',
        price: '',
        supplierName: '',
        total_sold: '',
        revenue_generated: '',
        productthreshold: ''
    });

    // Mock params for demo - replace with actual useParams in your app
    const { product: productId } = useParams();
    const backapi = "http://localhost:5000";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${backapi}/api/auth/product/${productId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
    
                if (response.ok) {
                    const result = await response.json();
                    setProduct({
                        productname: result.productname || '',
                        quantity: result.quantity || '',
                        price: result.price || '',
                        supplierName: result.supplierName || '',
                        total_sold: result.total_sold || '',
                        revenue_generated: result.revenue_generated || '',
                        productthreshold: result.productthreshold || ''
                    });
                } else {
                    console.error("Failed to fetch product details");
                }
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };
    
        fetchData();
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`${backapi}/api/auth/product/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });

            if (response.ok) {
                console.log("Product updated successfully");
            } else {
                console.error("Failed to update product");
            }
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log("Clicked Update");

        try {
            const response = await fetch(`${backapi}/api/auth/updateproduct`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    productid: productId,
                    quantity: Number(product.quantity),
                    price: Number(product.price),
                    total_sold: Number(product.total_sold),
                    productthreshold: Number(product.productthreshold),
                    supplierName: product.supplierName
                })
            });

            if (response.ok) {
                console.log("Product updated successfully");
            } else {
                console.error("Failed to update product");
            }
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const getFieldIcon = (fieldName) => {
        switch (fieldName) {
            case 'productname': return <Package className="w-5 h-5" />;
            case 'quantity': return <ShoppingCart className="w-5 h-5" />;
            case 'price': return <DollarSign className="w-5 h-5" />;
            case 'supplierName': return <Users className="w-5 h-5" />;
            case 'total_sold': return <TrendingUp className="w-5 h-5" />;
            case 'revenue_generated': return <DollarSign className="w-5 h-5" />;
            case 'productthreshold': return <AlertTriangle className="w-5 h-5" />;
            default: return <Package className="w-5 h-5" />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 flex items-center justify-center">
            <div className="w-full max-w-4xl">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
                        <Package className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2">Update Product</h1>
                    <p className="text-slate-300">Manage your product information with precision</p>
                </div>

                {/* Main Form Container */}
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
                    <div onSubmit={handleUpdate} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Product Name */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                                    {getFieldIcon('productname')}
                                    Product Name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="productname"
                                        value={product.productname}
                                        onChange={handleChange}
                                        disabled
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                        <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                                    {getFieldIcon('quantity')}
                                    Quantity
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={product.quantity}
                                        onChange={handleChange}
                                        disabled
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                        <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                                    {getFieldIcon('price')}
                                    Price
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="price"
                                        value={product.price}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-transparent hover:bg-white/10 transition-all duration-200"
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Supplier Name */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                                    {getFieldIcon('supplierName')}
                                    Supplier Name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="supplierName"
                                        value={product.supplierName}
                                        onChange={handleChange}
                                        disabled
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                        <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Total Sold */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                                    {getFieldIcon('total_sold')}
                                    Total Sold
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="total_sold"
                                        value={product.total_sold}
                                        onChange={handleChange}
                                        disabled
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                        <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Revenue Generated */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                                    {getFieldIcon('revenue_generated')}
                                    Revenue Generated
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="revenue_generated"
                                        value={product.revenue_generated}
                                        onChange={handleChange}
                                        disabled
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                        <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Threshold Quantity - spans full width */}
                            <div className="md:col-span-2 space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                                    {getFieldIcon('productthreshold')}
                                    Threshold Quantity
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="productthreshold"
                                        value={product.productthreshold}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent hover:bg-white/10 transition-all duration-200"
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                onClick={handleUpdate}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 group"
                            >
                                <Package className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
                                Update Product
                                <div className="w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-slate-400 text-sm">
                        Make changes carefully • Only editable fields can be modified
                    </p>
                </div>
            </div>
        </div>
    );
}

export default UpdateProduct;