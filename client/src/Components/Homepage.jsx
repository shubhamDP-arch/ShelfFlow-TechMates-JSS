import React,{useState,useEffect} from "react";
import'/public/Navbar.css'
import '/public/HomePage.css'
import Navbar from './Navbar'
import Card from "./Card";
function HomePage(){
    return(<div className="main">
        <Navbar />
  
  <div className="Stage">
  <Card img="/public\Animation - 1731351239476.gif" title="Add Product" content="New Product"/>
  <Card img="/public/Animation - 1731351019977.gif" title="Add Stock" content="Adder "/>
  
  <Card img="/public/Animation - 1731350710072.gif" title="Scan With BarCode" content="scanner" sendRequest = "/Scan"/>
    </div>
    </div>

  
);
}
export default HomePage;