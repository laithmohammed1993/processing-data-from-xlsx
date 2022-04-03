import React from 'react'
import "./App.css";
import { BrowserRouter as Router, Routes , Route } from "react-router-dom";
import HomePage from './pages/home';
import ResourcesPage from './pages/resources';
import SideMenu from "./components/SideMenu";
import path from 'path';
import TablesPage from './pages/tables';
import CSVViewerPage from './pages/csv-viewer';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.js'
// const { ipcRenderer } = require('electron')
function App() {
  function name(params) {
    let fs = window.require('fs');
    // let x = fs.readdirSync('../');
    fs.writeFileSync(`C:/Users/sikpane/Desktop/test.txt`,'{"hi":5}','utf-8');
    // console.log({ x })
  }
  return (
    <Router>
      <div className="main-container">
        <div >
          <Routes>
            <Route path="/" index element={<HomePage />} />
            <Route path="/resources" index element={<ResourcesPage />} />
            <Route path="/tables" index element={<TablesPage />} />
            <Route path="/csv-viewer" index element={<CSVViewerPage />} />
          </Routes>
        </div>
        <SideMenu />
      </div>
    </Router>
  );
}
// https://adminlte.io/docs/3.1/
export default App;
