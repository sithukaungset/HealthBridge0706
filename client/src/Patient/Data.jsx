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
      <h1 className="data" >Blockchain-Based<br/> Intelligent Healthcare<br/> Service</h1> 
      <h5 className="data_down" style={{marginTop:"70px"}}> 100% full control over your health data</h5>
      <h5 className="data_down"> Fast and Reliable Patient-Centric PHR Management</h5>
      <h5 className="data_down"> Efficient and Trustworthy PHR storage</h5>
      <h3 className="data_cont">Continue as</h3>
      <br></br>
      <table>
        <thead>
        <tr style={{ width: 'auto' }}>
          <td><a href="#!" style={{marginLeft:"30px"}} onClick={() => setSigninModalOn(true)} className="my_btn">PHR Owner</a></td>
          <td><a href="#!" onClick={() => setSigninModalOn(true)} className="my_btn">PHR User</a></td>
          <td><a href="#!" onClick={() => setSigninModalOn(true)} className="my_btn">PHR Sources</a></td>
        </tr>
        </thead>
      </table>

    </div>
    </>
  )
}

export default Data;
