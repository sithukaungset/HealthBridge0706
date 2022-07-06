import axios from 'axios';
import React,{useState}  from 'react';
import { useNavigate } from 'react-router';

import "../css/HeaderModal.css"

const NotificationModal = (props) => {
  const navigate=new useNavigate();
  const { open } = props;

  async function getInformation(){
    await axios.get(`http://203.247.240.226:8080/fhir/Patient/HB1206`).then((res) => {
      console.log(res.data);
      navigate('/information',{state:
        {exchangerecordview:res.data},
      });
    })
  }

  return (
    <div className={open ? 'openbackground' : 'background' }>
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <main>James asked for information.<button className="my_info" onClick={() => getInformation()}>details</button></main>
          <main>Alice asked for information.<button className="my_info" onClick={() => getInformation()}>details</button></main>
        </section>
      ) : null}
    </div>
    </div>
  );
};

export default NotificationModal; 

