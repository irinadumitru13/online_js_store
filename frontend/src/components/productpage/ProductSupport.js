import React, {useCallback, useEffect, useState} from "react";
import {
    Button,
    Card,
    Col,
    Container, Form,
    Image,
    InputGroup,
    Row
} from "react-bootstrap";
import NavBarSupport from "../navbars/NavBarSupport";
import sendRequest from "../../http-client";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui/Table";
import {MuiThemeProvider} from "material-ui";
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import DoneIcon from '@material-ui/icons/Done';
import product_text from "../language/product_text";

const ProductSupport = ({language, match}) => {
    const [product, setProduct] = useState({});
    const [newPrice, setNewPrice] = useState(undefined);
    const [price, setPrice] = useState(undefined);
    const [currentlyEditing, setCurrentlyEditing] = useState(false);
    const [done, setDone] = useState(undefined);
    const [xs, setXs] = useState(undefined);
    const [s, setS] = useState(undefined);
    const [m, setM] = useState(undefined);
    const [l, setL] = useState(undefined);
    const [xl, setXl] = useState(undefined);

    const onNewPriceChange = (event) => {
        setNewPrice(event.target.value);
    };

    const onXsChange = (event) => {
        setXs(event.target.value);
    };

    const onSChange = (event) => {
        setS(event.target.value);
    };

    const onMChange = (event) => {
        setM(event.target.value);
    };

    const onLChange = (event) => {
        setL(event.target.value);
    };

    const onXlChange = (event) => {
        setXl(event.target.value);
    };

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

    const modifyPrice = async (product_id, price) => {
        const token = localStorage.getItem('JWT');
        const options = {
            url: `http://localhost:3001/api/products/${product_id}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: 'PUT',
            data: {
                price
            }
        };

        await sendRequest(options);
    };

    const modifyPriceCallback = useCallback(async (product_id, newPrice) => {
        if (price)
            return;

        setPrice(true);
        await modifyPrice(product_id, newPrice);
        setPrice(false);

        window.location.reload();
    }, [price]);

    const updateStock = async (product_id, XS, S, M, L, XL) => {
        const token = localStorage.getItem('JWT');
        const options = {
            url: `http://localhost:3001/api/products/${product_id}/stock`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            method: 'PUT',
            data: {
                XS,
                S,
                M,
                L,
                XL
            }
        };

        await sendRequest(options);
    };

    const doneEditingCallback = useCallback(async (product_id, xs, s, m, l, xl) => {
        if (done)
            return;

        setDone(true);
        await updateStock(product_id, xs, s, m, l, xl);
        setDone(false);

        window.location.reload();
    }, [done]);

    const newLineText = (text) => {
        return text.split('\n').map((str, id) => <span className={'d-block'} key={id}>{str}</span>);
    };

    return (
        <MuiThemeProvider>
            <div>
                <NavBarSupport language={language}/>
                <Container className="my-5">
                    <Row>
                        <Col>
                            <Image fluid src={product.image} rounded alt={product.name} className={'product-image'}/>
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
                                <Col sm={9} md={9} lg={9}>
                                    <InputGroup>
                                        <Row>
                                            <Col sm={6} md={6} lg={6}>
                                                <Form>
                                                    <Form.Control placeholder={product_text.insert[language]} aria-label="new_price"
                                                                  aria-describedby="basic-addon2" type="number" onChange={onNewPriceChange}/>
                                                </Form>
                                            </Col>
                                            <Col sm={1} md={1} lg={1}></Col>
                                            <Col sm={5} md={5} lg={5}>
                                                <Button variant="outline-secondary" id="button-addon2" onClick={() => {
                                                    setPrice(false);
                                                    modifyPriceCallback(product.product_id, newPrice).then(r => undefined);
                                                }} disabled={newPrice === undefined}>
                                                    {product_text.change_btn[language]}
                                                </Button>
                                            </Col>
                                        </Row>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <hr/>
                            <Row className="card-body">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHeaderColumn key='thc-XS'>XS</TableHeaderColumn>
                                            <TableHeaderColumn key='thc-S'>S</TableHeaderColumn>
                                            <TableHeaderColumn key='thc-M'>M</TableHeaderColumn>
                                            <TableHeaderColumn key='thc-L'>L</TableHeaderColumn>
                                            <TableHeaderColumn key='thc-XL'>XL</TableHeaderColumn>
                                            <TableHeaderColumn key='thc-edit'/>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow key='tr-1' selectable={false}>
                                            <TableRowColumn key='trc-XS'>
                                                {currentlyEditing
                                                    ? <TextField name="xs" type="number" defaultValue={product.XS} onChange={onXsChange}/>
                                                    : product.XS}
                                            </TableRowColumn>
                                            <TableRowColumn key='trc-S'>
                                                {currentlyEditing
                                                    ? <TextField name='S' type='number' defaultValue={product.S} onChange={onSChange}/>
                                                    :product.S}
                                            </TableRowColumn>
                                            <TableRowColumn key='trc-M'>
                                                {currentlyEditing
                                                    ? <TextField name='M' type='number' defaultValue={product.M} onChange={onMChange}/>
                                                    : product.M}
                                            </TableRowColumn>
                                            <TableRowColumn key='trc-L'>
                                                {currentlyEditing
                                                    ? <TextField name='L' type='number' defaultValue={product.L} onChange={onLChange}/>
                                                    : product.L}
                                            </TableRowColumn>
                                            <TableRowColumn key='trc-XL'>
                                                {currentlyEditing
                                                    ? <TextField name='XL' type='number' defaultValue={product.XL} onChange={onXlChange}/>
                                                    : product.XL}
                                            </TableRowColumn>
                                            <TableRowColumn key='trc-edit'>
                                                {currentlyEditing
                                                    ? <DoneIcon onClick={() => {
                                                        setCurrentlyEditing(false);
                                                        setDone(false);
                                                        doneEditingCallback(product.product_id,
                                                            xs ? xs : product.XS,
                                                            s ? s : product.S,
                                                            m ? m : product.M,
                                                            l ? l : product.L,
                                                            xl ? xl : product.XL).then(r => undefined);
                                                    }}/>
                                                    : <EditIcon onClick={() => setCurrentlyEditing(true)}/>}
                                            </TableRowColumn>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </MuiThemeProvider>
    );
};

export default ProductSupport;