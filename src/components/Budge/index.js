import React from 'react'
import Icon from '../Icons';
import './style.css';

function Budge(props) {
  let { color='black' , backgroundColor='white' , icon , onClick=()=>{} , size=40 , iconScale } = props; 
  return (
    <div className='budge-component' style={{ backgroundColor, width:size,height:size  }} onClick={onClick} >
      <Icon name={icon||'times'} color={color} scale={iconScale} />
    </div>
  )
}

export default Budge;
