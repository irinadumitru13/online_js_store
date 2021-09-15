import React from "react";
import {Col, Container, Image, Row} from "react-bootstrap";
import NavBarSupport from "../navbars/NavBarSupport";

const SupportHome = ({language}) => {
    return (
        <div className={'login-content'}>
            <NavBarSupport language={language}/>
            <Container className={'py-5'}>
                <Row>
                    <Col md={{ span: 6}}>
                        <Image className={'product-image'} rounded fluid src={'../support.svg'}/>
                    </Col>
                    <Col md={{ span: 6}} className="mt-medium">
                        <Image className={'product-image'} rounded fluid src={'../support2.svg'}/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default SupportHome;