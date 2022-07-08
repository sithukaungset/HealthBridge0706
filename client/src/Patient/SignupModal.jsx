import React,{useState, useRef } from "react";
import { Modal, Form } from "react-bootstrap";
import axios from 'axios';
import { useNavigate } from 'react-router';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignUpModal = ({ show, onHide }) => {
  const navigate=new useNavigate();

  const [usercreate, setUsercreate] = useState({
    AccountID: "",
    PersonName: "",
    CryptoBalance: "",
    phonenumber:"",
});
const toastId  = useRef();

  const BASE_URL = "http://203.247.240.226:22650/api"
  const SignupBlock = async () => {
    await axios.post(`${BASE_URL}/createAcc`, {
     
      "AccountID": usercreate.AccountID,
      "PersonName": usercreate.AccountID,
      "PatientName":usercreate.PersonName,
      "CryptoBalance": 10000000,
      "phonenumber":usercreate.phonenumber
    }).then(console.log);
  }

  const onChangeHandler = (e) => {
    setUsercreate({
        ...usercreate,
        [e.target.name]: e.target.value,
    })
}
const onClickBtn = async() => {
  toastId.current = toast("Wait.. Creating Account !", {autoClose: false});
  await SignupBlock().then(()=>{
    toast.update(toastId.current,{render: 'Thanks for signing up', type: toast.TYPE.SUCCESS, position: toast.POSITION.TOP_RIGHT, autoClose: 5000});
    navigate("/");
  });
}

  return (
    <>
    <ToastContainer />
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            
            <Form.Group>
              <Form.Label>AccoutID</Form.Label>
              <Form.Control name="AccountID" type="text" placeholder="Enter AccountID" value={usercreate.AccountID} onChange={onChangeHandler}/>
              </Form.Group>

            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control name="PersonName" type="email" placeholder="Enter Name" value={usercreate.PersonName} onChange={onChangeHandler}/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control name="phonenumber" type="text" placeholder="Enter Phone" value={usercreate.phonenumber} onChange={onChangeHandler}/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter Password" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" />
            </Form.Group>
            <br></br>
            <a onClick={onClickBtn} className="my_btn">
              Create Account
            </a>
          
            
          </Form>
        </Modal.Body>
    </Modal>
    </>
  );
};

export default SignUpModal;