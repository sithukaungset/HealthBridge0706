import SideMenu from './SideMenu';
import KyuHeader from '../Patient/Header';
import HospitalRight from './HospitalRight';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
function Hospital() {
    const location = useLocation();
    const [state, setState] = useState(0);

    return (
        <div className="hospital">
            <KyuHeader />
            <div className='hospital_main'>
                <div className='hospital_content'>
                    <SideMenu setState={setState}/>
                    <div className='right_content' >
                        <HospitalRight state={state} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hospital;
// "resourceType": "Patient",
//             "id": formData.account,
//             "text": {
//                 "status": "generated",
//                 "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><table class=\"hapiPropertyTable\"><tbody/></table></div>"
//             },
//             "identifier": [
//                 {
//                     "use": "usual",
//                     "assigner": {
//                         "display": formData.assigner,
//                     }
//                 }
//             ],
//             "name": [
//                 {
//                     "text": formData.name
//                 }
//             ],
//             "age": formData.age,
//             "address" : [
//                 {
//                     "use": "home",
//                     "text": formData.address
//                 }
//             ],
//             "telecom": [
//                 {
//                     "system": "phone",
//                     "value": formData.telecome.myPhone,
//                     "use": "mobile"
//                 }
//             ],
//             "gender": formData.gender,
//             "contact": [
//                 {
//                     "relationship":[
//                         {
//                             "text":formData.contact.relationship
//                         }
//                     ],
//                     "name": {
//                         "text": formData.contact.name
//                     },
//                     "gender": formData.contact.gender,
//                     "telecom": [
//                         {
//                             "system": "phone",
//                             "value": formData.contact.phone,
//                             "use": "mobile"
//                         }
//                     ],
//                     "address": [
//                         {
//                             "use":"home",
//                             "text": formData.contact.address
//                         }
//                     ]
//                 }
//             ],
//             "extension" : [
//                 {
//                     "url": "symptom",
//                     "valueString": formData.symptom
//                 },
//                 {
//                     "url": "comment",
//                     "valueString": formData.comment
//                 },
//                 {
//                     "url": "doctor",
//                     "valueString": formData.doctorName
//                 },
//                 {
//                     "url": "doctorAddr",
//                     "valueString": userAddr
//                 },
//                 {
//                     "url": "age",
//                     "valueString": formData.age
//                 }
//             ],
//             "generalPractitioner": {
//                 "reference": `Practitioner/${userAddr}`
//             }