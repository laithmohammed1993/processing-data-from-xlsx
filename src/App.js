import React from 'react'
import "./App.css";
import SideMenu from "./components/SideMenu";
import TablesPage from './pages/tables';
import CSVViewerPage from './pages/csv-viewer';
import AboutScreen from './pages/about';

function App() {
  let [ state, setstate ] = React.useReducer((s,d)=>({ ...s,...d }),{ pathname:'/', })
  React.useEffect(()=>{
    window.processerData = {};
    window.appRouting = (object)=>setstate(object);
  },[]);
  let page = <></>;
  switch (state.pathname) {
    case '/':
      page = <TablesPage />;
      break;
    case '/csv-viewer':
      page = <CSVViewerPage file={state.file} />;
      break;
    case '/about':
      page = <AboutScreen />;
      break;
    default:
      break;
  }
  return (
    <div className="main-container">
      <div >
        {page}
      </div>
      <SideMenu routing={({pathname})=>setstate({ pathname })} pathname={state.pathname}/>
    </div>
  );
}
export default App;
