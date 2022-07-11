import { Modal, Button, Form } from 'react-bootstrap';

import { useState, useRef } from 'react'

import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

 

import "../css/PaymentModal.css"

 

function PaymentModal({show, closeHandler, amount}) {

    const BLOCK_CHAIN_URL = "http://203.247.240.226:22650/api";

    const datas = ["PID", "Name", "Age", "Gender", "Mobile Phone", "Address", "Symptoms", "Adding Comment", "Assigner", "Doctor Name"];

 

    const [txInfo, setTxInfo] = useState({

        senderName: "",

        receiverName: "",

        amount: 0,

    });

 

    const toastId = useRef();

 

    const payment = async () => {

        await axios.post(`${BLOCK_CHAIN_URL}/sendPayment`, {

            "SenderName": txInfo.senderName,

            "ReceiverName": txInfo.receiverName,

            "Price": txInfo.amount

        }).then((res) => {

            console.log(res);

        })

    }

 

    const changeHandler = (e) => {

        setTxInfo({

            ...txInfo,

            [e.target.name]: e.target.value

        })

    }

 

    const resetForm = () => {

        setTxInfo({

            senderName: "",

            receiverName: "",

            amount: 0

        })

    }

 

    const btnPayment = async () => {

        toastId.current = toast("Processing Payment....", {autoClose: false})

        await payment().then(() => {

            toast.update(toastId.current, {render: 'Payment successful', type: toast.TYPE.SUCCESS, position: toast.POSITION.TOP_RIGHT, autoClose: 3000});

            resetForm();

        })

    }

 

    return (

        <div className='payment_modal'>

            <ToastContainer />

            <Modal show={show} onHide={closeHandler} centered>

 

                <Modal.Header closeButton>

                    <Modal.Title>Payment to Owner</Modal.Title>

                </Modal.Header>

 

                <Modal.Body>

                    <div className='user_name'><h5></h5></div>

                    <Form>

                        <div className='total_amount'>

                            Total amount: 1.64 HBT

                        </div>

                        <div className='check_col'>

                            {datas.map((item, key) => {

                                return (<Form.Check 

                                    inline

                                    disabled

                                    defaultChecked={true}

                                    label={item}

                                    type="checkbox"

                                    name="PHRdata"

                                    id={item}

                                    key={key}

                                />)

                            })}

                        </div>

 

                        <div className='sender_name'>

                            <Form.Group className="mb-3" controlId="senderName">

                            <Form.Label>Sender Name</Form.Label>

                            <Form.Control

                                type="text"

                                name='senderName'

                                value={txInfo.senderName}

                                onChange={changeHandler}

                                autoFocus

                            />

                            </Form.Group>

                        </div>

 

                        <div className='receiver_name'>

                            <Form.Group className="mb-3" controlId="receiverName">

                            <Form.Label>Receiver Name</Form.Label>

                            <Form.Control

                                type="text"

                                name='receiverName'

                                value={txInfo.receiverName}

                                onChange={changeHandler}

                                autoFocus

                            />

                            </Form.Group>

                        </div>

 

                        <div className='token_amount'>

                            <Form.Group className="mb-3" controlId="amount">

                            <Form.Label className='amount_label'><span>Token amount</span>({amount} HBT)</Form.Label>

                            <Form.Control

                                type="number"

                                placeholder="amount HBT"

                                name='amount'

                                value={txInfo.amount}

                                onChange={changeHandler}

                                autoFocus

                            />

                            </Form.Group>

                        </div>

                    </Form>

                </Modal.Body>

 

                <Modal.Footer>

                    <Button variant="secondary" onClick={closeHandler}>

                        Close

                    </Button>

                    <Button variant="primary" onClick={btnPayment}>

                        Payment

                    </Button>

                </Modal.Footer>

 

            </Modal>

        </div>

    )

}

 

export default PaymentModal;