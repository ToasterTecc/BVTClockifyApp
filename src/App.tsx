import { useEffect, useState } from "react";
import MasterUpdate from "./MasterUpdate";
import ClockifyUpdate from "./ClockifyUpdate";
import GenerateCSV from "./GenerateCSV";
import { getProjects } from "../api/api";

//import css
import "./css.css";


function App() {
  const [options, setOptions] = useState([{ project: "" }]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getProjects();

      setOptions(res);
    };

    fetchData();
  }, []);

  return (
    <div className="div-container">
      <div>
      <img src="./src/logo.png" />
      </div>
      <h1>Clockify CSV Upload</h1>
      <hr></hr>
      <MasterUpdate />
      <ClockifyUpdate />
      <GenerateCSV options={options} />
    </div>
  );
}

export default App;
