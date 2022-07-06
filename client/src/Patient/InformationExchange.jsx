import axios from 'axios';
import { Form, Button } from "react-bootstrap";
import React,{useState} from 'react'
import { useLocation } from 'react-router-dom';
import Header from './Header'
import useCollapse from 'react-collapsed';
import "../css/InformationExchange.css";
import { useEffect } from 'react';
import Recordview from './Recordview';

const getFormattedPrice = (price) => `${price.toFixed(2)}`;

function Section(props) {
  const config = {
      defaultExpanded: props.defaultExpanded || false,
      collapsedHeight: props.collapsedHeight || 0
  };
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);
return (
  <div className="collapsible">
      <div className="header" {...getToggleProps()}>
          <div className="title">{props.title+(isExpanded ? ' 👇🏻 ' : ' 👉🏻 ')}</div>
          
      </div>
      <div {...getCollapseProps()}>
          <div className="content">
              {props.children}
          </div>
      </div>
  </div>
  );
}



const InformationExchange = () => {

  const toppings = [
    {
      name: "Name",
      price: 0.02
    },
    {
      name: "Age",
      price: 0.02
    },
    {
      name: "Gender",
      price: 0.02
    },
    {
      name: "Mobile phone",
      price: 0.03
    },
    {
      name: "Address",
      price: 0.05
    },
    {
      name: "Symptom",
      price: 0.0
    },
    {
      name: "Adding comment",
      price: 0.5
    },
    {
        name: "Assigner",
        price: 0.5
      },
      {
        name: "Doctor name",
        price: 0.5
      }
  ];
  
const [checkedState, setCheckedState] = useState(
    new Array(toppings.length).fill(false)
);

const [total, setTotal] = useState(0);

const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
    index === position ? !item : item
  );

  setCheckedState(updatedCheckedState);

  const totalPrice = updatedCheckedState.reduce(
    (sum, currentState, index) => {
      if (currentState === true) {
        return sum + toppings[index].price;
      }
      return sum;
    },
    0
    );

  setTotal(totalPrice);
  };

  async function Exchangeresponse(){
    await axios.put(`http://203.247.240.226:22650/api/responsePHR`,{
      "EHRNumber":"EHR1206",
      "doctor":"James",
      "token":1.64,
      "responsedata":"whole PHR"
    }).then((res) => {
      window.alert("Success");
  })
}
  
  const location = useLocation();
  const {exchangerecordview} =location.state;
  
return (
  <>
  <Header/>
  <div className="structure">
        <div className="UserRequestData">
          <br></br>
          <h3>Required Data by Doctor James </h3>
          <br></br>
          <br></br>
          <ul className="toppings-list">
            {toppings.map(({ name, price }, index) => {
              return (
                <li key={index}>
                  <div className="toppings-list-item">
                    <div className="left-section">
                      <input
                        type="checkbox"
                        id={`custom-checkbox-${index}`}
                        name={name}
                        value={name}
                        checked={checkedState[index]}
                        onChange={() => handleOnChange(index)}
                      />
                      <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                    </div>
                    <div className="right-section">{getFormattedPrice(price)}</div>
                  </div>
                </li>
              );
            })}
            <br></br>
            <li><div className="right-section">Total HBT(HealthBridge Token): {getFormattedPrice(total)}</div></li>
            <br></br>
            <a className='my_btn' onClick={() => Exchangeresponse()} >response</a>
          </ul>
        </div>

        <div className="UserResendData" >
          <br></br>
          <h3>Data Details</h3>
          <br></br>
          <Form style={{width:"90%",height:"20vh",margin:"auto"}}>
                <div className="phr_top">
                    <div className="phr_top_left">
                        <div className="col_1">
                            <Form.Group className="mb-3" controlId="pid">
                                <Form.Label>PID</Form.Label>
                                <Form.Control style={{backgroundColor:"white"}} readOnly="readonly" type="text"  name="pid" value={exchangerecordview.id}/>
                            </Form.Group>
                        </div>
                        <div className="col_2">
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control style={{backgroundColor:"white"}} readOnly="readonly" type="text" name="name" value={exchangerecordview.name[0].text}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="age">
                                <Form.Label>Age</Form.Label>
                                <Form.Control style={{backgroundColor:"white"}} readOnly="readonly" type="text"  name="age" value={exchangerecordview.extension[4].valueString}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="gender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Control style={{backgroundColor:"white"}} readOnly="readonly" type="text"  name="gender" value={exchangerecordview.gender}/>
                            </Form.Group>           
                        </div>
                    </div>
                    <div className="phr_top_right">
                    <div className="col_3">
                            <Form.Group className="mb-3" controlId="phone">
                                <Form.Label>Mobile phone</Form.Label>
                                <Form.Control style={{backgroundColor:"white"}} readOnly="readonly" type="text" name="myPhone" value={exchangerecordview.telecom[0].value}/>
                            </Form.Group>
                        </div>
                        <div className="col_4">
                            <Form.Group className="mb-3" controlId="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control style={{backgroundColor:"white"}} readOnly="readonly" type="text" name="address" value={exchangerecordview.address[0].text}/>
                            </Form.Group>
                        </div>
                    </div>
                </div>
                <div className="phr_bottom">
                    <div className="col_1">
                        <Form.Group className="mb-3" controlId="symptom">
                            <Form.Label>Symptom</Form.Label>
                            <Form.Control style={{backgroundColor:"white"}} readOnly="readonly" type="text" placeholder="Enter contact address" name="symptom" value={exchangerecordview.extension[0].valueString} />
                        </Form.Group>
                    </div>
                    <div className="col_2">
                        <Form.Group className="mb-3" controlId="comment">
                            <Form.Label>Adding comment</Form.Label>
                            <Form.Control style={{backgroundColor:"white"}} readOnly="readonly" as="textarea" rows={2} name="comment" value={exchangerecordview.extension[1].valueString}/>
                        </Form.Group>
                    </div>
                    <div className="col_3">
                        <Form.Group className="mb-3" controlId="assginer">
                            <Form.Label>Assigner</Form.Label>
                            <Form.Control  style={{backgroundColor:"white"}} readOnly="readonly" type="text" placeholder="Enter assigner" name="assigner" value={exchangerecordview.extension[3].valueString} />
                         </Form.Group>
                        <Form.Group className="mb-3" controlId="doctor">
                            <Form.Label>Doctor name</Form.Label>
                            <Form.Control style={{backgroundColor:"white"}} readOnly="readonly" type="text" placeholder="Enter doctor name" name="doctorName" value={exchangerecordview.extension[2].valueString}/>
                        </Form.Group>
                    </div>
                </div>
          </Form>
          <br></br>
          
        </div>
      </div>
      </>
);
}


export default InformationExchange;
