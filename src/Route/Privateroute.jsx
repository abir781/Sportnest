import React, { use } from 'react';
import { Authcontext } from '../Context/Authcontext';
import { Navigate, useLocation } from 'react-router';

const Privateroute = ({children}) => {
    const {user,loading}=use(Authcontext);
    if(loading){
        return <span className="loading loading-spinner loading-xl"></span>
    }
    const location=useLocation();

    if(!user){
        return <Navigate to='/login' state={location.pathname}></Navigate>
    }
    return children;
};

export default Privateroute;