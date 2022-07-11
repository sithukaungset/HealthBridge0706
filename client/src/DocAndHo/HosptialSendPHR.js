import { Form, Button } from "react-bootstrap";
import { useState, useRef } from 'react';
import axios from 'axios';
import crypto from 'crypto-js';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function HospitalSendPHR() {
    const BASE_URL = "http://203.247.240.226:8080/fhir"
    const BLOCK_CHAIN_URL = "http://203.247.240.226:22650/api"
    const [formData, setFormData] = useState({
        pid: "",
        assigner: "",
        name: "",
        age: 0,
        telecome: {
            myPhone: "",
        },
        gender: "",
        birthdate: "",
        address: "",
        contact: {
            name: "",
            phone: "",
            relationship: "",
            address: "",
            gender: "",
        },
        symptom: "",
        comment: "",
        doctorName: "",
        createdAt: ""
    });

    const toastId  = useRef();
    const sendPHR = async () => {
        axios.put(`${BASE_URL}/Patient/${formData.pid}`, {
           "resourceType": "Patient",
           "id": formData.pid,
           "text": {
               "status": "generated",
               "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><table class=\"hapiPropertyTable\"><tbody/></table></div>"
           },
           "identifier": [
               {
                   "use": "usual",
                   "assigner": {
                       "display": formData.assigner,
                   }
               }
           ],
           "name": [
               {
                   "text": formData.name
               }
           ],
           "age": formData.age,
           "address" : [
               {
                   "use": "home",
                   "text": formData.address
               }
           ],
           "telecom": [
               {
                   "system": "phone",
                   "value": formData.telecome.myPhone,
                   "use": "mobile"
               }
           ],
           "gender": formData.gender,
           "contact": [
               {
                   "relationship":[
                       {
                           "text":formData.contact.relationship
                       }
                   ],
                   "name": {
                       "text": formData.contact.name
                   },
                   "gender": formData.contact.gender,
                   "telecom": [
                       {
                           "system": "phone",
                           "value": formData.contact.phone,
                           "use": "mobile"
                       }
                   ],
                   "address": [
                       {
                           "use":"home",
                           "text": formData.contact.address
                       }
                   ]
               }
           ],
           "extension" : [
               {
                   "url": "symptom",
                   "valueString": formData.symptom
               },
               {
                   "url": "comment",
                   "valueString": formData.comment
               },
               {
                   "url": "doctor",
                   "valueString": formData.doctorName
               },
               {
                   "url": "assigner",
                   "valueString": formData.assigner
               },
               {
                   "url": "age",
                   "valueString": formData.age
               },
               {
                   "url": "createdAt",
                   "valueString": formData.createdAt
               }
           ],
           "generalPractitioner": {
               "reference": `Practitioner/${formData.doctorName}`
           },
           "managingOrganization":{
               "reference": `Organization/${formData.assigner}`
           }
        }).then((res) => {
           console.log("from server: ", res);
           postCondition(res);
       })
    }


    // const postCondition = async (prevResult) => {

    //     if(prevResult !== undefined) {

    //         await axios.put(`${BASE_URL}/Condition/${formData.pid}`, {
    //             "resourceType": "Condition",
    //             "id": formData.pid,
    //             "extension": [
    //                 {
    //                     "url": "doctor",
    //                     "valueString": formData.doctorName
    //                 },
    //                 {
    //                     "url": "assigner",
    //                     "valueString": formData.assigner
    //                 },
    //                 {
    //                     "url": "createdAt",
    //                     "valueString": formData.createdAt
    //                 }
    //             ],
    //             "clinicalStatus": {
    //                 "coding": [
    //                 {
    //                     "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
    //                     "code": "active"
    //                 }
    //              ]
    //             },
    //             "verificationStatus": {
    //                 "coding": [
    //                 {
    //                     "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
    //                     "code": "confirmed"
    //                 }
    //              ]
    //             },
    //             "category": [
    //                 {
    //                 "coding": [
    //                     {
    //                         "system": "http://terminology.hl7.org/CodeSystem/condition-category",
    //                         "code": "encounter-diagnosis",
    //                         "display": "Encounter Diagnosis"
    //                     }
    //                  ]
    //                 }
    //             ],
    //             "code": {
    //                 "text": formData.symptom
    //             },
    //             "subject": {
    //                 "reference": `Patient/${formData.pid}`
    //             }
    //         }).then((res) => {
    //             console.log(res);
    //         })
    //     }
    // }

    const postCondition = async (prevResult) => {
        if(prevResult !== undefined) {
            await axios.put(`${BASE_URL}/Condition/${formData.pid}`, {
                "resourceType": "Condition",
                "id": formData.pid,
                "text": {
                    "status": "generated",
                    "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><p><b>Generated Narrative with Details</b></p><p><b>id</b>: f201</p><p><b>identifier</b>: 12345</p><p><b>clinicalStatus</b>: Resolved <span>(Details : {http://terminology.hl7.org/CodeSystem/condition-clinical code 'resolved' = 'Resolved)</span></p><p><b>verificationStatus</b>: Confirmed <span>(Details : {http://terminology.hl7.org/CodeSystem/condition-ver-status code 'confirmed' = 'Confirmed)</span></p><p><b>category</b>: Problem <span>(Details : {SNOMED CT code '55607006' = 'Problem', given as 'Problem'}; {http://terminology.hl7.org/CodeSystem/condition-category code 'problem-list-item' = 'Problem List Item)</span></p><p><b>severity</b>: Mild <span>(Details : {SNOMED CT code '255604002' = 'Mild', given as 'Mild'})</span></p><p><b>code</b>: Fever <span>(Details : {SNOMED CT code '386661006' = 'Fever', given as 'Fever'})</span></p><p><b>bodySite</b>: Entire body as a whole <span>(Details : {SNOMED CT code '38266002' = 'Body as a whole', given as 'Entire body as a whole'})</span></p><p><b>subject</b>: <a>Roel</a></p><p><b>encounter</b>: <a>Encounter/f201</a></p><p><b>onset</b>: 02/04/2013</p><p><b>abatement</b>: around April 9, 2013</p><p><b>recordedDate</b>: 04/04/2013</p><p><b>recorder</b>: <a>Practitioner/f201</a></p><p><b>asserter</b>: <a>Practitioner/f201</a></p><h3>Evidences</h3><table><tr><td>-</td><td><b>Code</b></td><td><b>Detail</b></td></tr><tr><td>*</td><td>degrees C <span>(Details : {SNOMED CT code '258710007' = 'degrees C', given as 'degrees C'})</span></td><td><a>Temperature</a></td></tr></table></div>"
                },
                "identifier": [
                    {
                        "value": "12345"
                    }
                ],
                "clinicalStatus": {
                    "coding": [
                        {
                            "system": "http://terminology.hl7.org/CodeSystem/condition-clinical",
                            "code": "resolved"
                        }
                    ]
                },
                "verificationStatus": {
                    "coding": [
                        {
                            "system": "http://terminology.hl7.org/CodeSystem/condition-ver-status",
                            "code": "confirmed"
                        }
                    ]
                },
                "category": [
                    {
                        "coding": [
                            {
                                "system": "http://snomed.info/sct",
                                "code": "55607006",
                                "display": "Problem"
                            },
                            {
                                "system": "http://terminology.hl7.org/CodeSystem/condition-category",
                                "code": "problem-list-item"
                            }
                        ]
                    }
                ],
                "severity": {
                    "coding": [
                        {
                            "system": "http://snomed.info/sct",
                            "code": "255604002",
                            "display": "Mild"
                        }
                    ]
                },
                "code": {
                    "coding": [
                        {
                            "system": "http://snomed.info/sct",
                            "code": "386661006",
                            "display": "Fever"
                        }
                    ]
                },
                "bodySite": [
                    {
                        "coding": [
                            {
                                "system": "http://snomed.info/sct",
                                "code": "38266002",
                                "display": "Entire body as a whole"
                            }
                        ]
                    }
                ],
                "subject": {
                    "reference": `Patient/${formData.pid}`,
                    "display": formData.name
                },
                // "encounter": {
                //     "reference": "Encounter/f201"
                // },
                "onsetDateTime": "2013-04-02",
                "abatementString": "around April 9, 2013",
                "recordedDate": "2013-04-04",
                "recorder": {
                    "reference": `Practitioner/${formData.doctorName}`
                },
                "asserter": {
                    "reference": `Practitioner/${formData.doctorName}`
                },
                "evidence": [
                    {
                        "code": [
                            {
                                "coding": [
                                    {
                                    "system": "http://snomed.info/sct",
                                    "code": "258710007",
                                    "display": "degrees C"
                                    }
                                ]
                            }
                        ]
                    // "detail": [
                    //     {
                    //     "reference": "Observation/f202",
                    //     "display": "Temperature"
                    //     }
                    // ]
                    }
                ]
            }).then((res) => {
                console.log(res);
            })
        }
    }

    const phrHash = (pid) => {
        const PHRhash = crypto.SHA256(pid, 'INLab').toString();
        return PHRhash
    }

    const postOnChain = async () => {
        const PHRhash = phrHash(formData.pid);
        console.log(formData);
        await axios.post(`${BLOCK_CHAIN_URL}/create`, {
                "EHRNumber" : formData.pid,
                "AccountID": formData.pid,
                "DateTime": formData.createdAt,
                "Organization": formData.assigner,
                "patientName": formData.name,
                "Function": "Create",
                "data": "Patient EHR",
                "PHRHash": PHRhash,
                "checkingBalance":10000000,
                "phonenumber" : formData.telecome.myPhone
     
        }).then(console.log);
    }

    const telChangeHandler = (e) => {
        setFormData({
            ...formData,
            telecome: {
                ...formData.telecome,
                [e.target.name]: e.target.value,
            }
        })
    }

    const conChangeHandler = (e) => {
        setFormData({
            ...formData,
            contact: {
                ...formData.contact,
                [e.target.name]: e.target.value,
            }
        })
    }

    const changeHandler = (e) => {
        const date = new Date().toLocaleString();
        setFormData({
            ...formData,
            createdAt: date,
            [e.target.name]: e.target.value,
        })
        console.log(formData);
    }

    const resetForm = () => {
        setFormData({
            pid: "",
            assigner: "",
            name: "",
            age: 0,
            telecome: {
                myPhone: "",
            },
            gender: "",
            birthdate: "",
            address: "",
            contact: {
                name: "",
                phone: "",
                relationship: "",
                address: "",
                gender: "",
            },
            symptom: "",
            comment: "",
            doctorName: "",
            createdAt: ""
        })
    }

    const onClickSendHandler = async() => {
        toastId.current = toast("Wait.. Sending PHR", {autoClose: false});
        await sendPHR()
        await postOnChain().then(() => {
            toast.update(toastId.current, { render: 'Sending success', type: toast.TYPE.SUCCESS, position: toast.POSITION.TOP_RIGHT, autoClose: 5000});
            resetForm();
        })

    }

    return (
        <div className="hospital_send_phr">
            <ToastContainer />
            <Form>
                <div className="phr_top">
                    <div className="phr_top_left">
                        <div className="col_1">
                            <Form.Group className="mb-3" controlId="pid">
                                <Form.Label>PID</Form.Label>
                                <Form.Control type="text" placeholder="Enter PID" name="pid" value={formData.pid}
                                onChange={changeHandler}/>
                            </Form.Group>
                        </div>
                        <div className="col_2">
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" name="name" value={formData.name}
                                onChange={changeHandler}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="age">
                                <Form.Label>Age</Form.Label>
                                <Form.Control type="number" placeholder="Enter age" name="age" value={formData.age}
                                onChange={changeHandler}/>
                            </Form.Group>
                            <Form.Group controlId="formGridState">
                                <Form.Label>Gender</Form.Label>
                                <Form.Select name="gender" value={formData.gender}
                                onChange={changeHandler}>
                                    <option>male</option>
                                    <option>female</option>
                                </Form.Select>
                            </Form.Group>          
                        </div>
                        <div className="col_3">
                            <Form.Group className="mb-3" controlId="phone">
                                <Form.Label>Mobile phone</Form.Label>
                                <Form.Control type="text" placeholder="Enter your phone number" name="myPhone" value={formData.telecome.myPhone}
                                onChange={telChangeHandler}/>
                            </Form.Group>
                        </div>
                        <div className="col_4">
                            <Form.Group className="mb-3" controlId="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" placeholder="Enter your home address" name="address" value={formData.address}
                                onChange={changeHandler}/>
                            </Form.Group>
                        </div>
                    </div>
                    <div className="phr_top_right">
                        <div className="col_1">
                            <Form.Group className="mb-3" controlId="relationship">
                                <Form.Label>Relationship</Form.Label>
                                <Form.Control type="text" placeholder="Relationship with patient"
                                name="relationship" value={formData.contact.relationship}
                                onChange={conChangeHandler}/>
                            </Form.Group>
                        </div>
                        <div className="col_2">
                            <Form.Group className="mb-3" controlId="contact_name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" name="name" value={formData.contact.name} onChange={conChangeHandler}/>
                            </Form.Group>
                            <Form.Group controlId="formGridState">
                                <Form.Label>Gender</Form.Label>
                                <Form.Select name="gender" value={formData.contact.gender}
                                onChange={conChangeHandler}>
                                    <option>male</option>
                                    <option>female</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div className="col_3">
                            <Form.Group className="mb-3" controlId="contact_phone">
                                <Form.Label>Mobile phone</Form.Label>
                                <Form.Control type="text" placeholder="Enter contact phone number" name="phone" value={formData.contact.phone} onChange={conChangeHandler}/>
                            </Form.Group>
                        </div>
                        <div className="col_4">
                            <Form.Group className="mb-3" controlId="contact_address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" placeholder="Enter contact address" name="address" value={formData.contact.address} onChange={conChangeHandler}/>
                            </Form.Group>
                        </div>
                    </div>
                </div>
                <div className="phr_bottom">
                    <div className="col_1">
                        <Form.Group className="mb-3" controlId="symptom">
                            <Form.Label>Symptom</Form.Label>
                            <Form.Control type="text" placeholder="Enter contact address" name="symptom" value={formData.symptom}
                            onChange={changeHandler}/>
                        </Form.Group>
                    </div>
                    <div className="col_2">
                        <Form.Group className="mb-3" controlId="comment">
                            <Form.Label>Adding comment</Form.Label>
                            <Form.Control as="textarea" rows={2} name="comment" value={formData.comment}
                            onChange={changeHandler}/>
                        </Form.Group>
                    </div>
                    <div className="col_3">
                        <Form.Group className="mb-3" controlId="assginer">
                            <Form.Label>Assigner</Form.Label>
                            <Form.Control type="text" placeholder="Enter assigner" name="assigner" value={formData.assigner}
                            onChange={changeHandler}/>
                         </Form.Group>
                        <Form.Group className="mb-3" controlId="doctor">
                            <Form.Label>Doctor name</Form.Label>
                            <Form.Control type="text" placeholder="Enter doctor name" name="doctorName" value={formData.doctorName}
                            onChange={changeHandler}/>
                        </Form.Group>
                        <Button className="btn_phr_send" variant="success" onClick={onClickSendHandler}>Send</Button>
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default HospitalSendPHR;