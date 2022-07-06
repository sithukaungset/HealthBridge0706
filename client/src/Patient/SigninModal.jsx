import React , { useState } from "react";
import { useNavigate } from 'react-router';
import { Modal, Form } from "react-bootstrap";
import SignupModal from "./SignupModal";
import axios from 'axios';


const SigninModal = ({ show, onHide }) => {
  const [signupModalOn, setSignupModalOn] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",

});

const BASE_URL = "http://203.247.240.226:22650/api"
const SignupBlock = async () => {

  await axios.post(`${BASE_URL}/createAcc`, {
    "AccountID": "jhikyuinn",
    "PersonName": "jhikyuinn", 
    "CryptoBalance": 10000000,
}).then(console.log);
}


const SignupHospital = async () => {

  await axios.post(`${BASE_URL}/createAcc`, {
    "AccountID": "INLab",
    "PersonName": "INLab-Medical", 
    "CryptoBalance": 10000000,
}).then(console.log);
}

const SignupDoctor = async () => {

  await axios.post(`${BASE_URL}/createAcc`, {
    "AccountID": "James",
    "PersonName": "James", 
    "CryptoBalance": 10000000,
}).then(console.log);
}

const onChangeHandler = (e) => {
    setUser({
        ...user,
        [e.target.name]: e.target.value,
    })
}
const onClickBtn = async() => {
    if(user.email ==="jhikyuinn") {
    await SignupBlock();
    navigate(`/patient/${user.email}`, {id: user.email});
    
    
}
    else if(user.email === "James") {
      await SignupDoctor();  
      navigate(`/doctor/${user.email}`, {id: user.email})
        
    }
    else if(user.email === "INLab") {
      await SignupHospital();
      navigate(`/hospital/${user.email}`, {id: user.email});
      
  }
    else if(user.email !== undefined) {
      navigate(`/hospital/${user.email}`, {id: user.email});
  }
}
  return (
    <>
    <SignupModal
    show={signupModalOn}
    onHide={() => setSignupModalOn(false)}
    />
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" value={user.email} onChange={onChangeHandler} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" value={user.password} onChange={onChangeHandler} />
            </Form.Group>
            <br></br>

            <a onClick={onClickBtn}className="my_btn">
              Login
            </a>

            <a onClick={() => setSignupModalOn(true)} className="my_btn">
              Signup
            </a>
            
          </Form>
        </Modal.Body>
    </Modal>

    </>

  );
};

export default SigninModal;