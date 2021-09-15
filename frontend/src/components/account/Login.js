import {Link, Redirect} from "react-router-dom";
import React, {useState} from "react";
import {Alert, Button, Form, Container, Row, Col, Image} from "react-bootstrap";
import sendRequest from "../../http-client";
import login_text from "../language/account/login";

const Login = ({language, setRole}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(undefined);

    const onEmailChange = (event) => {
        setError(undefined);
        setEmail(event.target.value);

        if ( !!errors.email)
            setErrors({
                ...errors,
                email: null
            });
    };

    const onPasswordChange = (event) => {
        setError(undefined);
        setPassword(event.target.value);

        if ( !!errors.password)
            setErrors({
                ...errors,
                password: null
            });
    };

    const validateInput = () => {
        const newErrors = {};
        const emailValidation = /^[a-zA-Z0-9_.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

        if (!email || email === '')
            newErrors.email = login_text.blank;
        else if (!emailValidation.test(email))
            newErrors.email = login_text.email_val;

        if (!password || password === '')
            newErrors.password = login_text.blank;
        else if (password.length < 4)
            newErrors.password = login_text.pass_val;

        return newErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newErrors = validateInput();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {

            const options = {
                url: `http://localhost:3001/api/users/login`,
                method: 'POST',
                data: {
                    email,
                    password
                }
            }

            try {
                const user = await sendRequest(options);

                setRole(user.response.role);
                localStorage.setItem('user_id', user.response.user_id);
                localStorage.setItem('role', user.response.role);
                localStorage.setItem('fullName', user.response.fullName);
                localStorage.setItem('JWT', user.response.token);

                setError('');
            } catch (error) {
                if (error.response.status === 404) {
                    setError(login_text.register_err);
                }

                if (error.response.status === 401) {
                    setError(login_text.verify_err);
                }

                if (error.response.status === 403) {
                    setError(login_text.pass_err);
                }
            }
        }
    };

    return (
        <div className="login-content">
            <Container>
                <Row className="pt-5">
                    <Col className="mt-medium">
                        <Image fluid src="../login.svg"/>
                    </Col>
                    <Col className="mt-login">
                        <Form>
                            <Form.Group controlId="email">
                                <Form.Label className="col-primary">{login_text.email_label[language]}</Form.Label>
                                <Form.Control required type="email" placeholder={login_text.email_placeholder[language]}
                                              onChange={onEmailChange} value={email} isInvalid={ !!errors.email }/>
                                <Form.Control.Feedback type='invalid'>{ errors.email && errors.email[language] }</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label className="col-primary">{login_text.password_label[language]}</Form.Label>
                                <Form.Control required type="password" placeholder={login_text.password_placeholder[language]}
                                              onChange={onPasswordChange} value={password} isInvalid={ !!errors.password }/>
                                <Form.Control.Feedback type='invalid'>{ errors.password && errors.password[language] }</Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="outline-secondary" type="submit"
                                    onSubmit={handleSubmit} onClick={handleSubmit}>
                                {login_text.login_btn[language]}
                            </Button>
                        </Form>
                        <br/>
                        {
                            error !== undefined
                                ? (error === ''
                                        ? <Redirect to={'/'} />
                                        : <Alert variant={'danger'}>{error[language]}</Alert> )
                                : undefined
                        }
                        <span>{login_text.no_acc[language]}</span>
                        <Link className="col-primary" to="/register">{login_text.register_link[language]}</Link>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;