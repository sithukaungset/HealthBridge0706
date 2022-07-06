import HospitalPatients from "./HospitalPatients";
import HospitalSendPHR from "./HosptialSendPHR";
import HospitalSetting from "./HospitalSetting";
function HospitalRight({state}) {
    return (
        <div>
            {state === 1 ? <HospitalSendPHR /> :
             state === 2 ? <HospitalSetting /> :
             <HospitalPatients />}
        </div>
    )
}

export default HospitalRight;