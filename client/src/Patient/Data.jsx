import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SigninModal from "./SigninModal";
import '../App.css';

function Data() {
  const [signinModalOn, setSigninModalOn] = useState(false);

  return (
    <>
    <SigninModal
    show={signinModalOn}
    onHide={() => setSigninModalOn(false)}
    />
    
    
    <div className="content">
      <h1 className="data" >Check your health<br/> on mobile</h1>
      <h5 className="data_down" style={{marginTop:"70px"}}> 100% full control over your health data</h5>
      <h5 className="data_down"> Fast and Reliable Patient data</h5>
      <h5 className="data_down"> Efficient way for storing PHR</h5>
      <h3 className="data_cont">Continue as</h3>
      <br></br>
      <table>
        <thead>
        <tr style={{ width: 'auto' }}>
          <td><a href="#!" style={{marginLeft:"30px"}} onClick={() => setSigninModalOn(true)} className="my_btn">PHR owner</a></td>
          <td><a href="#!" onClick={() => setSigninModalOn(true)} className="my_btn">PHR researcher</a></td>
          <td><a href="#!" onClick={() => setSigninModalOn(true)} className="my_btn">PHR recorder</a></td>
        </tr>
        </thead>
      </table>

    </div>
    </>
  )
}

export default Data;
