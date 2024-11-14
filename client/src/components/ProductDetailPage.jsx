import { useEffect, useState } from "react"
import { useAuth } from "../../store/auth"
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast"
import { useParams } from 'react-router-dom';
const ProductDetailPage = () => {
  const { productId } = useParams();
  const [data, setData] = useState([]);
  console.log(productId)
  const backapi = "http://localhost:5000"
  useEffect(() => {
    const fetchData = async () => {
      
        const response = await fetch(`${backapi}/api/auth//productdetail/${productId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const result = await response.json()
          
          setData(result)
        } 
    };

    fetchData()
  }, [productId])
  console.log(data)
}


export default ProductDetailPage;