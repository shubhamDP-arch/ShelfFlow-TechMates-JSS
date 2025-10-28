import React from "react";
import {useNavigate} from 'react-router-dom'
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
import '/public/card.css'
function Card(props){
  const navigate=useNavigate();
  function handleClick(){
      navigate(props.sendRequest);
  }
    return(
        <div className="cardhome" >
      <img
        className=" clsImg bd-placeholder-img card-img-top" 
        width="100%" 
        height="250" 
        src={props.img} 
        role="img" 
        aria-label="Placeholder: Image cap" 
        preserveAspectRatio="xMidYMid slice" 
        focusable="false"
      >
        
       
       
      </img>
      <div className="card-body">
        <h5 className="card-title1">{props.title}</h5>
        <p className="card-text">{props.content}</p>
        <button className="Btn" onClick={handleClick}>
  
  <div className="sign">+</div>
  
  <div className="text">{props.say}</div>
</button>
      </div>
    </div>
    )
}
export default Card