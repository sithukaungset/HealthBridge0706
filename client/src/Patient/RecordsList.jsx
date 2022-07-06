import { useEffect, useState } from 'react';
import RecordListLeft from './RecordListLeft';
import RecordListRight from './RecordListRight';
import "../css/PatientRecord.css"

function RecordsList({record}) {

    const [leftItem, setLeftItem] = useState([]);
    const [rightItem, setRightItem] = useState([]);
    
    useEffect(() => {
            let leftTemp = [];
            let rightTemp = [];
            if(record !== undefined) {
                record.map((item, index) => {
                    if(index % 2 === 0) {
                        leftTemp.push(item);
                    } else {
                        rightTemp.push(item);
                    }
                })
            }
            setLeftItem(leftTemp);
            setRightItem(rightTemp);
    }, [record])
    return (
        <div className='patient_list_container'>
            <div className='patient_list_left'>
                {leftItem && leftItem.map((item, index) => {
                    return <RecordListLeft item={item} index={index} key={index} />
                })}
            </div>
            <div className='patient_list_right'>
                {rightItem && rightItem.map((item, index) => {
                    return <RecordListRight item={item} index={index} key={index} />
                })}
            </div>
        </div>
    )
}

export default RecordsList;

   