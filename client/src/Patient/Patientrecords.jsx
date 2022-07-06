import axios from 'axios'
import { useEffect, useState } from 'react';
import Search from "./Search"
import RecordsList from "./RecordsList"

import "../css/PatientRecord.css"

function Patientrecords() {

  const [record, setRecord] = useState([]);

  async function getRecords() {
    let temp = [];
    await axios.get(`http://203.247.240.226:8080/fhir/Patient?phone=010-9385-6525&name=jhikyuinn`).then((res) => {
      for(const item of res.data.entry) {
        if(item.resource.meta.tag  == undefined) {
            temp.push(item);
        } 
      }
      setRecord(temp);
    });
}

useEffect(() => {
  getRecords();
},[])

  return(
    <div>
    <Search></Search>
    <RecordsList record={record} />
    

    </div>
);
}





export default Patientrecords;