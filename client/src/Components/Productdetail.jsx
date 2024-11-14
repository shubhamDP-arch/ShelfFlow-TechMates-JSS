import React from "react";
import './Productdetail.css'; 

function Productdetail() {
    return (
        <div className="product-card-container">
            <div className="product-card highlight-background">
                <h1 className="product-card-title">Product Details</h1>
                <div className="product-card-info">
                    <div className="product-info-item">
                        <span className="label">Product Name:</span>
                        <span className="value">Banana</span>
                    </div>
                    <div className="product-info-item">
                        <span className="label">Quantity:</span>
                        <span className="value">10</span>
                    </div>
                    <div className="product-info-item">
                        <span className="label">Price:</span>
                        <span className="value"> ₹100</span>
                    </div>
                    <div className="product-info-item">
                        <span className="label">Total Sold:</span>
                        <span className="value">1</span>
                    </div>
                    <div className="product-info-item">
                        <span className="label">Revenue Generated:</span>
                        <span className="value"> ₹10</span>
                    </div>
                    <div className="product-info-item">
                        <span className="label">Product Threshold:</span>
                        <span className="value">2</span>
                    </div>
                    <div className="product-info-item">
                        <span className="label">Supplier Name:</span>
                        <span className="value">Lathesh Rai</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Productdetail;
