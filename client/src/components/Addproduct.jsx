import React, { useState } from "react";
import './Addproduct.css';

function AddProduct() {

  const [imageinput, setImageInput] = useState(false)
  const [imgsource, setImagesource] = useState("")
  const backapi = `http://localhost:5000`

  const [formData, setFormData] = useState({
    productName: "",
    supplierName: "",
    supplierEmail: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
    console.log("Submitted Data:", formData);

    try {
      console.log(formData)
        const response = await fetch(`${backapi}/api/auth/insertproduct`, {
          method: "POST",
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        })
        const message = await response.json();
        console.log(message)
        setImagesource(message.imagesource)
        setImageInput(true)
    } catch (error) {
      console.log(error)
    }
  };

  const imgpath = `../../public/images/${imgsource}`

  return (
    <div>
      <div>
        <h1 className>Product Information</h1>
        <form className onSubmit={handleSubmit}>
          <label className>
            Product Name:
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="form-input"
              required
            />
          </label>
          <label classNam>
            Supplier Name:
            <input
              type="text"
              name="supplierName"
              value={formData.supplierName}
              onChange={handleChange}
              className="form-input"
              required
            />
          </label>
          <label>
            Supplier Email:
            <input
              type="email"
              name="supplierEmail"
              value={formData.supplierEmail}
              onChange={handleChange}
              className="form-input"
              required
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="form-input"
              required
            />
          </label>
          <button type="submit" className="form-button">Generate Barcode</button>
        </form>
        <img src={imgpath} alt="" />
      </div>
    </div>
  );
}

export default AddProduct;