import React, { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import learnItLogo from '../../assets/logo.svg'
import logoutIcon from '../../assets/logout.svg'
import { AuthContext } from '../../contexts/AuthContext'

const NavbarMenu = () => {
    const { logoutUser, authState: { user: { username } } } = useContext(AuthContext)

    const logout = () => logoutUser()

    return (
        <Navbar expand="lg" style={{ backgroundColor: '#4CAF50' }} variant="dark" className="shadow">
            <Container>
                <Navbar.Brand className="d-flex align-items-center">
                    <img src={learnItLogo} alt="learnItLogo" width="32" height="32" className="me-2" />
                    LearnItLogo
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/dashboard" className="text-white fw-bold">
                            Dashboard
                        </Nav.Link>
                        <Nav.Link href="/about" className="text-white fw-bold">
                            About
                        </Nav.Link>
                    </Nav>
                    <Nav className="d-flex align-items-center">
                        <Nav.Link className="text-white fw-bold me-3" disabled>
                            Welcome {username}!
                        </Nav.Link>
                        <Button
                            variant="outline-light"
                            className="d-flex align-items-center"
                            onClick={logout}
                            style={{
                                borderColor: '#fff',
                                color: '#fff',
                                transition: 'background-color 0.3s ease',
                            }}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = '#ccc')}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = 'transparent')}
                        >
                            <img src={logoutIcon} alt="logoutIcon" width="24" height="24" className="me-2" />
                            Logout
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarMenu