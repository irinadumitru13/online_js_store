import {Link} from "react-router-dom";
import React, {useState} from "react";
import {Alert, Button, Col, Form, Row, Container, Image} from "react-bootstrap";
import sendRequest from "../../http-client";
import register_text from "../language/account/register";

const Register = ({language}) => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(undefined)

    const onEmailChange = (event) => {
        setError(undefined);
        setEmail(event.target.value);

        if ( !!errors.email)
            setErrors({
                ...errors,
                email: null
            });
    };

    const onFirstNameChange = (event) => {
        setError(undefined);
        setFirstName(event.target.value);

        if ( !!errors.firstName)
            setErrors({
                ...errors,
                firstName: null
            });
    };

    const onLastNameChange = (event) => {
        setError(undefined);
        setLastName(event.target.value);

        if ( !!errors.lastName)
            setErrors({
                ...errors,
                lastName: null
            });
    };

    const onPhoneNumberChange = (event) => {
        setError(undefined);
        setPhoneNumber(event.target.value);

        if ( !!errors.phoneNumber)
            setErrors({
                ...errors,
                phoneNumber: null
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

    const onConfirmPasswordChange = (event) => {
        setError(undefined);
        setConfirmPassword(event.target.value);

        if ( !!errors.confirmPassword)
            setErrors({
                ...errors,
                confirmPassword: null
            });
    };

    const validateInput = () => {
        const newErrors = {};

        const onlyAlpha = /^[a-zăâîșțA-ZĂÂÎȘȚ ,.'-]+$/;
        const emailValidation = /^[a-zA-Z0-9_.]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
        const phoneValidation = /^07\d{8}$/;

        if (!firstName || firstName === '')
            newErrors.firstName = register_text.blank;
        else if (!onlyAlpha.test(firstName))
            newErrors.firstName = register_text.first_val;

        if (!lastName || lastName === '')
            newErrors.lastName = register_text.blank;
        else if (!onlyAlpha.test(lastName))
            newErrors.lastName = register_text.last_val;

        if (!email || email === '')
            newErrors.email = register_text.blank;
        else if (!emailValidation.test(email))
            newErrors.email = register_text.email_val;

        if (!phoneNumber || phoneNumber === '')
            newErrors.phoneNumber = register_text.blank;
        else if (!phoneValidation.test(phoneNumber))
            newErrors.phoneNumber = register_text.phone_val;

        if (!password || password === '')
            newErrors.password = register_text.blank;
        else if (password.length < 4)
            newErrors.password = register_text.pass_val;

        if (!confirmPassword || confirmPassword === '')
            newErrors.confirmPassword = register_text.blank;
        else if (confirmPassword !== password)
            newErrors.confirmPassword = register_text.conf_val;

        return newErrors;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newErrors = validateInput();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            const options = {
                url: `http://localhost:3001/api/users/register`,
                method: 'POST',
                data: {
                    email,
                    password,
                    firstName,
                    lastName,
                    phoneNumber
                }
            }

            try {
                await sendRequest(options);
                setError('');

            } catch (Error) {
                setError(register_text.register_err);
            }
        }
    };

    return (
        <div className="login-content">
            <Container>
                <Row className="pt-5">
                    <Col>
                        <Col className="mt-small">
                            <Image fluid src="../register.svg"/>
                        </Col>
                    </Col>
                    <Col className="mt-login">
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group controlId="firstName">
                                        <Form.Label className="col-primary">{register_text.first_label[language]}</Form.Label>
                                        <Form.Control type="text" placeholder={register_text.first_placeholder[language]}
                                                      onChange={onFirstNameChange} value={firstName} isInvalid={ !!errors.firstName }/>
                                        <Form.Control.Feedback type='invalid'>{ errors.firstName && errors.firstName[language] }</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="userLastName">
                                        <Form.Label className="col-primary">{register_text.last_label[language]}</Form.Label>
                                        <Form.Control type="text" placeholder={register_text.last_placeholder[language]}
                                                      onChange={onLastNameChange} value={lastName} isInvalid={ !!errors.lastName }/>
                                        <Form.Control.Feedback type='invalid'>{ errors.lastName && errors.lastName[language] }</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="userEmail">
                                        <Form.Label className="col-primary">{register_text.email_label[language]}</Form.Label>
                                        <Form.Control type="email" placeholder={register_text.email_placeholder[language]}
                                                      onChange={onEmailChange} value={email} isInvalid={ !!errors.email }/>
                                        <Form.Control.Feedback type='invalid'>{ errors.email && errors.email[language] }</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="userPhone">
                                        <Form.Label className="col-primary">{register_text.phone_label[language]}</Form.Label>
                                        <Form.Control type="text" placeholder={register_text.phone_placeholder[language]}
                                                      onChange={onPhoneNumberChange} value={phoneNumber} isInvalid={ !!errors.phoneNumber }/>
                                        <Form.Control.Feedback type='invalid'>{ errors.phoneNumber && errors.phoneNumber[language] }</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="userPassword">
                                        <Form.Label className="col-primary">{register_text.password_label[language]}</Form.Label>
                                        <Form.Control type="password" placeholder={register_text.password_placeholder[language]}
                                                      onChange={onPasswordChange} value={password} isInvalid={ !!errors.password }/>
                                        <Form.Control.Feedback type='invalid'>{ errors.password && errors.password[language] }</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="userConfirmPassword">
                                        <Form.Label className="col-primary">{register_text.conf_label[language]}</Form.Label>
                                        <Form.Control type="password" placeholder={register_text.conf_placeholder[language] } onChange={onConfirmPasswordChange} value={confirmPassword} isInvalid={ !!errors.confirmPassword }/>
                                        <Form.Control.Feedback type='invalid'>{ errors.confirmPassword && errors.confirmPassword[language] }</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button variant="outline-secondary" type="submit" onSubmit={handleSubmit} onClick={handleSubmit}>
                                {register_text.register_btn[language]}
                            </Button>
                        </Form>
                        <br/>
                        {
                            error !== undefined
                                ? (error === ''
                                    ? <Alert variant={'success'}>{register_text.success[language]}
                                            <Link className="col-primary" to={'/'}>{register_text.home_link[language]}</Link>
                                    </Alert>
                                    : <Alert variant={'danger'}>{error[language]}</Alert>)
                                : undefined
                        }
                        <span>{register_text.acc[language]}</span>
                        <Link className="col-primary" to={"/login"}>{register_text.login_link[language]}</Link>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Register;