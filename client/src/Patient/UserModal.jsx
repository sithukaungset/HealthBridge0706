import React,{ useState, useEffect} from 'react';
import axios from 'axios'
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../css/HeaderModal.css"

const UserModal = (props) => {

  const [users, setUsers] = useState([]);

  async function getUsers() { 
    let temp = [];
    await axios.get(`http://203.247.240.226:22650/api/query/EHR1206`).then((res) => {
      console.log(res);
      temp.push(res.data);
      setUsers(temp);
    });
  }

  const { open } = props;

  useEffect(() => {
    getUsers();
    
  },[])

  return (
    <div className={open ? 'openbackground' : 'background' }>
    
    <div style={{textalign:"center"}}className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section style={{margin:"auto"}}>
        <br></br>
        <br></br>
        <a style={{fontSize:"20px",marginLeft:"140px"}}>Name: {users[0].patientName} </a>
        <br></br>
        <a style={{fontSize:"20px",marginLeft:"70px"}}>Phone number: {users[0].phonenumber} </a>
        <br></br>
        <a style={{fontSize:"22px",marginLeft:"30px"}}>
         AccountBalance: {users[0].checkingBalance} HBT
        </a>
        <br></br>
        <br></br>
        
        <a style={{marginLeft:"50px"}} className='my_btn'>charge</a>

        <a className='my_btn'>exchange</a>
        </section>
      ) : null}
    </div>
    </div>
  );
};

export default UserModal;