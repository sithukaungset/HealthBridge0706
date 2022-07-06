import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import KyuHeader from '../Patient/Header';
import SideMenu from './SideMenu';
import DoctorRight from './DoctorRight';
function Doctor() {
    const location = useLocation();
    const [state, setState] = useState();
    const CODE = 1;
    return (
        <div className="dotor_container">
            <ToastContainer />
            <KyuHeader />
            <div className='doctor_main'>
                <div className='doctor_content'>
                    <SideMenu setState={setState} CODE={CODE}/>
                    <div className='right_content'>
                        <DoctorRight state={state} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Doctor;