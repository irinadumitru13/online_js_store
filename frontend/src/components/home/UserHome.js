import React from "react";
import NavBarUser from "../navbars/NavBarUser";
import {Image, Container, Row, Col} from "react-bootstrap";

const UserHome = ({language}) => {
    return (
        <div>
            <NavBarUser language={language}/>
            <Container>
                <Row className='mt-medium mb-medium'>
                    <Col md={{ span: 6}}>
                        <Image rounded fluid src={'../home.svg'}/>
                    </Col>
                    <Col md={{ span: 6}} className="mt-large">
                        <Image rounded fluid src={'../home2.svg'}/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default UserHome;