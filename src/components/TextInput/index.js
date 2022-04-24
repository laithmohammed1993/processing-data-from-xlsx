import React from 'react'
import './style.css';

function TextInput(props) {
  let { title , ...attr } = props;
  return (
    <div className="text-input-component">
      <p>{title}</p>
      <input type="text" { ...attr } />
    </div>
  )
}

export default TextInput