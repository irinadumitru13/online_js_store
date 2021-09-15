import React, {useEffect, useState} from 'react';
import {Alert, Col, Container, Image, Row} from "react-bootstrap";
import sendRequest from "../../http-client";
import {Link} from "react-router-dom";
import confirm_text from "../language/account/confirm";

const Confirm = ({language, match}) => {
    const [result, setResult] = useState(undefined);

    const verifyUser = async (email, verificationCode) => {
        const options = {
            url: `http://localhost:3001/api/users/verify/${email}/${verificationCode}`
        };

        try {
            await sendRequest(options);
            setResult('OK');

        } catch (error) {
            setResult('');
        }
    };

    useEffect(async () => {
        if (match.match.path === '/confirm/:email/:verificationCode') {
            await verifyUser(match.match.params.email, match.match.params.verificationCode);
        }
    }, []);

    return (
        <div className="login-content">
            <Container>
                <Row className={'justify-content-center align-items-center mt-3 wishlist-content'}>
                    <Col>
                        {
                            result !== undefined
                                ? (result !== ''
                                    ? <Alert variant={'success'}>{confirm_text.verified[language]}
                                        <Link className="col-primary" to={'/login'}>{confirm_text.login_link[language]}</Link>
                                    </Alert>
                                    : <Alert variant={'danger'}>{confirm_text.expired[language]}
                                        <Link className="col-primary" to={'/register'}>{confirm_text.register_link[language]}</Link>
                                        {confirm_text.again[language]}
                                    </Alert>)
                                : <Alert variant={'warning'}>{confirm_text.warning[language]}
                                    <Link className="col-primary" to={'/'}>{confirm_text.home_link[language]}</Link>
                                </Alert>
                        }
                    </Col>
                    <Col sm={8} md={8} lg={8}>
                        <Image fluid src="/verify.svg"/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Confirm;