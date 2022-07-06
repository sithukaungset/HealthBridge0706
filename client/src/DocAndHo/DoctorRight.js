import DoctorTx from "./DoctorTx";
import DoctorReq from "./DoctorReq";
import DoctorPList from "./DoctorPList";
function DoctorRight( {state} ) {
    return (
        <div>
            {state === 1 ? <DoctorReq /> :
             state === 2 ? <DoctorTx /> :
             <DoctorPList />}
        </div>
    )
}

export default DoctorRight;