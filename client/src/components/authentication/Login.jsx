import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Shield, ArrowRight, CheckCircle } from "lucide-react";
import { useAuth } from "../../../store/auth";
// Mock implementations for demonstration - replace with actual implementations
import { useNavigate, Navigate } from "react-router-dom";
const toast = {
    error: (msg) => console.log(`Error: ${msg}`),
    success: (msg) => console.log(`Success: ${msg}`)
};
// const useAuth = () => ({
//     storeTokenInLS: (token) => console.log(`Storing token: ${token}`),
//     token: null,
//     storeShopIdInLS: (id) => console.log(`Storing shop ID: ${id}`)
// });

function Login() {
    const navigate = useNavigate();
    const { storeTokenInLS, token, storeShopIdInLS } = useAuth();
    const [action, setAction] = useState("SignUp");
    const [isOtp, setOtp] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const backapi = "http://localhost:5000";
    const [formData, setFormData] = useState({
        adminName: "",
        email: "",
        password: "",
        otp: ""
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSignUpSubmit = async (event) => {
        if (event && event.preventDefault) {
            event.preventDefault();
        }
        setIsLoading(true);
        
        try {
            const response = await fetch(`${backapi}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    adminName: formData.adminName,
                    email: formData.email,
                    password: formData.password
                })
            });
            const data = await response.json();
            
            if (data.alreadymsg) {
                toast.error(data.alreadymsg);
            } else if (data.msg) {
                toast.success(data.msg);
                setIsSubmitted(true);
                setOtp(true);
            }
        } catch (error) {
            console.error("SignUp Error:", error);
            toast.error("Registration failed. Please try again.");
        }
        
        setIsLoading(false);
    };

    const handleOtpVerification = async (event) => {
        if (event && event.preventDefault) {
            event.preventDefault();
        }
        setIsLoading(true);
        
        try {
            const response = await fetch(`${backapi}/api/auth/verifyotp/${formData.email}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    email: formData.email, 
                    otp: formData.otp 
                })
            });
            const data = await response.json();
            
            if (data.inmsg) {
                toast.error(data.inmsg);
            } else if (data.sucmsg) {
                toast.success(data.sucmsg);
                // Reset form and switch to login
                setFormData({
                    adminName: "",
                    email: "",
                    password: "",
                    otp: ""
                });
                setOtp(false);
                setIsSubmitted(false);
                setAction("Login");
            }
        } catch (error) {
            console.error("OTP Verification Error:", error);
            toast.error("OTP verification failed. Please try again.");
        }
        
        setIsLoading(false);
    };

    const handleLoginSubmit = async (event) => {
        if (event && event.preventDefault) {
            event.preventDefault();
        }
        
        // Validate form data before making API call
        if (!formData.email || !formData.password) {
            toast.error("Please fill in all fields");
            return;
        }

        setIsLoading(true);
        console.log("INSIDE LOGIN")
        try {
            const response = await fetch(`${backapi}/api/auth/login`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });
            
            const data = await response.json();
            console.log(data)
            if (!response.ok) {
                // Handle HTTP error responses
                toast.error(data.message || "Login failed. Please try again.");
            } else if (data.message) {
                toast.error(data.message);
            } else if (data.sucmsg && data.accessToken) {
                toast.success(data.sucmsg);
                storeTokenInLS(data.accessToken);
                if (data.admin && data.admin.shopID) {
                    storeShopIdInLS(data.admin.shopID);
                }
                navigate("/home");
            } else {
                toast.error("Login failed. Invalid response from server.");
            }
        } catch (error) {
            console.error("Login Error:", error);
            toast.error("Network error. Please check your connection and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (event) => {
        if (event && event.preventDefault) {
            event.preventDefault();
        }
        
        if (isOtp && action === "SignUp") {
            handleOtpVerification(event);
        } else if (action === "SignUp") {
            handleSignUpSubmit(event);
        } else {
            handleLoginSubmit(event);
        }
    };

    const resetToSignUp = () => {
        setAction("SignUp");
        setOtp(false);
        setIsSubmitted(false);
        setFormData({
            adminName: "",
            email: "",
            password: "",
            otp: ""
        });
    };

    const resetToLogin = () => {
        setAction("Login");
        setOtp(false);
        setIsSubmitted(false);
        setFormData({
            adminName: "",
            email: "",
            password: "",
            otp: ""
        });
        // Removed the navigate("/home") call from here - navigation should only happen after successful login
    };

    if (token) return <Navigate to='/home' />;

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            {/* Video Background */}
            <video autoPlay loop muted playsInline className="absolute w-full h-full object-cover opacity-30 -z-10">
                <source src="/87789-602074264_small.mp4" type="video/mp4" />
            </video>

            <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
                <div className="w-full max-w-md">
                    {/* Main Card */}
                    <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 transition-all duration-300 hover:shadow-purple-500/20">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mb-4 shadow-lg">
                                <Shield className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                                {isOtp ? "Verify Your Email" : action === "Login" ? "Welcome Back" : "Create Account"}
                            </h2>
                            <p className="text-gray-300 text-sm">
                                {isOtp ? "Enter the OTP sent to your email" : 
                                 action === "Login" ? "Sign in to your account" : "Join us to get started"}
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* Name Field (SignUp only) */}
                            {action === "SignUp" && !isOtp && (
                                <div className="group">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                                        <input
                                            type="text"
                                            placeholder="Enter your full name"
                                            name="adminName"
                                            value={formData.adminName}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Email Field */}
                            {!isOtp && (
                                <div className="group">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            autoComplete="off"
                                            required
                                            className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Password Field */}
                            {!isOtp && (
                                <div className="group">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors" />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            autoComplete="off"
                                            required
                                            className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* OTP Field */}
                            {isOtp && action === "SignUp" && (
                                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 space-y-4">
                                    <div className="flex items-center gap-3 text-green-400">
                                        <CheckCircle className="w-5 h-5" />
                                        <p className="text-sm font-medium">OTP sent to {formData.email}</p>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="otp"
                                            placeholder="Enter 4-digit OTP"
                                            value={formData.otp}
                                            onChange={handleInputChange}
                                            autoComplete="off"
                                            required
                                            className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 text-center text-lg tracking-widest"
                                            maxLength="4"
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={resetToSignUp}
                                        className="text-sm text-gray-400 hover:text-white transition-colors"
                                    >
                                        ← Back to registration
                                    </button>
                                </div>
                            )}

                            {/* Action Toggle Buttons */}
                            {!isOtp && (
                                <div className="flex bg-white/10 rounded-xl p-1 backdrop-blur-sm">
                                    <button
                                        type="button"
                                        onClick={resetToSignUp}
                                        className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                                            action === "SignUp"
                                                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                                                : "text-gray-400 hover:text-white"
                                        }`}
                                    >
                                        Sign Up
                                    </button>
                                    <button
                                        type="button"
                                        onClick={resetToLogin}
                                        className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                                            action === "Login"
                                                ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
                                                : "text-gray-400 hover:text-white"
                                        }`}
                                    >
                                        Login
                                    </button>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="button"
                                onClick={handleFormSubmit}
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        {isOtp && action === "SignUp" ? "Verify OTP" : action === "Login" ? "Sign In" : "Create Account"}
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Footer */}
                        {!isOtp && (
                            <div className="mt-8 text-center">
                                <p className="text-gray-400 text-sm">
                                    {action === "Login" ? "Don't have an account? " : "Already have an account? "}
                                    <button
                                        onClick={() => action === "Login" ? resetToSignUp() : resetToLogin()}
                                        className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                                    >
                                        {action === "Login" ? "Sign up" : "Sign in"}
                                    </button>
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Additional Info Card for SignUp */}
                    {action === "SignUp" && !isOtp && (
                        <div className="mt-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                            <h3 className="text-white font-semibold mb-3">What you'll get:</h3>
                            <ul className="space-y-2 text-sm text-gray-300">
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                    Secure account protection
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                    Access to all features
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                    Email verification for security
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;