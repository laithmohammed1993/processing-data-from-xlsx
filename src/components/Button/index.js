import React from 'react'
import './style.css';
//
function Button(props) {
  let { title , onClick }  = props;
  //
  return (
    <div className='button-component' onClick={onClick}>
      <p>{title}</p>
    </div>
  )
}

export default Button