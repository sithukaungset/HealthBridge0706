import React, { useState} from 'react';

import { faBell } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NotificationModal from './NotificationModal';

import UserModal from './UserModal';

 

import { Nav, Container, Navbar, Dropdown } from 'react-bootstrap';

import { useParams } from 'react-router-dom';

 

import DoctorNotification from '../DocAndHo/DoctorNotification';

 

import '../css/HeaderModal.css';

 

 

function Header() {

  const {id} = useParams();

 

  const [NotificationmodalOpen, setNotificationModalOpen] = useState(false);

  const [UsermodalOpen, setUserModalOpen] = useState(false);

 

  const openNotificationModal = () => {

    setNotificationModalOpen(true);

    console.log("open opne");

  };

  const closeNotificationModal = () => {

    setNotificationModalOpen(false);

  };

 

  const openUserModal = () => {

    setUserModalOpen(true);

  };

  const closeUserModal = () => {

    setUserModalOpen(false);

  };

  

  return (

    <>

    <UserModal open={UsermodalOpen} close={closeUserModal} header="Modal heading"></UserModal>

    {id == "jhikyuinn" ? <NotificationModal open={NotificationmodalOpen} close={closeNotificationModal} header="Modal heading"></NotificationModal> : <></>}

    {id == "James" ? <DoctorNotification open={NotificationmodalOpen} close={closeNotificationModal} header="Modal heading" /> : <></>}

    

    <nav style={{backgroundColor:"rgb(134, 193, 217)"}} className="navbar">

         <div className="navbar-header">

            <a className="navbar-brand" href="/">HEALTH BRIDGE </a>

            {id=="jhikyuinn"?(<a className="User"  href="#!" onClick={openUserModal}>ID: jhikyuinn</a>):<></>}

            {id=="James"?(<a className="User"  href="#!" onClick={openUserModal}>ID: James</a>):<></>}

            {id!=null?(<FontAwesomeIcon onClick={openNotificationModal} className="bellicon" icon={faBell}/>):<></>}

 

            

            

        </div>

    </nav>

    </>

  )

}

 

 

export default Header;

