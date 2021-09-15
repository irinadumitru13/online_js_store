import React, {useCallback, useEffect, useState} from "react";
import sendRequest from "../../http-client";
import NavBarUser from "../navbars/NavBarUser";
import {
    Alert,
    Button,
    ButtonGroup,
    Card,
    Col,
    Container,
    FormControl,
    Image,
    InputGroup,
    Row,
    ToggleButton
} from "react-bootstrap";
import {Fab} from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import {Link} from "react-router-dom";
import product_text from "../language/product_text";

const Product = ({language, match}) => {
    const [product, setProduct] = useState({});
    const user_id = localStorage.getItem('user_id');
    const [size, setSize] = useState(undefined);
    const [pieces, setPieces] = useState(1);
    const [error, setError] = useState(undefined);
    const [wish, setWish] = useState(undefined);
    const [cart, setCart] = useState(undefined);

    const getProduct = async (product_id) => {
        const token = localStorage.getItem('JWT');
        const options = {
            url: `http://localhost:3001/api/products/${product_id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const result = await sendRequest(options);

        setProduct(result.response);
    };

    useEffect(async () => {
        if (match.match.path === '/product/:id') {
            await getProduct(match.match.params.id);
        }
    }, []);

    const addToWish = async (product_id, size) => {
        const token = localStorage.getItem('JWT');
        const options = {
            url: `http://localhost:3001/api/wish`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: 'POST',
            data: {
                user_id,
                product_id,
                size
            }
        };

        await sendRequest(options);
    };

    const addToWishCallBack = useCallback(async (product_id, size) => {
        if (wish)
            return;

        setWish(true);

        await addToWish(product_id, size);

        setWish(false);
    }, [wish]);

    const addToCart = async (product_id, size, pieces) => {
        const token = localStorage.getItem('JWT');
        const options = {
            url: `http://localhost:3001/api/cart`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: 'POST',
            data: {
                user_id,
                product_id,
                size,
                pieces
            }
        };

        await sendRequest(options);
    };

    const addToCartCallback = useCallback(async (product_id, size, pieces) => {
        if (cart)
            return;

        setCart(true);
        await addToCart(product_id, size, pieces);
        setCart(false);
    }, [cart]);

    const newLineText = (text) => {
        return text.split('\n').map((str, id) => <span className="d-block" key={id}>{str}</span>);
    };

    const sizes = [
        {name: 'XS', value: 'XS'},
        {name: 'S', value: 'S'},
        {name: 'M', value: 'M'},
        {name: 'L', value: 'L'},
        {name: 'XL', value: 'XL'}
    ];

    return (
        <div>
            <NavBarUser language={language}/>
            <Container className="my-5">
                <Row>
                    <Col>
                        <Image fluid src={product.image} rounded alt={product.name} className="product-image"/>
                    </Col>
                    <Col>
                        <Card border={'light'} >
                            <Card.Body>
                                <Card.Title className="font-large">{product.name}</Card.Title>
                                <Card.Subtitle className="font-medium font-weight-light">{product.brand}</Card.Subtitle>
                                <Card.Title className="col-primary mt-3 font-large">{product.price} RON</Card.Title>
                                <hr/>
                                <Card.Text className="product-info font-small">{product.description && newLineText(product.description)}</Card.Text>
                                <hr/>
                            </Card.Body>
                        </Card>

                        <Row className="card-body">
                            <Col>
                                <ButtonGroup toggle className="w-100">
                                    {sizes.map((size, idx) => (
                                        <ToggleButton key={idx} type="radio" variant="outline-secondary" name="radio"
                                            value={size.value} checked={size === size.value} disabled={product[size.name] === 0}
                                            onChange={(e) => {
                                                setSize(e.currentTarget.value);
                                                setError(undefined);
                                            }}>
                                            {size.name}
                                        </ToggleButton>
                                    ))}
                                </ButtonGroup>
                            </Col>
                            <Col>
                                <InputGroup size={'sm'}>
                                    <InputGroup.Append>
                                        <Button variant="outline-secondary" onClick={() => setPieces(Math.max(1, pieces - 1))}>
                                            -
                                        </Button>
                                    </InputGroup.Append>
                                    <FormControl className="text-center" placeholder={pieces} aria-label="pieces"
                                        aria-describedby="basic-addon2" readOnly type={'number'}/>
                                    <InputGroup.Append>
                                        <Button variant="outline-secondary"
                                                onClick={() => size ? setPieces(Math.min(product[size], pieces + 1)) : setError('ERROR')}>
                                            +
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Col>
                        </Row>

                        <Row className="card-body d-flex align-items-center justify-content-between">
                            <Col>
                                <Button variant={'secondary'} size={'md'} className="w-100" disabled={ size === undefined }
                                        onClick={() => {
                                            setCart(false)
                                            size ? addToCartCallback(product.product_id, size, pieces): setError('ERROR');}}>
                                    {product_text.cart[language]}
                                </Button>
                            </Col>
                            <Col className="justify-content-end d-flex">
                                <Fab aria-label="like" disabled={ size === undefined || wish !== undefined}
                                     onClick={() => {
                                        setWish(false);
                                        size ? addToWishCallBack(product.product_id, size) : setError('ERROR');}}>
                                    <FavoriteIcon />
                                </Fab>
                            </Col>
                        </Row>
                        { error ? <Alert variant={'danger'}>{product_text.size_err[language]}</Alert> : undefined }

                        { wish === false
                            ? <Alert variant={'success'} onClose={() => setWish(true)} dismissible>
                                {product_text.add[language]}
                                <Link className="col-primary" to='/wish'>{product_text.wish_link[language]}</Link>
                                .
                            </Alert>
                            : undefined }
                        { cart === false
                            ? <Alert variant={'success'} onClose={() => setCart(true)} dismissible>
                                {product_text.add[language]}
                                <Link className="col-primary" to='/cart'>{product_text.cart_link[language]}</Link>
                                .
                            </Alert>
                            : undefined }
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Product;