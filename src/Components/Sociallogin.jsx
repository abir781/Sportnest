import React from 'react';
import { use } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Authcontext } from '../Context/Authcontext';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const Sociallogin = () => {
    const {signinwithgoogle}=use(Authcontext);
    const navigate=useNavigate();

    const handlegooglesignin=()=>{

        signinwithgoogle()
        .then(result=>{
            console.log(result);
            toast.success("Login successfull")
            navigate("/");

        })
        .catch(error=>{
            console.log(error)
            toast.warning(error)
        })

    }

    return (
        <div onClick={handlegooglesignin} className='border border-black py-2 font-semibold cursor-pointer flex items-center justify-center gap-2'><FcGoogle />Login With Google</div>
    );
};

export default Sociallogin;