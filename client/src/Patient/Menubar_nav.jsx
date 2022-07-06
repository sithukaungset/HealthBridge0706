import Patientrecords from './Patientrecords';
import Patienttransactions from './Patienttransactions';
import Patientpredictions from '../MachineLearning/src/components/ML.js';
import Patientwearabledevice from './Patientwearabledevice';

import '../css/Menubar.css';

function Menubar_nav({state}) {
    return (
        <div >
            {state === 1 ? <Patienttransactions /> :
             state === 2 ? <Patientpredictions /> :
             state === 3 ? <Patientwearabledevice  /> :
             <Patientrecords />}
        </div>
    )
}

export default Menubar_nav;