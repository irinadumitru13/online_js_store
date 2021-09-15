import React, {useCallback, useState} from "react";
import {Button, Col, Image, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import sendRequest from "../../http-client";
import cart_text from "../language/cart_text";

const ProductCart = ({product, language}) => {
    const [deleted, setDeleted] = useState(undefined);

    const deleteFromCart = async (cart_id) => {
        const token = localStorage.getItem('JWT');
        const options = {
            url: `http://localhost:3001/api/cart/${cart_id}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: 'DELETE'
        };

        await sendRequest(options);
    };

    const deleteFromCartCallback = useCallback(async (cart_id) => {
        if (deleted)
            return;

        setDeleted(true);
        await deleteFromCart(cart_id);
        setDeleted(false);

        window.location.reload(false);
    }, [deleted]);

    return (
        <div>
            <Row>
                <Col sm={6} md={6} lg={6}>
                    <Row>
                        <Col>
                            <Link to={`/product/${product.product_id}`}>
                                <Image rounded src={product.image} fluid/>
                            </Link>
                        </Col>
                        <Col>
                            <Link to={`/product/${product.product_id}`} className='col-primary'>
                                <Row>{product.name}</Row>
                            </Link>
                            <Row>{product.brand}</Row>
                        </Col>
                    </Row>
                </Col>
                <Col sm={2} md={2} lg={2}>
                    <div className="d-flex flex-column align-items-center">
                        <div>{product.pieces}</div>
                        <div className="mt-small">
                            <Button variant={'outline-secondary'} size={'sm'} onClick={
                                () => {
                                    setDeleted(false);
                                    deleteFromCartCallback(product.cart_id).then(r => undefined);}
                            }>
                                {cart_text.remove_btn[language]}
                            </Button>
                        </div>
                    </div>
                </Col>
                <Col sm={2} md={2} lg={2}>{product.price} RON</Col>
                <Col sm={2} md={2} lg={2}>{product.price * product.pieces} RON</Col>
            </Row>
            <hr/>
        </div>
    );
};

export default ProductCart;