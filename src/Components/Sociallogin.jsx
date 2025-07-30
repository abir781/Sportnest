
import React from 'react';
import { use } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Authcontext } from '../Context/Authcontext';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import useAxios from '../hooks/useAxios';

const Sociallogin = () => {
  const { signinwithgoogle } = use(Authcontext);
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const handlegooglesignin = () => {
    signinwithgoogle()
      .then(async (result) => {
        const user = result.user;
        const userInfo = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          role: 'user', // default role
          created_at: new Date().toISOString(),
        };

        // Save to database (only once, ideally backend checks for duplicates)
        try {
          await axiosInstance.post('/users', userInfo);
          toast.success('Login successful');
          navigate('/');
        } catch (error) {
          // If already exists or error saving
          console.error('Error saving user:', error);
          toast.success('Login successful');
          navigate('/');
        }
      })
      .catch((error) => {
        console.error(error);
        toast.warning('Google sign-in failed');
      });
  };

  return (
    <div
      onClick={handlegooglesignin}
      className="border border-black py-2 font-semibold cursor-pointer flex items-center justify-center gap-2"
    >
      <FcGoogle /> Login With Google
    </div>
  );
};

export default Sociallogin;
