import Header from './Header';
import Menubar from './MenuBar';
import Menubar_nav from './Menubar_nav';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import "../css/PatientRecord.css"


function Patient() {
    const {id} = useParams();
    console.log({id});
    
    const [state, setState] = useState(0);

    return (
        <div className="hospital">
            <Header id={id}/>
            <div className='hospital_main'>
                <div className='hospital_content'>
                    <Menubar setState={setState}/>
                    <div style={{marginTop:"10px"}} className='right_content' >
                        <Menubar_nav state={state} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Patient;