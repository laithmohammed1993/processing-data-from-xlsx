import React from 'react'
import './style.css';
import * as XLSX from 'xlsx';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const fs = window.require('fs');
const parser = require('csv-parser')

function TablesPage() {
  let inputRef      = React.useRef();
  let globalState   = useSelector(state=>state);
  let dispatch      = useDispatch();
  let [ state,setstate ] = React.useReducer((s,d)=>({ ...s,...d }),{ fileUrl:'لا يوجد ملف',html:'' })
  function processFile() {
    let file = inputRef.current.files[0];
    if( file ){
      let reader = new FileReader();
      reader.readAsBinaryString(file)
      reader.onload = function() {
        let wb = XLSX.read(reader.result,{type:'binary'});
        /* Get first worksheet */
        let wsname = wb.SheetNames[0];
        let ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        // const data = XLSX.utils.sheet_to_csv(ws, {header:1});
        /* Update state */
        console.log(wb);
        var workbook = XLSX.read(reader.result,{type:'binary'});
        var sheet_name_list = workbook.SheetNames;
        console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[1]]))
      };
    }
  }
  function getFileContent(){
    let filePath = inputRef.current.files[0].path;
    let html = fs.readFileSync(filePath,'utf-8');
    dispatch({ type:'addNewFile',data:{ 'path':filePath , html , 'addedDate':Date.now() } })
  }
  function parseCSV(){
    let filePath = inputRef.current.files[0].path;
    let csv = fs.readFileSync(filePath,'utf16le');
    dispatch({ type:'addNewFile',data:{ 'path':filePath , csv , 'addedDate':Date.now() } })
  }
  return (
    <div className='tables-page-container'>
        <div className="file-input-container">
          <p onClick={parseCSV}>معالجة الملف</p>
          <label htmlFor='xlsxFileInput'><p>أختر الملف : </p><p>{state.fileUrl}</p></label>
          <input type="file" id='xlsxFileInput' onChange={e=>setstate({fileUrl:e.target.files[0].path})} ref={inputRef} required />
        </div>
        {Object.values(globalState.files).map((file,i)=>{
          return <div key={i} >
            <Link to={`/csv-viewer?index=${i}`}>{file.path}</Link>
          </div>
        })}
        {/* <div dangerouslySetInnerHTML={{__html:state.html}}></div> */}
    </div>
  )
}

export default TablesPage