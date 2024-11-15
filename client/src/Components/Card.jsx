import React from "react";
import {useNavigate} from 'react-router-dom'
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
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.content}</p>
        <button class="Btn" onClick={handleClick}>
  
  <div class="sign">+</div>
  
  <div class="text">{props.say}</div>
</button>
      </div>
    </div>
    )
}
export default Card