import React from 'react';
import { useNavigate } from 'react-router';



const Errorpage = () => {

    const navigate=useNavigate();

    const goback = ()=>{
        navigate("/");
    }
    

    
    return (
        <div >
            
            <div className='flex justify-center items-center'>
            <div>
                <img className='h-[700px]' src="/errors.png" alt="" />
                <h1 className='text-2xl font-bold text-center'>Oops! The page you are looking for doesn't exist</h1>
                <button onClick={goback} className="btn btn-info block mx-auto mt-4">Go Back Home</button>
                
            </div>

            </div>
            
            
        </div>
    );
};

export default Errorpage;