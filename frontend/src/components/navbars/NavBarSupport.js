import React, {useEffect, useState} from "react";
import {Nav, Navbar, NavDropdown, Container, Button} from "react-bootstrap";
import sendRequest from "../../http-client";
import nav from "../language/nav.js";

const NavBarSupport = ({language}) => {
    const [categories, setCategories] = useState([]);
    const fullName = localStorage.getItem('fullName');

    const getCategories = async () => {
        const token = localStorage.getItem('JWT');
        const options = {
            url: `http://localhost:3001/api/category`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const categories = await sendRequest(options);

        setCategories(categories.response);
    };

    useEffect(async () => {
        await getCategories();
    }, []);

    return (
        <Navbar bg={'dark'} variant={'dark'}>
            <Container className="px-15">
                <Navbar.Brand >{nav.hi[language]}{fullName}</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="mr-auto my-2 my-lg-0" style={{maxHeight: '100px'}} navbarScroll>
                        <Nav.Link href={'/'}>{nav.home_link[language]}</Nav.Link>
                        <NavDropdown title={nav.categories[language]} id="navbarScrollingDropdown">
                            {
                                categories && categories.map(category =>
                                    <NavDropdown.Item href={`/category/${category.category_id}`} key={category.category_id}>
                                        {language === 'en' ? category.en : category.ro}
                                    </NavDropdown.Item>)
                            }
                        </NavDropdown>
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

export default NavBarSupport;