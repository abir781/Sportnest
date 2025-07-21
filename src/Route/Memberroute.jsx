import React, { use } from 'react';
import { Authcontext } from '../Context/Authcontext';
import useUserRole from '../hooks/useUserRole';
import { Navigate } from 'react-router';

const Memberroute = ({children}) => {
   const {user,loading}=use(Authcontext);
    const {role}=useUserRole();
        if(loading){
            return <span className="loading loading-spinner loading-xl"></span>
        }
        if(!user || role !== 'member'){
            return <Navigate to='/forbidden' state={location.pathname}></Navigate>
        }
    return children;
};

export default Memberroute;