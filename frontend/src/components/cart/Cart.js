import React, {useCallback, useEffect, useState} from "react";
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import NavBarUser from "../navbars/NavBarUser";
import ProductCart from "./ProductCart";
import sendRequest from "../../http-client";
import cart_text from "../language/cart_text";

const Cart = ({language}) => {
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState(undefined);
    const [placed, setPlaced] = useState(false);

    const getCart = async (user_id) => {
        const token = localStorage.getItem('JWT');
        const options = {
            url: `http://localhost:3001/api/cart/${user_id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const result = await sendRequest(options);
        setCart(result.response);
    };

    useEffect(async () => {
        const user_id = localStorage.getItem("user_id");

        await getCart(user_id);
    }, []);

    const placeOrder = async (total) => {
        const user_id = localStorage.getItem('user_id');
        const token = localStorage.getItem('JWT');
        const options = {
            url: `http://localhost:3001/api/cart/order`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: 'POST',
            data: {
                user_id,
                total
            }
        };

        await sendRequest(options);
    };

    const placeOrderCallback = useCallback(async (total) => {
        if (order)
            return;

        setOrder(true);
        await placeOrder(total);
        setOrder(false);

        setPlaced(true);
    }, [order]);

    return (
        <div className="login-content">
            <NavBarUser language={language}/>
            <div> {
                cart.total === 0
                    ? <Container>
                        <Row className="pt-5">
                            <Col sm={8} md={8} lg={8}>
                                <Image className="w-75 m-auto d-block" fluid src={'../empty_cart.svg'}/>
                            </Col>
                            <Col sm={4} md={4} lg={4} className={'mt-login font-total'}>
                                <Row>{cart_text.empty[language]}</Row>
                                <Row>
                                    <Link className="col-primary" to='/'>{cart_text.home_link[language]}</Link>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                    : <Container>
                        <Row className="mt-3">
                            <Col sm={8} md={8} lg={8}>
                                <div>
                                    <hr/>
                                    <Row className="col-primary font-weight-bold">
                                        <Col sm={6} md={6} lg={6}>{cart_text.details[language]}</Col>
                                        <Col sm={2} md={2} lg={2} className={'text-center'}>{cart_text.quantity[language]}</Col>
                                        <Col sm={2} md={2} lg={2}>{cart_text.price[language]}</Col>
                                        <Col sm={2} md={2} lg={2}>{cart_text.total[language]}</Col>
                                    </Row>
                                    <hr/>
                                    { cart.products && cart.products.map(
                                            (product, idx) => (<ProductCart key={idx} product={product} language={language}/>)) }
                                </div>
                            </Col>
                            <Col sm={4} md={4} lg={4}>
                                <hr/>
                                <div className="col-primary font-weight-bold">{cart_text.summary[language]}</div>
                                <hr/>
                                <div>SUBTOTAL</div>
                                <div>{cart.subtotal} RON</div>
                                <br/>
                                <div className="col-primary font-weight-bold font-medium">TOTAL (+9% TVA)</div>
                                <div className="col-primary font-weight-bold font-total">{cart.total} RON</div>
                                <hr/>
                                <Button variant={'secondary'} size={'md'} className="w-100 mt-3"
                                        onClick={() => {
                                            setOrder(false);
                                            placeOrderCallback(cart.total).then(r => undefined);
                                        }}>
                                    {cart_text.checkout_btn[language]}
                                </Button>
                                { placed ? <Redirect to='/order'/> : undefined }
                            </Col>
                        </Row>
                    </Container>
            }</div>
        </div>
    );
};

export default Cart;