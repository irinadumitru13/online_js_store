import React from "react";
import {Col, Container, Image, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import NavBarUser from "../navbars/NavBarUser";
import order from "../language/order";

const Order = ({language}) => {
    return (
        <div className={'login-content'}>
            <NavBarUser language={language}/>
            <Container>
                <Row className={'justify-content-center align-items-center mt-3 wishlist-content'}>
                    <Col className={'font-total'}>
                        <Row>{order.placed[language]}</Row>
                        <Row>{order.thank[language]}</Row>
                        <hr/>
                        <Row>
                            <Link className="col-primary" to='/'>{order.home_link[language]}</Link>
                        </Row>
                    </Col>
                    <Col>
                        <Image fluid src="../order.svg"/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Order;