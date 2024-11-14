import React, { useState } from "react";
import './Addproduct.css';

function App() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
    console.log("Submitted Data:", formData);
  };

  return (
    <div className="app-background">
      <div className="form-container">
        <h1 className="form-heading">Product Information</h1>
        <form className="form" onSubmit={handleSubmit}>
          <label className="form-label">
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
          <label className="form-label">
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
          <label className="form-label">
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
          <label className="form-label">
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
      </div>
    </div>
  );
}

export default App;