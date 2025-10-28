import React from 'react';
import Navbar from '../essentials/Navbar';

const Contactus = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 font-[Poppins] min-h-[90vh] px-6 py-12">
        {/* Contact Info Box */}
        <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white p-8 rounded-3xl shadow-2xl w-full max-w-sm relative md:top-8 md:-mr-16 z-30">
          <h2 className="text-3xl font-extrabold mb-8 tracking-wide drop-shadow-lg">
            Contact Us
          </h2>
          <div className="flex items-center mb-6 space-x-4">
            <i className="fas fa-map-marker-alt text-2xl text-yellow-400 drop-shadow"></i>
            <p className="text-lg font-medium leading-relaxed">
              295 Witting Streets Suite 666, <br /> Melbourne, Australia
            </p>
          </div>
          <div className="flex items-center mb-6 space-x-4">
            <i className="fas fa-phone-alt text-2xl text-yellow-400 drop-shadow"></i>
            <p className="text-lg font-medium leading-relaxed">
              (01) 7349516919<br />
              (01) 479-642-7462
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <i className="fas fa-envelope text-2xl text-yellow-400 drop-shadow"></i>
            <p className="text-lg font-medium leading-relaxed">
              anderson@hotmail.com<br />
              hello@hotmail.com
            </p>
          </div>
        </div>

        {/* Contact Form Box */}
        <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md z-20">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-wide">
            Or Write Us
          </h2>
          <form className="flex flex-col space-y-6">
            <input
              type="text"
              placeholder="Name *"
              required
              className="border border-gray-300 rounded-xl px-5 py-4 text-lg font-medium placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-400 transition"
            />
            <input
              type="email"
              placeholder="Email *"
              required
              className="border border-gray-300 rounded-xl px-5 py-4 text-lg font-medium placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-purple-400 transition"
            />
            <textarea
              placeholder="Enter Your Message"
              required
              className="border border-gray-300 rounded-xl px-5 py-4 text-lg font-medium placeholder-gray-400 resize-none h-36 focus:outline-none focus:ring-4 focus:ring-purple-400 transition"
            ></textarea>
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white py-4 rounded-xl font-semibold tracking-wide shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contactus;
