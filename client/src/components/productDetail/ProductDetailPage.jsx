import React, { useEffect, useState } from "react";
import Productdetail from "./Productdetail";
import Navbar from "../essentials/Navbar";

function ProductDetailPage() {
  const [data, setData] = useState([]);
  const backapi = "http://localhost:5000";
  const shopid = localStorage.getItem("shopid");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${backapi}/api/auth/getproducts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shopid })
      });

      if (response.ok) {
        const result = await response.json();
        setData(result.products);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-wrap justify-center">
        {data.map((product, index) => (
          <Productdetail key={index} product={product} destination={product._id} />
        ))}
      </div>
    </div>
  );
}

export default ProductDetailPage;
