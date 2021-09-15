import {Redirect} from "react-router-dom";
import React from "react";
import UserHome from "./UserHome";
import SupportHome from "./SupportHome";
import AdminHome from "./AdminHome";

const Home = ({language, role}) => {
    return (
        <div>
            {
                !role
                    ? <Redirect to={'/login'}/>
                    : (role === 'USER'
                        ? <UserHome language={language}/>
                        : (role === 'SUPPORT'
                            ? <SupportHome language={language}/>
                            : <AdminHome language={language}/>))
            }
        </div>
    );
};

export default Home;