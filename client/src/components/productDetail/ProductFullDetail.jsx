import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [data, setData] = useState(null);
  const backapi = "http://localhost:5000";

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${backapi}/api/auth/productdetail/${productId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const result = await response.json();
        setData(result);
      }
    };

    fetchData();
  }, [productId]);

  if (!data) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4">{data.productname}</h1>
      <p className="mb-2"><strong>Price:</strong> ₹{data.price}</p>
      <p className="mb-2"><strong>Quantity:</strong> {data.quantity}</p>
      <p className="mb-2"><strong>Revenue:</strong> ₹{data.revenue_generated}</p>
      <p className="mb-2"><strong>Threshold:</strong> {data.productthreshold}</p>
      <p className="mb-2"><strong>Supplier:</strong> {data.supplierName}</p>
    </div>
  );
};

export default ProductDetailPage;
