import WearableRecords from './WearableRecords';
import WearableSend from './WearableSend';
import WearableSettings from './WearableSettings';

import '../css/Menubar.css';

function WearableMenubar_nav({state}) {
    return (
        <div >
            {state === 1 ? <WearableSend /> :
             state === 2 ? <WearableSettings /> :
             <WearableRecords />}
        </div>
    )
}

export default WearableMenubar_nav;