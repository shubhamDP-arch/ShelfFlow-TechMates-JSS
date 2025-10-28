import React from "react";

import { useEffect, useState } from "react";
import SupplierDetailsCard from "./SupplierDetailsCard";


function SupplierDetails() {
  const [data, setData] = useState([]);
  const backapi = "http://localhost:5000"
  const [shopid, setShopid] = useState(localStorage.getItem("shopid"))
  
  
  useEffect(() => {
    const fetchData = async () => {
      
        const response = await fetch(`${backapi}/api/auth/allSupplier`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({shopid: shopid})
        });
        
        if (response.ok) {
          const result = await response.json()
          
          setData(result.data)
        } 
    };

    fetchData()
  }, [])
  
  console.log(data)
  return (
    <div>
      {data.map((item, index) => (
        <SupplierDetailsCard
        key={index}
        supplier={item || "Default Hello"}
        destination={item._id}
        />
      ))}
    </div>
  );
}

export default SupplierDetails;


