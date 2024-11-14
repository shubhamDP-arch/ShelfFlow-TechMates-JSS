import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
const NoticationPage = () => {

  const [data, setData] = useState([]);
  
  const backapi = "http://localhost:5000"
  useEffect(() => {
    const fetchData = async () => {
      
        const response = await fetch(`${backapi}/api/auth/notifications`, {
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