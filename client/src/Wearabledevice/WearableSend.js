

import { Form, Button } from "react-bootstrap";
import { useState, useRef } from 'react';
import axios from 'axios';
import crypto from 'crypto-js';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function WearableSend() {
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
            currentheartrate:"",
            activity: {
                time:"",
                heartrate:"",
            },
            exercise:{
                time:"",
                heartrate:"",
                type:"",
            },
            sleep:{
                time:"",
            },
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
           "extension" : [
               {
                   "url": " currentheartrate",
                   "valueString": formData.currentheartrate
               },
               {
                   "url": "activitytime",
                   "valueString": formData.activity.time
               },
               {
                   "url": "activityheart",
                   "valueString": formData.activity.heartrate
               },
               {
                   "url": "exercisetime",
                   "valueString": formData.exercise.time
               },
               {
                   "url": "exercisetype",
                   "valueString": formData.exercise.type
               },
               {
                   "url": "createdAt",
                   "valueString": formData.createdAt
               }
           ],
           "managingOrganization":{
               "reference": `Organization/${formData.assigner}`
           }
        }).then((res) => {
           console.log("from server: ", res);

       })
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

    const changeHandler = (e) => {
        const date = new Date().toLocaleString();
        setFormData({
            ...formData,
            createdAt: date,
            [e.target.name]: e.target.value,
        })
        console.log(formData);
    }

    const actchangeHandler = (e) => {
        setFormData({
            ...formData,
            activity: {
                ...formData.activity,
                [e.target.name]: e.target.value,
            }
        })
    }

    const exechangeHandler = (e) => {
        setFormData({
            ...formData,
            exercise: {
                ...formData.exercise,
                [e.target.name]: e.target.value,
            }
        })
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
            currentheartrate:"",
            activity: {
                time:"",
                heartrate:"",
            },
            exercise:{
                time:"",
                heartrate:"",
                type:"",
            },
            sleep:{
                time:"",
            },
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
                        <div className="col_2">
                            <Form.Group className="mb-3" controlId="sleep">
                                <Form.Label>Sleep time</Form.Label>
                                <Form.Control type="text" placeholder="Enter Sleep time" name="sleep" value={formData.sleep.time}
                                onChange={changeHandler}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="currentheartrate">
                                <Form.Label>Current heart rate</Form.Label>
                                <Form.Control type="text" placeholder="Enter heart rate" name="currentheartrate" value={formData.currentheartrate}
                                onChange={changeHandler}/>
                            </Form.Group>
                        </div>
                        <div className="col_2">
                        <Form.Group className="mb-3" controlId="activitytime">
                                <Form.Label>Total activity time</Form.Label>
                                <Form.Control type="text" placeholder="" name="activitytime" defaultValue={formData.activity.time}
                                onChange={actchangeHandler}/> 
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="activityheart">
                                <Form.Label>The average heart rate of activity</Form.Label>
                                <Form.Control type="text" placeholder="" name="activityheart" defaultValue={formData.activity.heartrate}
                                onChange={actchangeHandler}/>
                            </Form.Group> 
                        </div>
                        
                        <div className="col_2">
                            <Form.Group className="mb-3" controlId="exercisetime">
                                <Form.Label>Total exercise time</Form.Label>
                                <Form.Control type="text" placeholder="" name="exercisetime" defaultValue={formData.exercise.time}
                                onChange={exechangeHandler}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exerciseheart">
                                <Form.Label>The average heart rate of exercise</Form.Label>
                                <Form.Control type="text" placeholder="" name="exerciseheart" defaultValue={formData.exercise.heartrate}
                                onChange={exechangeHandler}/>
                            </Form.Group> 
                        </div>
                        <div className="col_1">
                            <Form.Group className="mb-3" controlId="excercisetype">
                                <Form.Label>Types of Exercise</Form.Label>
                                <Form.Control type="text" placeholder="" name="excercisetype" defaultValue={formData.exercise.type}
                                onChange={exechangeHandler}/>
                            </Form.Group> 
                        </div>
                    
                        
                    </div>
                </div>
                <div className="phr_bottom">
                    
                    <div className="col_3">
                        <Form.Group className="mb-3" controlId="assginer">
                            <Form.Label>Assigner</Form.Label>
                            <Form.Control type="text" placeholder="Enter assigner" name="assigner" value={formData.assigner}
                            onChange={changeHandler}/>
                         </Form.Group>
                        
                        <a style={{margin:"auto"}} className="my_btn" variant="success" onClick={onClickSendHandler}>Send</a>
                    </div>
                </div>
            </Form>
        </div>
    )
}

export default WearableSend;