import React from "react";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import nav from "../language/nav";

const NavBarAdmin = ({language}) => {
    const fullName = localStorage.getItem('fullName');

    return (
        <Navbar bg={'dark'} variant={'dark'}>
            <Container className="px-15">
                <Navbar.Brand >{nav.hi[language]}{fullName}</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="mr-auto my-2 my-lg-0" style={{maxHeight: '100px'}} navbarScroll>
                        <Nav.Link href={'/'}>{nav.home_link[language]}</Nav.Link>
                        <Nav.Link href={'/users'}>{nav.users[language]}</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className={'justify-content-end'}>
                    <Button variant={'outline-light'} onClick={() => {
                        localStorage.removeItem('user_id');
                        localStorage.removeItem('role');
                        localStorage.removeItem('fullName');
                        localStorage.removeItem('JWT');
                    }} href={'/login'}>
                        {nav.logout_btn[language]}
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBarAdmin;