import axios from 'axios';

 

import { useState, useRef, useEffect } from 'react';

 

import "../css/HeaderModal.css";

 

import 'react-toastify/dist/ReactToastify.css';

 

import PaymentModal from './PaymentModal';

 

 

 

function DoctorNotification({open, close, header}) {

 

    const BLOCK_CHAIN_URL = "http://203.247.240.226:22650/api";

    const BASE_URL = "http://203.247.240.226:8080/fhir";

 

    const [name, setName] = useState();

    const [show, setShow] = useState();

    const [amount, setAmount] = useState();

 

    // const getPatientInfo = async () => {

    //     await axios.get(`${BASE_URL}/Patient/151qz`).then((res) => {

    //         setName(res.data.name[0].text);

    //     })

    // }

 

    const getTokenAmount = async () => {

        await axios.get(`${BLOCK_CHAIN_URL}/query/EHR1`).then((res) => {

            setAmount(res.data.checkingBalance);

        })

    }

 

    const payment = async () => {

 

        await axios.post(`${BLOCK_CHAIN_URL}/sendPayment`, {

 

            "SenderName": "EHR1",

 

            "ReceiverName": "EHR1206",

 

            "Price": 1000

 

        }).then((res) => {

 

            console.log(res);

 

        })

 

    }

 

    useEffect(() => {

        getTokenAmount();

        //getPatientInfo();

    }, [])

 

 

    const closeHandler = () => {

        setShow(false);

    }

 

    const showHandler = () => {

        setShow(true)

    }

 

 

    const confirmBtn = async () => {

        showHandler();

    }

 

    return (

 

        <div className={open ? 'openModal modal' : 'modal'}>

 

            <PaymentModal 

                show={show}

                closeHandler={closeHandler}

                showHandler={showHandler}

                amount={amount}

            />

 

            {open ? (

 

                <section>

 

                    <main>

 

                        Record ID: jhikyuinn (Response OK)

 

                        <button className="my_info" onClick={confirmBtn}>Confirm</button>

 

                    </main>

 

                    <main>

 

                    Record ID: Tony (Response OK)

 

                        <button className="my_info" onClick={confirmBtn}>Confirm</button>

 

                    </main>

 

                </section>

 

            ) : null}

 

        </div>

 

    )

 

}

 

 

 

export default DoctorNotification;