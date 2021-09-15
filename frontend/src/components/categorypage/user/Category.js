import React, {useEffect, useState} from "react";
import sendRequest from "../../../http-client";
import NavBarUser from "../../navbars/NavBarUser";
import Grid from '@material-ui/core/Grid';
import ProductCategory from "../ProductCategory";

const Category = ({language, match}) => {
    const [products, setProducts] = useState([]);

    const getProducts = async (category_id) => {
        const token = localStorage.getItem('JWT');
        const options = {
            url: `http://localhost:3001/api/category/${category_id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const result = await sendRequest(options);

        setProducts(result.response);
    };

    useEffect(async () => {
        if (match.match.path === '/category/:id') {
            await getProducts(match.match.params.id);
        }
    }, []);

    return (
        <div>
            <NavBarUser language={language}/>
            <div className="container">
                <Grid container alignItems={'baseline'} justify={'space-evenly'} spacing={5} className='my-5'>
                    { products && products.map(
                            (product, idx) =>
                                (<Grid key={idx} item xs={6} sm={4} md={3}>
                                    <ProductCategory product={product} language={language}/>
                                </Grid>)) }
                </Grid>
            </div>
        </div>
    );
};

export default Category;