import React, { useState, useEffect } from "react";
import { Package, Scan, Plus, Boxes, TrendingUp, BarChart3 } from 'lucide-react';
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
// Import your navbar component here
// import YourNavbarComponent from './path/to/your/navbar';

function HomePage() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const navigate = useNavigate();
    
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const handleNavigation = (route) => {
        console.log(`Navigating to: ${route}`);
        // Your navigation logic here
        navigate(route);
    };

    const cards = [
        {
            id: 1,
            icon: <Package className="w-8 h-8" />,
            title: "Add Product",
            content: "New Stock? Add it right here!",
            action: "Add Product",
            route: "/Addproduct",
            gradient: "from-blue-500 to-purple-600",
            hoverGradient: "from-blue-600 to-purple-700",
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600"
        },
        {
            id: 2,
            icon: <Boxes className="w-8 h-8" />,
            title: "Add Stock",
            content: "Stock Refill? Add it right here!",
            action: "Add Stock",
            route: "/AddProductDetail",
            gradient: "from-green-500 to-teal-600",
            hoverGradient: "from-green-600 to-teal-700",
            iconBg: "bg-green-100",
            iconColor: "text-green-600"
        },
        {
            id: 3,
            icon: <Scan className="w-8 h-8" />,
            title: "Scan Barcode",
            content: "Got a customer? Scan here",
            action: "Start Scan",
            route: "/Scan",
            gradient: "from-orange-500 to-red-600",
            hoverGradient: "from-orange-600 to-red-700",
            iconBg: "bg-orange-100",
            iconColor: "text-orange-600"
        }
    ];

    const stats = [
        { label: "Products", value: "1,247", icon: <Package className="w-5 h-5" />, color: "text-blue-600" },
        { label: "Low Stock", value: "23", icon: <TrendingUp className="w-5 h-5" />, color: "text-red-600" },
        { label: "Categories", value: "45", icon: <BarChart3 className="w-5 h-5" />, color: "text-green-600" }
    ];

    return (
        <>
        
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            {/* Replace this comment with your navbar component */}
            {/* <YourNavbarComponent /> */}
            <Navbar></Navbar>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">
                        Welcome back! 👋
                    </h2>
                    <p className="text-lg text-gray-600">
                        Manage your inventory with ease and efficiency
                    </p>
                </div>

                {/* Stats Cards */}
                

                {/* Main Action Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            className="group relative bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden"
                            onClick={() => handleNavigation(card.route)}
                        >
                            {/* Background Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                            
                            {/* Icon */}
                            <div className={`w-16 h-16 ${card.iconBg} rounded-2xl flex items-center justify-center mb-6 ${card.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                                {card.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-gray-900">
                                {card.title}
                            </h3>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                {card.content}
                            </p>

                            {/* Action Button */}
                            <button className={`w-full py-4 px-6 bg-gradient-to-r ${card.gradient} hover:${card.hoverGradient} text-white font-semibold rounded-2xl transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2`}>
                                <Plus className="w-5 h-5" />
                                <span>{card.action}</span>
                            </button>

                            {/* Decorative Elements */}
                            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-white/10 to-white/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions Footer */}
                <div className="mt-12 bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                    <div className="flex flex-wrap gap-4">
                        <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium">
                            View Reports
                        </button>
                        <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium">
                            Export Data
                        </button>
                        <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium">
                            Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default HomePage;