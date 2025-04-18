import axios from 'axios';
import  { useState } from 'react';
import toast from 'react-hot-toast';
import { BaseURL } from '../../Api';

const Signup = () => {
  const [userinformation , setuserinformation]=useState({
    name:"",
    email:"",
    password:""
  })


function handleChange(e){
  const {name,value} = e.target
  setuserinformation((pre)=>({...pre, [name]:value}))
}
async function handleSubmit(e) {
  e.preventDefault();
  try {
      const response = await axios.post(`${BaseURL}/Api/signup`, userinformation, {
        headers: {
          "Content-Type": "application/json"
       },
    
       
      });
      console.log(response)
      if (!response.data.success) {
          
          toast.error(response.data.message || "Email Already Registered");
      } else {
          
          toast.success(response.data.message);
      }

  } catch (error) {

      toast.error("Signup Failed: " + error.message);
      
  }

  }
  return (
  
      <>
      <div>
        <dialog id="signup_modal" className="modal">
          <div className="modal-box">
            <form onSubmit={handleSubmit} method="dialog">
            <button
  type="button"
  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
  onClick={() => document.getElementById("signup_modal").close()} // Close modal manually
>
  ✕
</button>

              <h3 className="font-bold text-lg">Sign Up</h3>

              <div className='mt-4 space-y-2'>
                <span>Name</span>
                <br />
                <input
                  onChange={handleChange}
                  type='text'
                  name='name'
                  value={userinformation.name}
                  placeholder='Enter Name'
                  className='w-80 px-3 py-1 border rounded-md outline-none'
                />
              </div>

              <div className='mt-4 space-y-2'>
                <span>Email</span>
                <br />
                <input
                  onChange={handleChange}
                  type='email'
                  name='email'
                  value={userinformation.email}
                  placeholder='Enter Email'
                  className='w-80 px-3 py-1 border rounded-md outline-none'
                />
              </div>

              <div className='mt-4 space-y-2'>
                <span>Password</span>
                <br />
                <input
                  onChange={handleChange}
                  type='password'
                  name='password'
                  value={userinformation.password}
                  placeholder='Enter Password'
                  className='w-80 px-3 py-1 border rounded-md outline-none'
                />
              </div>

              <div className='mt-4 flex justify-around items-center'>
                <button type='submit' className='cursor-pointer px-5 py-2 rounded-md bg-pink-500 text-white'>
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default Signup;