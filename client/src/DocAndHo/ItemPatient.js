import { useEffect, useState } from 'react';
import ItemPatientLeft from './ItemPatientLeft';
import ItemPatientRight from './ItemPatientRight';
function ItemPatient({patients}) {
    const [leftItem, setLeftItem] = useState([]);
    const [rightItem, setRightItem] = useState([]);
    console.log(patients);
    
    useEffect(() => {
            let leftTemp = [];
            let rightTemp = [];
            console.log("in map: ", patients);
            if(patients !== undefined) {
                patients.map((item, index) => {
                    // (index%2 === 0 ? setLeftItem([...leftItem, item]) : setRightItem([...rightItem, item]));
                    if(index % 2 === 0) {
                        leftTemp.push(item);
                    } else {
                        rightTemp.push(item);
                    }
                })
            }
            setLeftItem(leftTemp);
            setRightItem(rightTemp);
    }, [patients])
    return (
        <div className='patient_list_container'>
            <div className='patient_list_left'>
                {leftItem && leftItem.map((item, index) => {
                    return <ItemPatientLeft item={item} index={index} key={index} />
                })}
            </div>
            {/* {leftItem.map((item) => {
                return (item.resource.id);
            })} */}
            <div className='patient_list_right'>
                {rightItem && rightItem.map((item, index) => {
                    return <ItemPatientRight item={item} index={index} key={index} />
                })}
            </div>
        </div>
    )
}

export default ItemPatient;