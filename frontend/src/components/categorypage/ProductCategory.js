import React from "react";
import {Card} from "react-bootstrap";
import product_text from "../language/product_text";

const ProductCategory = ({product, language}) => {
    return (
        <Card style={{ width: '100%' , height: '40rem'}} className={'card-height'}>
            <Card.Link href={`/product/${product.product_id}`}>
                <Card.Img variant={'top'} src={product.image}/>
            </Card.Link>
            <Card.Body>
                <Card.Link href={`/product/${product.product_id}`}>
                    <Card.Title className="col-primary"> {product.name} </Card.Title>
                </Card.Link>
                <Card.Subtitle> {product.brand} </Card.Subtitle>
            </Card.Body>
            <Card.Footer className="card-subtitle h6">
                {product.price} RON
                <br/>
                { product.stock === 0 ? product_text.out_stock[language] : product_text.stock[language] }
            </Card.Footer>
        </Card>
    );
};

export default ProductCategory;