import React, { useEffect, useState } from 'react';
import { Label, TextInput, Button } from 'flowbite-react'
import { MdEmail, MdOutlinePassword } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux'
import { adminLogin } from '../../redux/actions/authAction.js';
import { useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '../../helper/toastify.js'

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { admin, error, loading } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors({
      ...errors,
      [e.target.name]: ''
    });
  };

  const submitHandler = (e) => {
    e.preventDefault()

    let tempError = {
      email: '',
      password: '',
    }
    let valid = true;

    if (!formData.email) { tempError.email = 'Email is required!'; valid = false; }

    if (!formData.password) { tempError.password = 'Password is required!'; valid = false; }

    setErrors(tempError);
    if (!valid) return;

    dispatch(adminLogin(formData));
  }

  useEffect(() => {
    if (error) errorToast(error)

    if (admin) {
      successToast('login successfully!');
      navigate('/dashboard');
      return;
    }
  }, [admin, error, navigate])

  return (
    <div className='bg-slate-20 min-h-screen bg-gradient-to-tr from-teal-400 via-gray-500 to-teal-400'>

      <div className=' w-[400px] mx-auto pt-28 p-2'>
        <form onSubmit={submitHandler} className="flex max-w-md flex-col gap-4">
          <h1 className='text-center text-3xl font-bold text-white'>Welcome Back!</h1>
          <h3 className='text-center text-teal-100 font-semibold'>Login to continue </h3>

          {/* email */}
          <div className="mb-2 block">
            <Label className='text-white '>Email</Label>
            <TextInput icon={() => <MdEmail className='text-teal-600' />} type="text" placeholder="example@gmail.com"
              onChange={changeHandler} name='email' value={formData.email} />
            {errors.email && <p className="text-yellow-400 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* password */}
          <div className="mb- block">
            <Label className='text-white'>Your password</Label>

            <div className='relative'>
              <TextInput icon={() => <MdOutlinePassword className='text-teal-600' />} type={show ? 'text' : "password"} placeholder='••••••••'
                onChange={changeHandler} name='password' value={formData.password} />

              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600 dark:text-gray-300"
                onClick={() => setShow(!show)}>
                {show ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && <p className="text-yellow-400 text-xs mt-1">{errors.password}</p>}
          </div>

          <Button className={`mt-2 tansition duration-100 ${loading ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-teal-700 hover:bg-teal-800'}`} type="submit">
            {loading ? "Processing..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login;
