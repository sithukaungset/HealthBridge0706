import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import banner from '../../image/banner.jpg';
import Header from './UserHeader.js';
function User() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",

    });

    const onChangeHandler = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }
    const onClickBtn = () => {
        if(user.email !== undefined) {
            navigate(`/hospital/${user.email}`, {id: user.email});
        }
        if(user.email === "James") {
            navigate(`/doctor/${user.email}`, {id: user.email})
        }
    }
    return (
        <div className='user'>
            <Header />
            <div className='login_container'>
                <div className='item_login'>
                    <Form className='login_form'>
                        <span>Sign in</span>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="text" placeholder="Enter email" value={user.email} name="email" onChange={onChangeHandler}/>
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={user.password}name="password" onChange={onChangeHandler}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="primary" type="button" onClick={onClickBtn}>
                            Sign in
                        </Button>
                    </Form>
                </div>
                <div className='item_img'>
                    <img src={banner} alt="banner" />
                </div>
            </div>
        </div>
    )
}

export default User;