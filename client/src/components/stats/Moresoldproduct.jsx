import React, { useState, useEffect } from 'react';
import Navbar from '../essentials/Navbar';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [shopid] = useState(localStorage.getItem("shopid"));

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5000/api/auth/soldproducts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ shopid }),
        });

        const message = await response.json();
        if (message.items) {
          setProducts(message.items);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchData();
  }, [shopid]);

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-12 p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
          More Sold Product
        </h2>
        {products.length > 0 ? (
          <Bar
            data={{
              labels: products.map((p) => p.productname),
              datasets: [
                {
                  label: 'Revenue Generated (₹)',
                  data: products.map((p) => p.revenue_generated),
                  backgroundColor: '#10b981', // Tailwind green-500 color
                  borderRadius: 6,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: {
                  display: true,
                  text: 'Revenue per Product',
                  font: { size: 18 },
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: (value) => `₹${value}`,
                  },
                },
              },
            }}
          />
        ) : (
          <p className="text-center text-gray-500">No products to display.</p>
        )}
      </div>
    </>
  );
}

export default ProductTable;
