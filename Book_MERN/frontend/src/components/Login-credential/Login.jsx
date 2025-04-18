import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { BaseURL } from "../../Api";

const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [userinformation, setuserinformation] = useState({
    email: "",
    password: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setuserinformation((pre) => ({ ...pre, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(`${BaseURL}/Api/login`, userinformation, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setIsLoggedIn(true);  // Update the isLoggedIn state directly
        toast.success("Login Successfully");
        navigate("/course");  // Navigate to course page or home after successful login
      }
    } catch (error) {
      toast.error("Login failed: " + error.message);
    }
  }

  return (
    <>
      <div>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form onSubmit={handleSubmit} method="dialog">
              {/* Close button */}
              <button
                type="button"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => document.getElementById("my_modal_3").close()}
              >
                ✕
              </button>

              <h3 className="font-bold text-lg">Login</h3>
              <div className="mt-4 space-y-2">
                <span>Email</span>
                <br />
                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  value={userinformation.email}
                  placeholder="Enter Email"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  required
                />
              </div>
              <div className="mt-4 space-y-2">
                <span>Password</span>
                <br />
                <input
                  onChange={handleChange}
                  type="password"  // Use password type instead of text
                  name="password"
                  value={userinformation.password}
                  placeholder="Enter Password"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  required
                />
              </div>
              <div className="mt-4 flex justify-around items-center">
                <button type="submit" className="px-5 py-2 rounded-md cursor-pointer bg-black text-white">
                  Login
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default Login;
