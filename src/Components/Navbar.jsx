import { Menu } from 'lucide-react';
import React, {  use, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { Authcontext } from '../Context/Authcontext';
import { toast } from 'react-toastify';
// import { Authcontext } from '../Context/Authcontext';
// import { toast } from 'react-toastify';



const Navbar = () => {
    const [open,setopen]=useState(false);
    const [unlock,setunlock]=useState(false);
    const {user,logout}=use(Authcontext);
    const navigate=useNavigate();
    const handlelogout=()=>{
        
        logout().then(()=>{
            toast.success("User logged out successfully");
            navigate("/");
            
           
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    return (
        <div className=' bg-[#7fccfa] sticky top-0  w-full z-50'>
        <div className='flex items-center justify-between py-6  w-11/12 mx-auto'>
            <div className='flex items-center gap-2'>
                <Menu onClick={()=>setopen(!open)} className='md:hidden '></Menu>
                <ul className={`md:hidden absolute duration-500 z-10 ${open?'top-14':'-top-40'} bg-black text-white`}>
                    <li className='px-2 py-1'><NavLink className={({isActive})=>(isActive?'font-bold ':'')} to="/">Home</NavLink></li>
                    <li className='px-2 py-1 '><NavLink className={({isActive})=>(isActive?'font-bold':'')} to="/courtpage">Courts</NavLink></li>
                    {/* {
                        user && <>

                            <li className='px-2 py-1 '><NavLink className={({isActive})=>(isActive?'font-bold':'')} to="/addfood">Addfood</NavLink></li>
                     <li className='px-2 py-1 '><NavLink className={({isActive})=>(isActive?'font-bold':'')} to="/myitems">Myitems</NavLink></li>
                        
                        </>
                    }
                    */}
                  
                    
                </ul>

                <div className='flex gap-2 items-center'>

                    <img className='w-14 h-14 rounded-full' src="/logo.png" alt="" />
                    <h1 className='text-2xl font-bold text-white'>SportNest</h1>

                </div>
                
                

              

            </div>
            <div>
                <ul className='hidden md:flex md:gap-5 text-white'>
                    <li className=''><NavLink className={({isActive})=>(isActive?'font-bold ':'')} to="/">Home</NavLink></li>
                    <li className=''><NavLink className={({isActive})=>(isActive?'font-bold':'')} to="/courtpage">Courts</NavLink></li>
                    {/* <li className=''><NavLink className={({isActive})=>(isActive?'font-bold':'')} to="/dashboard">Dashboard</NavLink></li> */}
                    {/* {
                        user &&<>
                         <li className=''><NavLink className={({isActive})=>(isActive?'font-bold':'')} to="/addfood">Addfood</NavLink></li>
                    <li className=''><NavLink className={({isActive})=>(isActive?'font-bold':'')} to="/myitems">Myitems</NavLink></li>
                        
                        </>
                    } */}
                   
                 
                   
                </ul>

            </div>
            <div className='flex items-center gap-3'>
                <div className='flex gap-3'>
                    {/* <img className='w-12  rounded-full' src={`${user ? user.photoURL:""}`} title={`${user?user.displayName:""}`} alt="" /> */}
                  

                   {
                    user?<><img onClick={()=>setunlock(!unlock)} className='w-12  rounded-full' src={`${user ? user.photoURL:""}`} title={`${user?user.displayName:""}`} alt="" />
                    
                    <ul className={` absolute duration-500 z-10 ${unlock?'top-18':'-top-40'} bg-blue-500 text-white`}>
                        
                    <li className='px-3 py-2 text-center cursor-pointer hover:bg-blue-900'><p>{user.displayName}</p></li>
                    <li className='px-3 py-2 hover:bg-blue-900'><NavLink className={({isActive})=>(isActive?'font-bold':'')} to="/dashboard">Dashboard</NavLink></li>
                    <li className='px-3 py-2  hover:bg-blue-900 text-center'> <button onClick={handlelogout} className='cursor-pointer' >Logout</button></li>
                   
                    {/* {
                        user && <>

                            <li className='px-2 py-1 '><NavLink className={({isActive})=>(isActive?'font-bold':'')} to="/addfood">Addfood</NavLink></li>
                     <li className='px-2 py-1 '><NavLink className={({isActive})=>(isActive?'font-bold':'')} to="/myitems">Myitems</NavLink></li>
                        
                        </>
                    }
                    */}
                  
                    
                </ul>
                    </>:<>  <Link to='/register' className='btn btn-accent'>Register</Link>
                    <Link to='/login' className='btn btn-accent'>Login</Link></>
                   }
                   
                  
                </div>
        
                

            </div>
            
        </div>

        </div>
      
    );
};

export default Navbar;