import React, { useState} from 'react';
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NotificationModal from './NotificationModal';
import UserModal from './UserModal';
import { useParams } from 'react-router-dom';
import DoctorNotification from '../DocAndHo/DoctorNotification';
import axios from 'axios'

import '../css/HeaderModal.css';

function Header() {
  const {id} = useParams();
  const [NotificationmodalOpen, setNotificationModalOpen] = useState(false);
  const [UsermodalOpen, setUserModalOpen] = useState(false);

  const [users, setUsers] = useState([]);

  async function getUsers() { 
    let temp = [];
    await axios.get(`http://203.247.240.226:22650/api/query/${id}`).then((res) => {
      console.log(res);
      temp.push(res.data);
      setUsers(temp);
      setUserModalOpen(true);

    });
  }

  const openNotificationModal = () => {
    setNotificationModalOpen(true);
  };

  const closeNotificationModal = () => {
    setNotificationModalOpen(false);
  };

  const closeUserModal = () => {
    setUserModalOpen(false);
  };

  return (
    <>
    <UserModal open={UsermodalOpen} users={users} close={closeUserModal} header="Modal heading"></UserModal>
    {id == "jhikyuinn" || id == "EHR1206" ? <NotificationModal open={NotificationmodalOpen} id={id} close={closeNotificationModal} header="Modal heading"></NotificationModal> : <></>}
    {id == "James" ? <DoctorNotification open={NotificationmodalOpen} close={closeNotificationModal} header="Modal heading" /> : <></>}    

    <nav  className="navbar">
        <div className="navbar-header">
            <a className="navbar-brand" href="/">HEALTH BRIDGE </a>
            
            {id!=null?(<> <a className="User"  href="#!" onClick={() => getUsers()}>ID: {id}</a>  <FontAwesomeIcon onClick={openNotificationModal} className="bellicon" icon={faBell}/> </> ):<></>}
        </div>
    </nav>
    </>
  )
}

 

 

export default Header;