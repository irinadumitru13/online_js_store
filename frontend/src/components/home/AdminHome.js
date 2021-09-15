import React from "react";
import {Col, Container, Image, Row} from "react-bootstrap";
import NavBarAdmin from "../navbars/NavBarAdmin";

const AdminHome = ({language}) => {
    return (
        <div className={'login-content'}>
            <NavBarAdmin language={language}/>
            <Container className={'py-5'}>
                <Row>
                    <Col md={{ span: 6}}>
                        <Image rounded fluid src={'../admin.svg'}/>
                    </Col>
                    <Col md={{ span: 6}} className="mt-large">
                        <Image rounded fluid src={'../admin2.svg'}/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AdminHome;