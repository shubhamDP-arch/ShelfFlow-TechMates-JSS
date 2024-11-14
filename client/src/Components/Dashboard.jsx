import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '/public/Dashboard.css'

function Dashboard(){
    const Navigate= useNavigate();
    const currentYear = new Date().getFullYear();
    
    const text = "Stock_Management_made_Easy";
    function handle(){
       Navigate("/Login")
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
        <div className="heropara">
             <p>We offer inventory management support to Track your stocks.....Just a click away !</p></div>     
            <div className="hero-buttons">
                <button className="cta" onClick={handle}>Login</button>
                <button className="cta" onClick={handle}>Signup</button>
            </div>
        </section>
        <section className="about-company-section">
  <h1 className="company-title">About <span className="companyshelf">ShelfFlow</span></h1>

  <div className="company-content">
    <div className="company">
      <p>
        We are dedicated to revolutionizing inventory management for small businesses. We understand the challenges that small business owners face when it comes to keeping track of products, managing stock levels, and streamlining operations. Our solution is designed to provide a user-friendly, affordable, and efficient way to manage inventory, so small businesses can focus on what truly matters: growth and customer satisfaction.
      </p>
    
    </div>

    <div className="company-details">
      <div className="company-mission">
        <h2>Our Mission</h2>
        <div className="flex-container">
          <div className="content">
            <p>To empower small businesses by providing an intuitive, affordable, and effective inventory management solution that enhances operational efficiency, reduces waste, and supports sustainable growth.</p>
          </div>
          <div className="image">
            <img src="/public/Business mission-pana.png" alt="Mission Image"></img>
          </div>
        </div>
      </div>

      <div className="company-goals">
        <h2>Our Goals</h2>
        <div className="flex-container">
        <div className="image">
            <img src="/public/Team goals-cuate.png" alt="Goals Image"></img>
          </div>
          <div className="content">
            <p>Our goal is to empower small business owners by offering a powerful tool that simplifies inventory management, improves efficiency, and helps them make data-driven decisions. Whether you're running a retail store, an online business, or a small warehouse, our system offers the flexibility and scalability to meet your unique needs.</p>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</section>
<footer className="footer">
      <p className="footer-text">© {currentYear} ShelfFlow. All rights reserved.</p>
    </footer>
    
        
        </div>
        </>
    )
}
export default Dashboard