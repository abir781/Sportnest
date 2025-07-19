import React, { use } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { Authcontext } from '../Context/Authcontext';
import { toast } from 'react-toastify';
import useAxios from '../hooks/useAxios';

const Register = () => {

    const {createuser,setuser,updateuser}=use(Authcontext);
    const navigate=useNavigate();
    const axiosInstance=useAxios();
    const {handleSubmit,register,formState: { errors }}=useForm();
    const onSubmit=data=>{
        console.log(data)
        
        console.log(createuser)
         createuser(data.email,data.password)
                 .then(async(result)=>{
                    const user=result.user;
                     toast.success("Register Successfull");
                    console.log(user)
                    const userInfo= {
                      name:data.name,
                      email:data.email,
                      photo:data.photo,
                      role: 'user',
                      created_at: new Date().toISOString(),
                    }
                    const userRes= await axiosInstance.post('/users',userInfo);
                    console.log(userRes.data);
                    updateuser({displayName:data.name,photoURL:data.photo}).then(()=>{
                      setuser({...user,displayName:data.name,photoURL:data.photo});
                      navigate("/");
                    })
                    .catch((error) => {
                      console.log(error);
                      setuser(user);
                    });
                    
                 })
                 .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    
                    toast.warning(errorMessage);
                    
                  });
    }
    return (
        <div className='flex justify-center items-center min-h-screen '>
             <div className="card bg-base-100 w-full max-w-sm  shrink-0 shadow-2xl p-10">
              <h2 className='font-bold text-2xl text-center'>Create an account now</h2>
             <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <fieldset className="fieldset">
                <label className="label">Name</label>
            <input type="text" {...register('name')}  className="input" placeholder="Name" required />
                     {/* PhotoUrl */}
          <label className="label">Photo URL</label>
            <input type="text" {...register('photo')} className="input" placeholder="Photo URL" required />
               <label className="label">Email</label>
                 <input type="email" {...register('email')}  className="input" placeholder="Email" required />
               <label className="label">Password</label>
                  <input type="password" {...register('password',{
                    required:true,
                    minLength:6,
                    pattern:/(?=.*[a-z])(?=.*[A-Z]).{6,}/,
                    
                  })} className="input" placeholder="Password"  />

                 {
                    errors.password?.type==="required" && 
                    <p className='text-red-500'>Password is required</p>
                    
                    
                  }

                     {
                    errors.password?.type==="minLength" && 
                    <p className='text-red-500'>Password must be atleast 6 characters</p>
                    
                    
                  }

                      {
                    errors.password?.type==="pattern" && 
                    <p className='text-red-500'>Password must be one uppercase letter, one lowercase letter and password must be at least 6 characters</p>
                    
                    
                  }
         
          <button type='submit' className="btn btn-neutral mt-4">Register</button>
          <p className='font-semibold text-center pt-5'>Already have an account ?
            <Link className='text-red-500' to="/login">Login</Link> </p>
        </fieldset>

                 {/* <p className='text-center font-semibold'>Or</p> */}
  {/* <div  className='border border-black py-2 font-semibold cursor-pointer flex items-center justify-center gap-2'><FcGoogle />Login With Google</div> */}


  
    
       
      </form>
   

  
    </div>
      
            
        </div>
    )
}

export default Register;