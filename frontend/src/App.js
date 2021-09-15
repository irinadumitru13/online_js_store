import './App.css';
import React, {useState} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {Navbar} from "react-bootstrap";
import Register from "./components/account/Register";
import Login from "./components/account/Login.js";
import Confirm from "./components/account/Confirm";
import Home from "./components/home/Home";
import Category from "./components/categorypage/user/Category";
import LanguageSelector from "./components/language/LanguageSelector";
import Product from "./components/productpage/Product";
import Cart from "./components/cart/Cart";
import Wishlist from "./components/wishlist/Wishlist";
import Order from "./components/order/Order";
import CategorySupport from "./components/categorypage/support/CategorySupport";
import ProductSupport from "./components/productpage/ProductSupport";
import Users from "./components/users/Users";

const App = () => {
    const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
    const [role, setRole] = useState(localStorage.getItem('role') || undefined);

    return (
        <div className="App">
            <Navbar bg="light" variant="light">
                <div className="container justify-content-between align-content-center d-flex">
                    <Navbar.Brand href="/">
                        <img alt="Logo" src="/logo.png" width="200" height="100" className="d-inline-block align-top"/>
                    </Navbar.Brand>
                    <LanguageSelector setLanguage={setLanguage} language={language}/>
                </div>
            </Navbar>
            <BrowserRouter basename={'/'}>
                <Switch>
                    <Route exact path={'/'} render={() => <Home language={language} role={role}/> }/>
                    <Route path='/login' render={() => <Login language={language} setRole={setRole}/> }/>
                    <Route path='/register' render={() => <Register language={language}/> }/>
                    <Route path={'/confirm/:email/:verificationCode'} render={(match) => <Confirm language={language} match={match}/> }/>

                    {role === 'USER' && (<Route path={'/category/:id'} render={(match) => <Category language={language} match={match}/>}/>)}
                    {role === 'USER' && (<Route path={'/product/:id'} render={(match) => <Product language={language} match={match}/> }/>)}
                    {role === 'USER' && (<Route path={'/cart'} render={() => <Cart language={language}/> }/>)}
                    {role === 'USER' && (<Route path={'/wish'} render={() => <Wishlist language={language}/> }/>)}
                    {role === 'USER' && (<Route path={'/order'} render={() => <Order language={language}/> }/>)}

                    {role === 'SUPPORT' && (<Route path={'/category/:id'} render={(match) => <CategorySupport language={language} match={match}/>}/>)}
                    {role === 'SUPPORT' && (<Route path={'/product/:id'} render={(match) => <ProductSupport language={language} match={match}/> }/>)}

                    {role === 'ADMIN' && (<Route path={'/users'} render={() => <Users language={language}/> }/>)}
                    <Route path={'*'}> { <Redirect to={'/'}/> } </Route>
                </Switch>
            </BrowserRouter>
            <div id="footer">
                <div className="container p-2 col-white text-center font-italic font-footer">
                    <p className="my-1">Dumitru Irina-Alexandra</p>
                    <p className="my-1">Copyright mai 2021 - Proiect PWeb</p>
                    <p className="my-1">irina.dumitru1311@stud.acs.upb.ro</p>
                </div>
            </div>
        </div>
    );
};

export default App;
