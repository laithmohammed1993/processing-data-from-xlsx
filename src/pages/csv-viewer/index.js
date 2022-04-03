import React from 'react'
import { useSelector , useDispatch } from 'react-redux';
import { saveAs } from "file-saver";
import { Packer } from "docx";
import DocxCreator from '../../middleware/create-docx';
import './style.css';
import { connect } from 'react-redux';

function CSVViewerPagess() {
  let globalState = useSelector(state=>state);
  let dispatch = useDispatch()
  let index = null;
  if( window.location.search ){
    index = new URLSearchParams(window?.location?.search).get('index')
  }
  let { csv } = Number.isInteger(parseInt(index))? (globalState.files[index]||{}) : {};
  function getData() {
    //
    let head = csv.split('\r\n').slice(0,12);
    let body = csv.split('\r\n').slice(12).join('\r\n').split('",,,,,').map(str=>str.split(',').filter(str=>!['','\r\n'].includes(str))).map((subarr,i,arr)=>{
      let currentArr = [ ...subarr ];
      let nextArr = Array.isArray(arr[i+1])?arr[i+1]:[];
      let firstTwoIndexes = nextArr.slice(0,2);
      if( i !== 0 ){
        currentArr = currentArr.slice(2);
      }
      return [ ...currentArr , ...firstTwoIndexes ];

    }).map((subarr,i,arr)=>subarr.length===(arr[0].length*2)?[ subarr.slice(0,arr[0].length),subarr.slice(arr[0].length) ]:[subarr]);
    body = [].concat(...body);
    // settable(body);
    // console.log({body}) 
  }
  function generateDocx(){
    let { pageFooter , pageHeader , pageTotal } = globalState.value;
    console.log({...globalState.value})
    let docxCreator = DocxCreator({'header':pageHeader , 'footer':pageFooter, 'total':pageTotal });
    Packer.toBlob(docxCreator).then(blob => {
      saveAs(blob, `test${Date.now()}.docx`);
    });
  }
  return (
    <div className='html-viewer-page'>
      <div>
        <button onClick={getData}>start</button>
        <button onClick={generateDocx}>generate</button>
        {/* <button onClick={e=>app.relaunch()}>restart</button> */}
        <textarea value={globalState.value.pageHeader||''} onChange={e=>{ console.log({value:e.target.value});dispatch({ type:'setValue',data:{name:'pageHeader',value:e.target.value} }) }}></textarea>
        <br/>
        <br/>
        <textarea value={globalState.value.pageTotal} onChange={e=>{ console.log({value:e.target.value});dispatch({ type:'setValue',data:{name:'pageTotal',value:e.target.value} }) }}></textarea>
        <textarea value={globalState.value.pageFooter} onChange={e=>{ console.log({value:e.target.value});dispatch({ type:'setValue',data:{name:'pageFooter',value:e.target.value} }) }} className='footer'></textarea>
        {/* <table>
          <tbody>
            {table.slice(0,table.length-1).map((row,i)=>{
              return <tr key={i}>
                {row.map((str,x)=>{
                  return <td key={x}>{str}</td>
                })}
              </tr>
            })}
          </tbody>
        </table> */}
      </div>
    </div>
  )
}

class CSVViewerPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  generateDocx(){
    let { globalState } = this.props;
    let { pageFooter , pageHeader , pageTotal } = globalState.value;
    console.log({...globalState.value})
    let docxCreatorss = DocxCreator({'header':pageHeader , 'footer':pageFooter, 'total':pageTotal });
    Packer.toBlob(docxCreatorss).then(blob => {
      saveAs(blob, `test${Date.now()}.docx`);
    });
  }
  getData(){

  }
  render() {
    let { dispatch , globalState } = this.props;
    let index = null;
    // if( window.location.search ){
    //   index = new URLSearchParams(window?.location?.search).get('index')
    // }
    // let { csv } = Number.isInteger(parseInt(index))? (globalState.files[index]||{}) : {};
    return (
      <div className='html-viewer-page'>
        <div>
          <button onClick={this.getData}>start</button>
          <button onClick={e=>this.generateDocx()}>generate</button>
          {/* <button onClick={e=>app.relaunch()}>restart</button> */}
          <textarea value={globalState.value.pageHeader||''} onChange={e=>{ console.log({value:e.target.value});dispatch({ type:'setValue',data:{name:'pageHeader',value:e.target.value} }) }}></textarea>
          <br/>
          <br/>
          <textarea value={globalState.value.pageTotal} onChange={e=>{ console.log({value:e.target.value});dispatch({ type:'setValue',data:{name:'pageTotal',value:e.target.value} }) }}></textarea>
          <textarea value={globalState.value.pageFooter} onChange={e=>{ console.log({value:e.target.value});dispatch({ type:'setValue',data:{name:'pageFooter',value:e.target.value} }) }} className='footer'></textarea>
          {/* <table>
            <tbody>
              {table.slice(0,table.length-1).map((row,i)=>{
                return <tr key={i}>
                  {row.map((str,x)=>{
                    return <td key={x}>{str}</td>
                  })}
                </tr>
              })}
            </tbody>
          </table> */}
        </div>
      </div>
    )
  }
}

export default connect((state)=>{
  return {
    globalState : state
  }
},{
  'dispatch' : (object) => { return object },
})(CSVViewerPage)