import React from 'react'
import "./App.css";
import { BrowserRouter as Router, Routes , Route } from "react-router-dom";
import SideMenu from "./components/SideMenu";
import TablesPage from './pages/tables';
import CSVViewerPage from './pages/csv-viewer';
import AboutScreen from './pages/about';

function App() {
  React.useEffect(()=>{
    window.processerData = {};
  },[])
  return (
    <Router>
      <div className="main-container">
        <div >
          <Routes>
            <Route path="/" index element={<TablesPage />} />
            <Route path="/csv-viewer" element={<CSVViewerPage />} />
            <Route path="/about" element={<AboutScreen />} />
          </Routes>
        </div>
        <SideMenu />
      </div>
    </Router>
  );
}
export default App;
