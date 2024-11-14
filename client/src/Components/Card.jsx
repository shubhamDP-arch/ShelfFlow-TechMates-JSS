import React from "react";
import {useNavigate} from 'react-router-dom'

function Card(props){
  const navigate=useNavigate();
  function handleClick(){
      navigate(props.sendRequest);
  }
    return(
        <div className="card" style={{ width: '23rem', height: '29rem' }}>
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
        <a href="#" className=" btn-primary" onClick={handleClick}>Go somewhere</a>
      </div>
    </div>
    )
}
export default Card