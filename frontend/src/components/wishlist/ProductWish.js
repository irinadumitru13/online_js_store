import React, {useCallback, useState} from "react";
import {Button, Col, Image, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import sendRequest from "../../http-client";
import wish_text from "../language/wish_text";

const ProductWish = ({product, language}) => {
    const [deleted, setDeleted] = useState(undefined);

    const deleteFromWish = async (wish_id) => {
        const token = localStorage.getItem('JWT');
        const options = {
            url: `http://localhost:3001/api/wish/${wish_id}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: 'DELETE'
        };

        await sendRequest(options);
    };

    const deleteFromWishCallback = useCallback(async (wish_id) => {
        if (deleted)
            return;

        setDeleted(true);
        await deleteFromWish(wish_id);
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
                                <Image src={product.image} fluid/>
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
                <Col>
                    <div className="d-flex flex-column align-items-center">
                        <div>{product.size}</div>
                        <div className="mt-small">
                            <Button variant={'outline-secondary'} size={'sm'} onClick={
                                () => {
                                    setDeleted(false);
                                    deleteFromWishCallback(product.wish_id).then(r => undefined);
                                }}>
                                {wish_text.remove_btn[language]}
                            </Button>
                        </div>
                    </div>
                </Col>
                <Col>{product.price} RON</Col>
                <Col>
                    { product.stock === 0
                        ? wish_text.out_stock[language]
                        : (product.stock < 3
                            ? wish_text.limited[language]
                            : wish_text.stock[language]) }
                </Col>
            </Row>
            <hr/>
        </div>
    );
};

export default ProductWish;