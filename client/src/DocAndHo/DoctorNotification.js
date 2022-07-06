import axios from 'axios';

import { useRef } from 'react';

import { ToastContainer, toast } from 'react-toastify';

import "../css/HeaderModal.css";

import 'react-toastify/dist/ReactToastify.css';

 

function DoctorNotification({open, close, header}) {

    const BLOCK_CHAIN_URL = "http://203.247.240.226:22650/api"

 

    const toastId = useRef();

 

    const payment = async () => {

        await axios.post(`${BLOCK_CHAIN_URL}/sendPayment`, {

            "SenderName": "EHR1",

            "ReceiverName": "EHR1206",

            "Price": 1000

        }).then((res) => {

            console.log(res);

        })

    }

 

    const payBtn = async () => {

        toastId.current = toast("Wait.. Paying tokens… ", {autoClose: false});

        await payment().then(() => {

            toast.update(toastId.current, { render: 'Pay tokens successfully!', type: toast.TYPE.SUCCESS, position: toast.POSITION.TOP_RIGHT, autoClose: 3000});

        })

    }

    return (

        <div className={open ? 'openModal modal' : 'modal'}>

            <ToastContainer />

            {open ? (

                <section>

                    <main>

                        PID: 151qz response ok

                        <button className="my_info" onClick={payBtn}>Payment</button>

                    </main>

                    <main>

                        PID: wd1223a response ok

                        <button className="my_info" onClick={payBtn}>Payment</button>

                    </main>

                </section>

            ) : null}

        </div>

    )

}

 

export default DoctorNotification;