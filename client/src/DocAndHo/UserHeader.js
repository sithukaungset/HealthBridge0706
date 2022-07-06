import { Nav, Container, Navbar, Dropdown } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function UserHeader( ) {
    const {id} = useParams();
    return (
        <div className='user_header'>
                <Navbar variant="light">
                    <Container>
                        <Navbar.Brand href="#home">Health Bridge</Navbar.Brand>
                        <Nav className="me-auto">
                        </Nav>
                    </Container>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" className='drop_btn'>
                            {console.log(id)}
                            {id ? id : "Sign up"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Hospital</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Practitioner</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Patient</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar>
            </div>
    )
}

export default UserHeader;