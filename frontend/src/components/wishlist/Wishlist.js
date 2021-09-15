import React, {useEffect, useState} from "react";
import {Col, Container, Image, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import sendRequest from "../../http-client";
import NavBarUser from "../navbars/NavBarUser";
import ProductWish from "./ProductWish";
import wish_text from "../language/wish_text";

const Wishlist = ({language}) => {
    const [wish, setWish] = useState([]);

    const getWish = async (user_id) => {
        const token = localStorage.getItem('JWT');
        const options = {
            url: `http://localhost:3001/api/wish/${user_id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const result = await sendRequest(options);
        setWish(result.response);
    };

    useEffect(async () => {
        const user_id = localStorage.getItem('user_id');

        await getWish(user_id);
    });

    return (
        <div className={'login-content'}>
            <NavBarUser language={language}/>
            <div>
                <Container>
                    <Row className={'mt-3'}>
                        { wish.length === 0
                            ? <div className={'d-flex wishlist-content justify-content-center align-items-center font-total'}>
                                <Col sm={8} md={8} lg={8} >
                                    <Row>{wish_text.empty[language]}</Row>
                                    <Row>
                                        <Link className="col-primary" to='/'>{wish_text.home_link[language]}</Link>
                                    </Row>
                                </Col>
                                <Col className="d-flex justify-content-center align-items-center" sm={4} md={4} lg={4}>
                                    <Image fluid src="../wishlist.svg"/>
                                </Col>
                            </div>

                            : <div className={'d-flex'}>
                                <Col sm={8} md={8} lg={8}>
                                    <div>
                                        <hr/>
                                        <Row className={'col-primary font-weight-bold'}>
                                            <Col sm={6} md={6} lg={6}>{wish_text.details[language]}</Col>
                                            <Col sm={2} md={2} lg={2} className={'text-center'}>{wish_text.size[language]}</Col>
                                            <Col  sm={2} md={2} lg={2}>{wish_text.price[language]}</Col>
                                            <Col  sm={2} md={2} lg={2}/>
                                        </Row>
                                        <hr/>
                                        { wish && wish.map((product, idx) => (<ProductWish key={idx} product={product} language={language}/>)) }
                                    </div>
                                </Col>
                                <Col className="d-flex justify-content-center align-items-center" sm={4} md={4} lg={4}>
                                    <Image fluid src="../wishlist.svg"/>
                                </Col>
                            </div>
                        }
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Wishlist;