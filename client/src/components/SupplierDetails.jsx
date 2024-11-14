import React from "react";
import './SupplierDetails.css'; 

function SupplierDetails() {
    return (
        <div className="card-container">
            <div className="neumorphic-card highlight-card">
                <h3 className="card-title">Supplier Details</h3>
                <div className="card-info">
                    <div className="info-item">
                        <strong>Supplier Name:</strong>
                        <p>Lathesh Rai</p>
                    </div>
                    <div className="info-item">
                        <strong>Supplier Email:</strong>
                        <p>latheshraikumbra@gmail.com</p>
                    </div>
                    <div className="info-item">
                        <strong>Product:</strong>
                        <p>Banana, Apple, Grapes, Mango</p>
                    </div>
                </div>
                <button className="card-button">Order</button>
            </div>
        </div>
    );
}

export default SupplierDetails;
