import React from "react";
import { useNavigate } from 'react-router-dom';
import '/public/Dashboard.css'

function Dashboard(){
    const Navigate= useNavigate();
    const text = "Stock_Management_made_Easy";
    function handle(){
       Navigate("/login")
    }
    return(
        <>
        <div>
        
        <section className="hero">
        <div >
        <h1 className="typing">
      {text.split("").map((char, index) => (
        <span 
          key={index} 
          className="letter" 
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {char}
        </span>
      ))}
    </h1>
        </div>
            <p>We offer inventory management support to Track your stocks.....Just a click away !</p>
            <div className="hero-buttons">
                <button className="cta" onClick={handle}>Login</button>
                <button className="cta" onClick={handle}>Signup</button>
            </div>
        </section>
        <section className="about-company-section">
          <h1 className="company-title">About ShelfFlow</h1>
    
          <div className="company-content">
            <div className="company-intro">
              <p>
              We are dedicated to revolutionizing inventory management for small businesses. We understand the challenges that small business owners face when it comes to keeping track of products, managing stock levels, and streamlining operations. Our solution is designed to provide a user-friendly, affordable, and efficient way to manage inventory, so small businesses can focus on what truly matters: growth and customer satisfaction.
              </p>
            </div>
    
            <div className="company-details">
              <div className="company-mission">
                <h2>Our Mission</h2>
                <p>To empower small businesses by providing an intuitive, affordable, and effective inventory management solution that enhances operational efficiency, reduces waste, and supports sustainable growth.</p>
              </div>
    
              
    
              <div className="company-goals">
                <h2>Our Goals</h2>
                <p>
                Our goal is to empower small business owners by offering a powerful tool that simplifies inventory management, improves efficiency, and helps them make data-driven decisions. Whether you're running a retail store, an online business, or a small warehouse, our system offers the flexibility and scalability to meet your unique needs.


                </p>
              </div>
            </div>
    
          </div>
        </section>
    
    
        
        </div>
        </>
    )
}
export default Dashboard