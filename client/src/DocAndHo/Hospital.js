import SideMenu from './SideMenu';
import KyuHeader from '../Patient/Header';
import HospitalRight from './HospitalRight';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
function Hospital() {
    const location = useLocation();
    const [state, setState] = useState(0);

    return (
        <div className="hospital">
            <ToastContainer />
            <KyuHeader />
            <div className='hospital_main'>
                <div className='hospital_content'>
                    <SideMenu setState={setState}/>
                    <div className='right_content' >
                        <HospitalRight state={state} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hospital;
