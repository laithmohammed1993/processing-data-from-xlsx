import React from 'react'
import { saveAs } from "file-saver";
import { Packer } from "docx";
import DocxCreator , { headTitles } from '../../middleware/create-docx';
import './style.css';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import Budge from '../../components/Budge';
import TextArea from '../../components/TextArea';
import FileRow from '../../components/FileRow';
const processer = require('../../middleware/processer.js');


const words = {
  'seclectOneFileFromFilesList' : 'اختر ملف واحد من قائمة الملفات',
  'pleaseWait' : 'يرجى الأنتظار',
  'page' : 'صفحة',
  'numberOfRowsPerPage': 'عدد الصفوف لكل صفحة'
} 

function isJSON(string) {
  try {
    let data = JSON.parse(String(string));
    if( typeof data === 'object' && string !== null ){
      return true;
    } else { return false; }
  } catch (error) {
    return false;
  }
}

class CSVViewerPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      numberOfRows : 5,
      isFile : undefined,
      currentPage : 0,
      sections : [],
      pageHeader : `هيئة مشاريع بغداد
قسم ادارة التشييد                                                                     استمارة صرف أجور العمال (الأجر يومي)
مشروع أنشاء خزاني سعة 18000م3   / مصفى الدورة              جدول الحضور للفترة من 1/3/2022 ولغاية   31/3/2022`,
      pageTotal : `المجموع / `,
      pageFooter : `مسؤول الفعالية                    المسؤول الإداري                  محاسب المشروع                          مدير الموقع                     مدير قسم التشييد                الحاسبة                   مدير الهيئة
                                    عقيل غضبان سلمان                احمد فؤاد صالح                       براق غازي ورشان`,
    }
  }
  componentDidMount(){
    this.getData();
  }
  generateDocx(params={}){
    let { sections } = params;
    let docxCreatorss = DocxCreator({ sections });
    Packer.toBlob(docxCreatorss).then(blob => {
      saveAs(blob, `test${Date.now()}.docx`);
    });
  }
  getData(callback=()=>{}){
    let file = new URLSearchParams(window?.location?.search).get('file') || JSON.stringify(window.processerData.csvFile||{});
    file = isJSON(file)?JSON.parse(file):{};
    let { csv } = file;
    if( csv !== undefined && String(csv).length > 30 ){  
      window.processerData.csvFile = file;
      let sections = processer({ 
        'file':csv, 
        header:this.state.pageHeader, 
        footer:this.state.pageFooter , 
        total:this.state.pageTotal , 
        numberOfRows:Number.isInteger(parseInt(this.state.numberOfRows))&&parseInt(this.state.numberOfRows)>0?parseInt(this.state.numberOfRows):5 });
      this.setState({ sections },callback)
    } else {
      this.setState({ isFile:false })
    }
  }
  setPage(direction){
    let { currentPage , sections } = this.state;
    if( direction === 'prev' ){
      currentPage = currentPage - 1;
      currentPage = currentPage < 0 ? 0 : currentPage;
    } else {
      currentPage = currentPage + 1;
      currentPage = currentPage >= sections.length ? sections.length-1 : currentPage;
    } 
    this.setState({ currentPage })
  }
  render() {
    let { sections , isFile , currentPage } = this.state;
    if( isFile === false || typeof window.processerData.csvFile !== 'object' ){
      return <div style={{ display:'flex',justifyContent:'center',alignItems:'center',height:'calc(100vh - 64px)' }}>
        <p style={{ fontFamily:'var(--font-family)',fontSize:32,color:'silver' }} >{isFile===false?words.seclectOneFileFromFilesList:words.pleaseWait}</p>
      </div>
    }
    let { halfDays , days } = ( this.state.sections[currentPage] || {} );
    let headTimeSheet = Array.from( new Array(days||0) ).map((d,i)=>i+1);
    return (
      <div className='html-viewer-page'>
        <div>
          <FileRow file={window.processerData.csvFile} totalPages={sections.length} currentPage={currentPage} setPage={direction=>this.setPage(direction)}/>
          <div style={{ display:'flex',flexDirection:'row',width:'100%',margin:'0 0 var(--padding) 0' }}>
            <TextInput title={words.numberOfRowsPerPage} type='number' value={this.state.numberOfRows} onChange={e=>this.setState({ numberOfRows:e.target.value },()=>{ this.getData();window.laith = this.state.numberOfRows })} />
            <Button title={'حفظ'} onClick={e=>this.getData(()=>this.generateDocx({ 'sections':this.state.sections }))} disabled />
          </div>
          <TextArea value={this.state.pageHeader||''} onChange={e=>{ this.setState({'pageHeader':e.target.value}) }} name='header'></TextArea>
          {sections.length===0?<></>:
            <table className='docx-table'>
              <thead>
                <tr>
                  <th rowSpan='2'>{headTitles[0]}</th>
                  {Array.from(new Array(halfDays)).map((day,i)=><th key={i}>{i+1}</th>)}
                  <th rowSpan='2'>{headTitles[1]}</th>
                  <th rowSpan='2'>{headTitles[2]}</th>
                  <th rowSpan='2'>{headTitles[3]}</th>
                  <th rowSpan='2'>{headTitles[4]}</th>
                  <th rowSpan='2'>{headTitles[5]}</th>
                  <th rowSpan='2'>{headTitles[6]}</th>
                </tr>
                <tr>
                  {Array.from(new Array(halfDays)).map((day,i)=><th key={i}>{(i+halfDays)<days?headTimeSheet[i+halfDays]:"**"}</th>)}
                </tr>
              </thead>
              <tbody>
                {sections[currentPage].data.map(({values,timeSheet},no)=>{
                  return <React.Fragment key={no}>
                    <tr>
                      <th rowSpan='2'>{values[0]}</th>
                      {Array.from(new Array(halfDays)).map((day,i)=><th key={i} style={{ fontFamily:timeSheet[i]==='√'?'Agency FB':'Calibri' }} >{timeSheet[i]}</th>)}
                      <th rowSpan='2'>{values[1]}</th>
                      <th rowSpan='2'>{values[2]}</th>
                      <th rowSpan='2'>{values[3]}</th>
                      <th rowSpan='2'>{values[4]}</th>
                      <th rowSpan='2'>{values[5]}</th>
                      <th rowSpan='2'>{values[6]}</th>
                    </tr>
                    <tr>
                      {Array.from(new Array(halfDays)).map((day,i)=><th key={i} style={{ fontFamily:timeSheet[i+halfDays]==='√'?'Agency FB':'Calibri' }} >{(i+halfDays)<days?timeSheet[i+halfDays]:"**"}</th>)}
                    </tr>
                  </React.Fragment>
                })}
              </tbody>
            </table>
          }
          <TextArea value={this.state.pageTotal} onChange={e=>{ this.setState({'pageTotal':e.target.value}) }} name='total'></TextArea>
          <TextArea value={this.state.pageFooter} onChange={e=>{ this.setState({'pageFooter':e.target.value}) }} name='footer' className='footer'></TextArea>
        </div>
      </div>
    )
  }
}

export default CSVViewerPage;