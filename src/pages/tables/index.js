import React from 'react'
import './style.css';
import FileRow from '../../components/FileRow';
//
const initialState = { fileUrl:'لا يوجد ملف',html:'' , files:[] };
function TablesPage() {
  let inputRef                = React.useRef();
  let { tableScreenState={} } = window.processerData || {};
  let [ state,setState ]      = React.useReducer((s,d)=>({ ...s,...d }),{...initialState,...tableScreenState});
  function setstate(object) {
    window.processerData.tableScreenState = { ...state , ...object };
    setState({ ...state , ...object })
  }
  function parseCSV(){
    setstate({ emptyInputFile:false });
    if( inputRef.current.files.length === 1 ){
      let { 'path':filePath , name } = inputRef.current.files[0];
      //
      let reader = new FileReader();
      reader.readAsText(inputRef.current.files[0],'utf16le');
      reader.onload = function (evt) {
        let csv = evt.target.result;
        let fileIndex = state.files.findIndex(file=>file.path===filePath);
        if( String(name).includes('.csv') ){
          if( fileIndex === -1 ){
            setstate({ files:[ ...state.files , { 'path':filePath , csv , name , 'addedDate':Date.now() } ],fileUrl:initialState.fileUrl,emptyInputFile:'' })
            inputRef.current.value = '';
          } else {
            setstate({ emptyInputFile:`تم اضافة الملف مسبقا، تأكد من ملف رقم ${fileIndex+1}` });
          }
        } else {
          setstate({ emptyInputFile:'صيغة الملف غير مدعومة' });
        }
      }
      reader.onerror = ()=>{
        setstate({ emptyInputFile:'صيغة الملف غير مدعومة' });
      }
    } else {
      setstate({ emptyInputFile:true })
    }
  }
  return (
    <div className='tables-page-container'>
        <div className="file-input-container">
          <p onClick={parseCSV}>تحميل الملف</p>
          <label htmlFor='xlsxFileInput'><p>أختر الملف : </p><p style={{ color:state.fileUrl===initialState.fileUrl?'silver':'black' }}>{state.fileUrl}</p></label>
          <input type="file" id='xlsxFileInput' onChange={e=>setstate({fileUrl:e.target.files[0].path})} ref={inputRef} required />
        </div>
        {state.emptyInputFile
          ? <div style={{ width:'100%',borderRadius:8,backgroundColor:'rgb(255, 135, 135)',border:'1px solid red',display:'flex',justifyContent:'center',alignItems:'center',margin:'16px 0' }} >
              <p style={{ fontFamily:'var(--font-family)',color:'#520000', }} >{typeof state.emptyInputFile==='string'?state.emptyInputFile:'اختر ملف اولا'}</p>
            </div>
          :<></>}
        <br/>
        <br/>
        <hr style={{ width:'100%' }} />
        <br/>
        <br/>
        {state.files.length > 0
        ? <div style={{ flex:1,overflow:'auto',direction:'rtl' }}>
            {state.files.map((file,i)=>{
              return <FileRow key={i} file={file} index={i} onRemove={index=>setstate({ 'files':state.files.filter((file,x)=>x!==index) })}/>
            })}
          </div>
        : <div style={{ display:'flex',justifyContent:'center',alignItems:'center',flex:1 }}>
            <p style={{ color:'silver',fontFamily:'var(--font-family)' }} >لم يتم تحميل اي ملف</p>
          </div>}
    </div>
  )
}

export default TablesPage