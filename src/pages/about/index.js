import React from 'react'

function AboutScreen() {
  return (
    <div style={{ display:'flex',justifyContent:'center',alignItems:'center',minHeight:'100vh',flexDirection:"column" }} >
      <img src='/assets/media/my-logo.png' style={{ width:'10%' }} />
      <p style={{ fontFamily:'monospace',font:14,margin:0,color:'silver', backgroundColor:'var(--blue)',padding:'0px 8px',borderRadius:4 }}><span style={{ color:'white' }}>laithmohammedsaker</span>@gmail.com</p>
      <p style={{ fontFamily:'monospace',font:14,margin:0,color:'silver' }}>version 1.0</p>
    </div>
  )
}

export default AboutScreen