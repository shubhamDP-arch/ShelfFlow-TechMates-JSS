import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Package, TrendingUp, Users, Shield, CheckCircle, Star } from 'lucide-react';

function Dashboard(){
    const Navigate = useNavigate();
    const currentYear = new Date().getFullYear();
    const [isVisible, setIsVisible] = useState(false);
    
    const text = "Stock_Management_made_Easy";
    
    useEffect(() => {
        setIsVisible(true);
    }, []);
    
    function handle(){
       Navigate("/Login")
    }

    const features = [
        { icon: Package, title: "Smart Inventory Tracking", desc: "Real-time stock monitoring with automated alerts" },
        { icon: TrendingUp, title: "Analytics Dashboard", desc: "Insights and reports to drive business decisions" },
        { icon: Users, title: "Multi-user Access", desc: "Collaborate with your team seamlessly" },
        { icon: Shield, title: "Secure & Reliable", desc: "Enterprise-grade security for your data" }
    ];

    return(
        <>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Enhanced Hero Section */}
            <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white py-24 px-6 overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-xl animate-pulse"></div>
                    <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full blur-2xl animate-pulse delay-700"></div>
                    <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white rounded-full blur-lg animate-pulse delay-300"></div>
                </div>
                
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between relative z-10">
                    {/* Enhanced Text content */}
                    <div className="lg:w-1/2 mb-12 lg:mb-0 text-center lg:text-left">
                        <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                            <span className="text-sm font-medium flex items-center gap-2">
                                <Star className="w-4 h-4 text-yellow-300" />
                                Trusted by 10,000+ businesses
                            </span>
                        </div>
                        
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                            Modern Inventory Management
                        </h1>
                        <p className="text-xl sm:text-2xl mb-8 text-blue-100 leading-relaxed">
                            Streamline your stock management with AI-powered insights and real-time tracking
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button 
                                onClick={handle}
                                className="group bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold shadow-2xl hover:shadow-3xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                            >
                                Get Started Free
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="border-2 border-white/30 backdrop-blur-sm px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300">
                                Watch Demo
                            </button>
                        </div>
                    </div>

                    {/* Enhanced Image section */}
                    <div className="lg:w-1/2 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur-2xl opacity-30 transform rotate-6"></div>
                            <img
                                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                                alt="Dashboard Preview"
                                className="relative rounded-2xl shadow-2xl w-full max-w-lg transform hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Enhanced Typing Animation Section */}
            <section className="py-20 px-6 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
                        <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-gray-800">
                            {text.split("").map((char, index) => (
                                <span 
                                    key={index} 
                                    className="inline-block hover:text-blue-600 transition-colors duration-200 cursor-default"
                                    style={{ 
                                        animationDelay: `${index * 100}ms`,
                                        animation: `fadeInUp 0.8s ease-out forwards ${index * 50}ms`
                                    }}
                                >
                                    {char === "_" ? " " : char}
                                </span>
                            ))}
                        </h2>
                    </div>
                    
                    <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
                        Transform your inventory management with our cutting-edge platform. Track, analyze, and optimize your stock levels like never before.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <button 
                            onClick={handle}
                            className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
                        >
                            <Package className="w-5 h-5" />
                            Start Managing Inventory
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button 
                            onClick={handle}
                            className="border-2 border-blue-600 text-blue-600 px-10 py-4 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all duration-300"
                        >
                            Create Account
                        </button>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose ShelfFlow?</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Powerful features designed to streamline your inventory management process
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div 
                                key={index}
                                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100"
                            >
                                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <feature.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enhanced About Section */}
            <section className="py-20 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold text-gray-800 mb-4">
                            About <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">ShelfFlow</span>
                        </h1>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-12 mb-16">
                        <p className="text-xl text-gray-700 leading-relaxed text-center max-w-4xl mx-auto">
                            We are dedicated to revolutionizing inventory management for small businesses. We understand the challenges that small business owners face when it comes to keeping track of products, managing stock levels, and streamlining operations. Our solution is designed to provide a user-friendly, affordable, and efficient way to manage inventory, so small businesses can focus on what truly matters: growth and customer satisfaction.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Mission */}
                        <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6 text-white" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
                            </div>
                            <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                To empower small businesses by providing an intuitive, affordable, and effective inventory management solution that enhances operational efficiency, reduces waste, and supports sustainable growth.
                            </p>
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
                                <img 
                                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=500&q=80" 
                                    alt="Mission" 
                                    className="w-full h-48 object-cover rounded-xl"
                                />
                            </div>
                        </div>

                        {/* Goals */}
                        <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="bg-gradient-to-r from-purple-500 to-pink-600 w-12 h-12 rounded-xl flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-white" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-800">Our Goals</h2>
                            </div>
                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-8">
                                <img 
                                    src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=500&q=80" 
                                    alt="Goals" 
                                    className="w-full h-48 object-cover rounded-xl"
                                />
                            </div>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Our goal is to empower small business owners by offering a powerful tool that simplifies inventory management, improves efficiency, and helps them make data-driven decisions. Whether you're running a retail store, an online business, or a small warehouse, our system offers the flexibility and scalability to meet your unique needs.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-20 px-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl sm:text-5xl font-bold mb-6">Ready to Transform Your Business?</h2>
                    <p className="text-xl mb-10 text-blue-100">
                        Join thousands of businesses already using ShelfFlow to optimize their inventory management
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button 
                            onClick={handle}
                            className="group bg-white text-indigo-600 px-10 py-4 rounded-xl font-bold shadow-2xl hover:shadow-3xl hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
                        >
                            <Package className="w-5 h-5" />
                            Start Free Trial
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button 
                            onClick={handle}
                            className="border-2 border-white/30 backdrop-blur-sm px-10 py-4 rounded-xl font-bold hover:bg-white/10 transition-all duration-300"
                        >
                            Schedule Demo
                        </button>
                    </div>
                </div>
            </section>

            {/* Enhanced Footer */}
            <footer className="bg-gray-900 text-white py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="flex items-center gap-3 mb-6 md:mb-0">
                            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center">
                                <Package className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold">ShelfFlow</span>
                        </div>
                        <div className="flex gap-8 text-gray-400">
                            <a href="#" className="hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms</a>
                            <a href="#" className="hover:text-white transition-colors">Support</a>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>© {currentYear} ShelfFlow. All rights reserved. Built with ❤️ for small businesses.</p>
                    </div>
                </div>
            </footer>
        </div>

        <style jsx>{`
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `}</style>
        </>
    )
}

export default Dashboard