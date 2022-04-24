import React from 'react'
import { Link } from 'react-router-dom';
import Budge from '../Budge';
import './style.css';

const words = {
  'seclectOneFileFromFilesList' : 'اختر ملف واحد من قائمة الملفات',
  'pleaseWait' : 'يرجى الأنتظار',
  'page' : 'صفحة',
  'numberOfRowsPerPage': 'عدد الصفوف لكل صفحة'
} 

function FileRow(props) {
  let { file , index , onRemove , totalPages , currentPage , setPage=()=>{} } = props;
  return (
    <div className='file-row-component'>
      <p>{Number.isInteger(index)?index + 1:'-'}</p>
      <div className='file-row-component-name'>
        <p>{file.name}</p>
        <p>{file.path}</p>
      </div>
      {totalPages?
        <div style={{ display:'flex',flexDirection:'row',direction:'rtl',backgroundColor:'white' }}>
          <Budge icon='angle-right' size={40} iconScale={1.5} color='white' backgroundColor='var(--blue)' onClick={e=>setPage('prev')}/>
          <p style={{ direction:'rtl',margin:'auto var(--padding)',userSelect:'none' }}>{words.page} {currentPage+1}/{totalPages}</p>
          <Budge icon='angle-left' size={40} iconScale={1.5} color='white' backgroundColor='var(--blue)' onClick={e=>setPage('next')}/>
        </div>
      : <></>}
      {typeof onRemove === 'function'
      ? <div className='file-row-component-buttons'>
          <Budge icon='times' color='white' backgroundColor='var(--pink)' onClick={e=>onRemove(index)} />
          <div style={{ width:16 }}></div>
          <Link to={`/csv-viewer?file=${JSON.stringify(file)}`}>
            <Budge icon='print' color='white' backgroundColor='var(--info)' />
          </Link>
        </div>
      : <></>}
    </div>
  )
}

export default FileRow