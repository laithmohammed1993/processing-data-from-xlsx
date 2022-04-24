import React from 'react'

function TextArea(props) {
  let inputRef = React.useRef(null);
  let { ...attr } = props;
  React.useEffect(()=>{
    resizeIt();
  },[])
  function resizeIt(e) {
    let value = inputRef.current.value;
    var linecount = value.split('\n').length;
    inputRef.current.setAttribute('rows',linecount)
    if( typeof attr.onChange === 'function' && e ){
      attr.onChange(e);
    }
  };
  return (
    <textarea ref={inputRef} { ...attr } onChange={e=>resizeIt(e)}></textarea>
  )
}

export default TextArea