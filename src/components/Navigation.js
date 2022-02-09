import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import {NavLink} from 'react-router-dom'
import '../styles/Navigation.css'

const Navigation = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to='/personal/' className="navlink">Home</NavLink>
                        <NavLink to='/personal/movies' className="navlink">Movies</NavLink>
                        <NavLink to='/personal/shows' className="navlink">Shows</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};

export default Navigation