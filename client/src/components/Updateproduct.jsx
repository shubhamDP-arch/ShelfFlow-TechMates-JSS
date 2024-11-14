import React, { useState, useEffect } from 'react';
import './Updateproduct.css';
import { useParams } from 'react-router-dom';

function UpdateProduct() {
    const [product, setProduct] = useState({
        productname: '',
        quantity: '',
        price: '',
        supplierName: '',
        total_sold: '',
        revenue_generated: '',
        productthreshold: ''
    });

    const { product: productId } = useParams();
    const backapi = "http://localhost:5000";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${backapi}/api/auth/product/${productId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
    
                if (response.ok) {
                    const result = await response.json();
                    // Populate form fields with data from API response
                    setProduct({
                        productname: result.productname || '',
                        quantity: result.quantity || '',
                        price: result.price || '',
                        supplierName: result.supplierName || '',
                        total_sold: result.total_sold || '',
                        revenue_generated: result.revenue_generated || '',
                        productthreshold: result.productthreshold || ''
                    });
                } else {
                    console.error("Failed to fetch product details");
                }
            } catch (error) {
                console.error("Error fetching product details:", error);
            }
        };
    
        fetchData();
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`${backapi}/api/auth/product/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });

            if (response.ok) {
                console.log("Product updated successfully");
            } else {
                console.error("Failed to update product");
            }
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    return (
        <div className="update-product-wrapper">
            <div className="product-form-container">
                <h2 className="product-form-title">Update Your Product</h2>
                <form className="product-form" onSubmit={handleSubmit}>
                    <label className="product-form-label">Product Name
                        <input type="text" name="productname" value={product.productname} onChange={handleChange} className="product-form-input" required />
                    </label>
                    <label className="product-form-label">Quantity
                        <input type="number" name="quantity" value={product.quantity} onChange={handleChange} className="product-form-input" required />
                    </label>
                    <label className="product-form-label">Price
                        <input type="number" name="price" value={product.price} onChange={handleChange} className="product-form-input" required />
                    </label>
                    <label className="product-form-label">Supplier Name
                        <input type="text" name="supplierName" value={product.supplierName} onChange={handleChange} className="product-form-input" required />
                    </label>
                    <label className="product-form-label">Total Sold
                        <input type="number" name="total_sold" value={product.total_sold} onChange={handleChange} className="product-form-input" required />
                    </label>
                    <label className="product-form-label">Revenue Generated
                        <input type="number" name="revenue_generated" value={product.revenue_generated} onChange={handleChange} className="product-form-input" required />
                    </label>
                    <label className="product-form-label">Threshold Quantity
                        <input type="number" name="productthreshold" value={product.productthreshold} onChange={handleChange} className="product-form-input" required />
                    </label>
                    <button type="submit" className="product-form-submit">Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateProduct;
