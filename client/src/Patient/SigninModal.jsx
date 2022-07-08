import React , { useState } from "react";
import { useNavigate } from 'react-router';
import { Modal, Form } from "react-bootstrap";
import SignupModal from "./SignupModal";
import axios from 'axios';


const SigninModal = ({ show, onHide }) => {
  const [signupModalOn, setSignupModalOn] = useState(false);
  const navigate = useNavigate();
  const [userlogin, setUserlogin] = useState({
    email: "",
    password: "",

});

const onChangeHandler = (e) => {
    setUserlogin({
        ...userlogin,
        [e.target.name]: e.target.value,
    })
}
const onClickBtn = async() => {
    if(userlogin.email ==="jhikyuinn") {
      navigate(`/patient/${userlogin.email}`, {id: "jhikyuinn"});
    }
    else if(userlogin.email === "James") {
      navigate(`/doctor/${userlogin.email}`, {id: "James"})
    }
    else if(userlogin.email === "INLab") {
      navigate(`/hospital/${userlogin.email}`, {id: "INLab"});
  }
  else if(userlogin.email === "applewatch") {
    navigate(`/wearable/${userlogin.email}`, {id: "applewatch"});
}
    else if(userlogin.email !== undefined) {
      navigate(`/patient/${userlogin.email}`, {id: userlogin.email});
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
              <Form.Control type="email" placeholder="Enter email" name="email" value={userlogin.email} onChange={onChangeHandler} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" value={userlogin.password} onChange={onChangeHandler} />
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




// import React , { useState, useRef } from "react";
// import { useNavigate } from 'react-router';
// import { Modal, Form } from "react-bootstrap";
// import SignupModal from "./SignupModal";
// import axios from 'axios';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// const SigninModal = ({ show, onHide }) => {
//   const [signupModalOn, setSignupModalOn] = useState(false);
//   const navigate = useNavigate();
//   const [user, setUser] = useState({
//     email: "",
//     password: "",

// });

// const BASE_URL = "http://203.247.240.226:22650/api"

// const toastId  = useRef();

// const SignupBlock = async () => {

//   await axios.post(`${BASE_URL}/createAcc`, {
//     "AccountID": "jhikyuinn",
//     "PersonName": "jhikyuinn",
//     "CryptoBalance": 10000000,
//     "phonenumber": "01093856525"
// }).then((res) => {
//   console.log(res);
// });
// }


// const SignupHospital = async () => {

//   await axios.post(`${BASE_URL}/createAcc`, {
//     "AccountID": "INLab",
//     "PersonName": "INLab-Medical",
//     "CryptoBalance": 10000000,
//     "phonenumber": "01092343433"
// }).then(console.log);
// }

// const SignupDoctor = async () => {

//   await axios.post(`${BASE_URL}/createAcc`, {
//     "AccountID": "James",
//     "PersonName": "James",
//     "CryptoBalance": 10000000,
//     "phonenumber": "010353235464"
// }).then(console.log);
// }

// const onChangeHandler = (e) => {
//     setUser({
//         ...user,
//         [e.target.name]: e.target.value,
//     })
// }
// const onClickBtn = async() => {
 
//     toastId.current = toast("Wait... Trying to sign in", {autoClose: false});

//     if(user.email ==="jhikyuinn") {
//       await SignupBlock().then(() => {
//         toast.update(toastId.current, { render: 'Logged-in!', type: toast.TYPE.SUCCESS, position: toast.POSITION.TOP_RIGHT, autoClose: 3000});
//       })
//       navigate(`/patient/${user.email}`, {id: user.email});
//     }
//     else if(user.email === "James") {
//       await SignupDoctor().then(() => {
//         toast.update(toastId.current, { render: 'Logged-in!', type: toast.TYPE.SUCCESS, position: toast.POSITION.TOP_RIGHT, autoClose: 3000});
//       })  
//       navigate(`/doctor/${user.email}`, {id: user.email})
       
//     }
//     else if(user.email === "INLab") {
//       await SignupHospital().then(() => {
//         toast.update(toastId.current, { render: 'Logged-in!', type: toast.TYPE.SUCCESS, position: toast.POSITION.TOP_RIGHT, autoClose: 3000});
//       })
//       navigate(`/hospital/${user.email}`, {id: user.email});
     
//     }
//     else if(user.email !== undefined) {
//       navigate(`/hospital/${user.email}`, {id: user.email});
//     }
// }
//   return (
//     <>
//     <ToastContainer />
//     <SignupModal
//     show={signupModalOn}
//     onHide={() => setSignupModalOn(false)}
//     />
//     <Modal
//       show={show}
//       onHide={onHide}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//         <Modal.Header closeButton>
//           <Modal.Title id="contained-modal-title-vcenter">Sign In</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group>
//               <Form.Label>Email address</Form.Label>
//               <Form.Control type="email" placeholder="Enter email" name="email" value={user.email} onChange={onChangeHandler} />
//             </Form.Group>

//             <Form.Group>
//               <Form.Label>Password</Form.Label>
//               <Form.Control type="password" placeholder="Password" name="password" value={user.password} onChange={onChangeHandler} />
//             </Form.Group>
//             <br></br>

//             <a onClick={onClickBtn}className="my_btn">
//               Login
//             </a>

//             <a onClick={() => setSignupModalOn(true)} className="my_btn">
//               Signup
//             </a>
           
//           </Form>
//         </Modal.Body>
//     </Modal>

//     </>

//   );
// };

// export default SigninModal;