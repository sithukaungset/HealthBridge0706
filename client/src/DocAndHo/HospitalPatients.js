import axios from 'axios'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ItemPatient from './ItemPatient';
function HospitalPatients() {
    const {id} = useParams();
    const BASE_URL = "http://203.247.240.226:8080/fhir"

    const [patientList, setPatientsList] = useState([]);
    const [hospital, setHospital] = useState();

    async function getPatients() {
        let temp = [];
        await axios.get(`${BASE_URL}/Patient?organization=${id}`).then((res) => {
            console.log("hospitalPatient: ", res.data.entry);
            for(const item of res.data.entry) {
                if(item.resource.meta.tag === undefined) {
                    temp.push(item);
                } 
            }
            setPatientsList(temp);
        });
    }

    async function getHospital() {
        await axios.get(`${BASE_URL}/Organization/${id}`).then((res) => {
            setHospital(res.data);
        })
    }

    useEffect(() => {
        getHospital();
        getPatients();
    },[])
    
    return (
        <div className="hospital_patients">
            <div className='hospital_info_container'>
                <div className='title'>{hospital ? hospital.name : <></>}</div>
                <div className='address'>
                    {hospital ? hospital.address[0].line[0] : <></>}
                </div>
                <div className='telecom'>{hospital ? hospital.telecom[0].value : <></>}</div>
            </div>
            <ItemPatient patients={patientList} />
        </div>
    )
}

export default HospitalPatients;