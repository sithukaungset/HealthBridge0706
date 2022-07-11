import { Form, Button } from "react-bootstrap";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Header from "./Header";

import "../css/PatientRecord.css"

function Recordview() {
    const BASE_URL = "http://203.247.240.226:8080/fhir"
    const [condition, setCondition] = useState();

    const location = useLocation();
    const {recordview} =location.state;

    const getCondition = async () => {
        await axios.get(`${BASE_URL}/Condition/${recordview.id}`).then((res) => {
            console.log(res.data);
            if(res.data.code !== undefined) {
                setCondition(res.data);
            }
        })
    }

    useEffect(() => {
        getCondition();
    }, [])

    return (
        <div>
        <Header></Header>
        <div className="hospital_send_phr">

            <Form>
                <div className="phr_top">
                    <div className="phr_top_left">
                        <div className="col_1">
                            <Form.Group className="mb-3" controlId="pid">
                                <Form.Label>PID</Form.Label>
                                <Form.Control readOnly="readonly" type="text"  name="pid" value={recordview.id}/>
                            </Form.Group>
                        </div>
                        <div className="col_2">
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control readOnly="readonly" type="text" name="name" value={recordview.name[0].text}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="age">
                                <Form.Label>Age</Form.Label>
                                <Form.Control readOnly="readonly" type="text"  name="age" value={recordview.extension[4].valueString}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="gender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Control readOnly="readonly" type="text"  name="gender" value={recordview.gender}/>
                            </Form.Group>           
                        </div>
                        <div className="col_3">
                            <Form.Group className="mb-3" controlId="phone">
                                <Form.Label>Mobile phone</Form.Label>
                                <Form.Control readOnly="readonly" type="text" name="myPhone" value={recordview.telecom[0].value}/>
                            </Form.Group>
                        </div>
                        <div className="col_4">
                            <Form.Group className="mb-3" controlId="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control readOnly="readonly" type="text" name="address" value={recordview.address[0].text}/>
                            </Form.Group>
                        </div>
                    </div>
                    {/* <div className="phr_top_right">
                        <div className="col_1">
                            <Form.Group className="mb-3" controlId="relationship">
                                <Form.Label>Relationship</Form.Label>
                                <Form.Control readOnly="readonly" type="text" name="relationship" value={recordview.contact[0].relationship[0].text}/>
                            </Form.Group>
                        </div>
                        <div className="col_2">
                            <Form.Group className="mb-3" controlId="contact_name1">
                                <Form.Label>Name</Form.Label>
                                <Form.Control readOnly="readonly" type="text" name="name1"value={recordview.contact[0].name.text} />
                            </Form.Group>
                        </div>
                        <div className="col_3">
                            <Form.Group className="mb-3" controlId="contact_phone">
                                <Form.Label>Mobile phone</Form.Label>
                                <Form.Control readOnly="readonly" type="text" placeholder="Enter contact phone number" name="phone" value={recordview.contact[0].telecom[0].value}/>
                            </Form.Group>
                        </div>
                        <div className="col_4">
                            <Form.Group className="mb-3" controlId="contact_address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control readOnly="readonly" type="text" placeholder="Enter contact address" name="address" value={recordview.contact[0].address.text}/>
                            </Form.Group>
                        </div>
                    </div> */}
                    {condition && 
                    <div className="phr_top_right">
                        <div className="title">Condition</div>
                        <div className="col_1">
                            <Form.Group className="mb-3" controlId="relationship">
                                <Form.Label>Symptom</Form.Label>
                                <Form.Control readOnly="readonly" type="text" name="relationship" value={condition.code && condition.code.coding[0].display}/>
                            </Form.Group>
                        </div>
                        <div className="col_2">
                            <Form.Group className="mb-3" controlId="contact_name1">
                                <Form.Label>Discription</Form.Label>
                                <Form.Control readOnly="readonly" as="textarea" rows={2} name="name1" value={condition.bodySite[0].coding[0].display} />
                            </Form.Group>
                        </div>
                    </div>}
                </div>
                <div className="phr_bottom">
                    <div className="col_1">
                        <Form.Group className="mb-3" controlId="symptom">
                            <Form.Label>Symptom</Form.Label>
                            <Form.Control readOnly="readonly" type="text" placeholder="Enter contact address" name="symptom" value={recordview.extension[0].valueString} />
                        </Form.Group>
                    </div>
                    <div className="col_2">
                        <Form.Group className="mb-3" controlId="comment">
                            <Form.Label>Adding comment</Form.Label>
                            <Form.Control readOnly="readonly" as="textarea" rows={2} name="comment" value={recordview.extension[1].valueString}/>
                        </Form.Group>
                    </div>
                    <div className="col_3">
                        <Form.Group className="mb-3" controlId="assginer">
                            <Form.Label>Assigner</Form.Label>
                            <Form.Control  readOnly="readonly" type="text" placeholder="Enter assigner" name="assigner" value={recordview.extension[3].valueString} />
                         </Form.Group>
                        <Form.Group className="mb-3" controlId="doctor">
                            <Form.Label>Doctor name</Form.Label>
                            <Form.Control readOnly="readonly" type="text" placeholder="Enter doctor name" name="doctorName" value={recordview.extension[2].valueString}/>
                        </Form.Group>
                        <a className="my_btn" style={{marginLeft:"60%"}}href="/patient/${name}" >close</a>
                        
                    </div>
                </div>
            </Form>
        </div>
    </div>
    )
}

export default Recordview;