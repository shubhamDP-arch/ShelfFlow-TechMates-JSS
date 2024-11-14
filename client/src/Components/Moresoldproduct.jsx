import React from 'react';
import './Moresoldproduct.css';

function ProductTable() {
    const products = [
        { name: 'Product A', totalSold: 50, price: 100, quantity: 200, revenueGenerated: 5000, threshold: 20 },
        { name: 'Product B', totalSold: 30, price: 200, quantity: 100, revenueGenerated: 6000, threshold: 15 },
        { name: 'Product C', totalSold: 70, price: 150, quantity: 300, revenueGenerated: 10500, threshold: 25 },
        { name: 'Product D', totalSold: 90, price: 80, quantity: 250, revenueGenerated: 7200, threshold: 30 }
    ];

    return (
        <div className="product-table-container">
            <h2 className="product-table-title">More Sold Product</h2>
            <table className="product-table">
                <thead>
                    <tr>
                        <th className="product-table-header">Product Name</th>
                        <th className="product-table-header">Total Sold</th>
                        <th className="product-table-header">Price</th>
                        <th className="product-table-header">Quantity</th>
                        <th className="product-table-header">Revenue Generated</th>
                        <th className="product-table-header">Product Threshold</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index} className="product-table-row">
                            <td className="product-table-cell">{product.name}</td>
                            <td className="product-table-cell">{product.totalSold}</td>
                            <td className="product-table-cell"> ₹{product.price}</td>
                            <td className="product-table-cell">{product.quantity}</td>
                            <td className="product-table-cell"> ₹{product.revenueGenerated}</td>
                            <td className="product-table-cell">{product.threshold}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Moresoldproduct;
