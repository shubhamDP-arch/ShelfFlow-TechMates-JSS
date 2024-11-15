import React,{useState,useEffect} from "react";
import'/public/Navbar.css'
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
import '/public/HomePage.css'
import Navbar from './Navbar'
import Card from "./Card";
function HomePage(){
    return(<div className="main">
     
  
  <div className="Stage">
  <div className="card1">
  <Card img="/public/eco-shopping-animate.svg" title="Add Product" content="New Stock ? Add it right here !" say="Add"sendRequest="/Addproduct"/>
  </div>
  
  <div className="card1">
  <Card img="/public/checking-boxes-animate.svg" title="Add Stock" content="Stock Refill ? Add it right here !"say="Add"/>
  </div>
  <div className="card1">
  <Card img="/public/barcode-animate.svg"title="Scan With BarCode" content="Got a customer ? Scan here" sendRequest = "/Scan" say="Scan"/>
  </div>
    </div>
    
    </div>

);
}
export default HomePage;