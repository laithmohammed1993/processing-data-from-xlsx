import "./App.css";
import * as XLSX from 'xlsx';
import path from 'path';
import { BrowserRouter as Router, Routes , Route } from "react-router-dom";
import HomePage from './pages/home';
import ResourcesPage from './pages/resources';
import SideMenu from "./components/SideMenu";

function App() {
  function getData(e) {
    let file = e.target.files[0];
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
  return (
    <Router>
      <div className="main-container">
        <div>
          <Routes>
            <Route path="/" index element={<HomePage />} />
            <Route path="/resources" index element={<ResourcesPage />} />
          </Routes>
        </div>
        <SideMenu />
      </div>
    </Router>
  );
}

export default App;
