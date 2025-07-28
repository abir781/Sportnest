import React from 'react';
import { Facebook,  Instagram,  Youtube } from 'lucide-react';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <div className='bg-[#7fccfa] py-15'>
            <div className='grid grid-cols-1 gap-5 justify-items-center lg:grid-cols-3 lg:justify-items-center items-center w-11/12 mx-auto border-b border-white pb-20'>
                  <div className='flex gap-2 items-center'>

                    <img className='w-14 h-14 rounded-full' src="/logo.png" alt="" />
                    <h1 className='text-2xl font-bold text-white'>SportNest</h1>

                </div>

               
                <div className='text-white'>
                    <h2 className='text-2xl font-bold '>Follow Us</h2>
                    <div className='flex gap-5'>
                    <a href="https://www.facebook.com/profile.php?id=61554893068010" target="_blank">
                    <Facebook color="#01ACFF" />
                    </a>
                    
                     <a href="https://www.instagram.com/abirhasan7691/" target="_blank">
                     <Instagram color='#ff0059' />
                       </a>
                      <a href="https://www.youtube.com/@WhateverComestoMind-qk2nl" target="_blank">
                      <Youtube color="#ff0000" />

                       </a>

                    </div>
                 
                </div>
                <div className='text-white'>
                       <h1  className='text-2xl font-bold  text-center'>Contact Us</h1>
                       <h2 className='text-xl font-bold  text-center'>Mobile: 01871917336</h2>
                        <h2 className='text-xl font-bold  text-center'>Email: hasan.abir3176@gmail.com</h2>
                       

                </div>
            </div>
            <div className='flex gap-5 text-center justify-center items-center pt-10 text-white'>
                <a className=' text-2xl font-bold' href="">Privacy Policy</a>
                <a className=' text-2xl font-bold' href="">Terms and Conditions</a>
                <a className=' text-2xl font-bold' href="">Copyright 2025-all rights reserved</a>
            </div>
          
            
        </div>
    );
};

export default Footer;