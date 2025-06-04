import React, { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import learnItLogo from '../../assets/logo.svg'
import logoutIcon from '../../assets/logout.svg'
import './NavbarMenu.css'
import { AuthContext } from '../../contexts/AuthContext'

const NavbarMenu = () => {
    const { logoutUser, authState: { user: { username } } } = useContext(AuthContext)

    const logout = () => logoutUser()

    return (
        <Navbar expand="lg" variant="dark" className="shadow navbar">
            <Navbar.Brand className="font-weight-bolder text-white">
                <img src={learnItLogo} alt="learnItLogo" width="32" height="32" className="mr-2" />
                LearnItLogo
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/dashboard" className="font-weight-bolder text-white">
                        Dashboard
                    </Nav.Link>
                    <Nav.Link href="/about" className="font-weight-bolder text-white">
                        About
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link className="font-weight-bolder text-white" disabled>
                        Welcome {username}!
                    </Nav.Link>
                    <Button className="btn-logout font-weight-bolder" onClick={logout}>
                        <img src={logoutIcon} alt="logoutIcon" width="32" height="32" />
                        Logout
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavbarMenu