import Header from '../Patient/Header';
import WearableMenubar from './WearableMenubar.js';
import WearableMenubar_nav from './WearableMenubar_nav';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import "../css/PatientRecord.css"


function Wearabledevice() {
    const location = useLocation();
    const email = location.state;
    const [state, setState] = useState(0);

    return (
        <div className="hospital">
            <Header email={email}/>
            <div className='hospital_main'>
                <div className='hospital_content'>
                    <WearableMenubar setState={setState}/>
                    <div style={{marginTop:"10px"}} className='right_content' >
                        <WearableMenubar_nav state={state} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Wearabledevice;