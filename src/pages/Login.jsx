import React, { use, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { Authcontext } from '../Context/Authcontext';
import { toast } from 'react-toastify';
import Sociallogin from '../Components/Sociallogin';


// import { toast } from 'react-toastify';
// import { GoogleAuthProvider, sendPasswordResetEmail, signInWithPopup } from 'firebase/auth';

// import { Authcontext } from '../Context/Authcontext';
// import { toast } from 'react-toastify';
// import Sociallogin from '../Components/Sociallogin';

const Login = () => {
     
     const {signin,setuser}=use(Authcontext);
    // const {signin}=use(Authcontext);
     const location=useLocation();
    
     const navigate=useNavigate();
    //  const emailref=useRef();
    //  const provider = new GoogleAuthProvider();
    const {register,handleSubmit,formState: { errors }}=useForm();


     const onSubmit=data=>{
        // console.log(data)

            signin(data.email,data.password).then((result)=>{
         const user=result.user;
        //  console.log(user);
         toast.success('Login Successfull');
        
         navigate(`${location.state?location.state:"/"}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        toast.warning(errorMessage);
    
       });
     }
    

    //  const handlelogin=(e)=>{
    //   e.preventDefault()
      
    //   const email=e.target.email.value;
    //   const password=e.target.password.value;
    //   // console.log(email,password)
    // //   signin(email,password).then((result)=>{
    // //     const user=result.user;
    // //     console.log(user);
    // //     toast.success('Login Successfull');
        
    // //     navigate(`${location.state?location.state:"/"}`);
    // //   })
    // //   .catch((error) => {
    // //     const errorCode = error.code;
    // //     const errorMessage = error.message;
    // //     console.log(errorCode);
    // //      toast.warning(errorMessage);
    // //     // ..
    // //   });
    //  }

  

    return (
        <div className='flex justify-center min-h-screen items-center'>
             <div className="card bg-base-100 w-full max-w-sm  shrink-0 shadow-2xl py-5 ">
              <h2 className='font-bold text-2xl text-center'>Login your account</h2>
             <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <fieldset className="fieldset">
               <label className="label">Email</label>
                 <input type="email" {...register('email')}  className="input" placeholder="Email" required />
               <label className="label">Password</label>
                  <input type="password" {...register('password',{
                    required:true,
                    
                  })} className="input" placeholder="Password"  />
                  {
                    errors.password?.type==="required" && 
                    <p className='text-red-500'>Password is required</p>
                    
                    
                  }
         
          <button type='submit' className="btn btn-neutral mt-4">Login</button>
          <p className='font-semibold text-center pt-5'>Don't Have An Account ?
            <Link className='text-red-500' to="/register">Register</Link> </p>
        </fieldset>

                 <p className='text-center font-semibold'>Or</p>
  {/* <div  className='border border-black py-2 font-semibold cursor-pointer flex items-center justify-center gap-2'><FcGoogle />Login With Google</div> */}
  <Sociallogin></Sociallogin>

  
    
       
      </form>
   

  
    </div>
      
            
        </div>
    );
  }
  

export default Login;