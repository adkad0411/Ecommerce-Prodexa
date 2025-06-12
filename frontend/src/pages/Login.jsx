import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState,setCurrentState]=useState('Login');
  const {token,setToken,navigate,backendUrl}=useContext(ShopContext)
  const intialStates={name:'',email:'',password:''}
  const [credentials,setCredentials]=useState(intialStates);
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setCredentials({...credentials,[name]:value});
  }
  const handleSubmit=async(e)=>{
    e.preventDefault(); 
    try{
      if(currentState==='Sign Up'){
        const response=await axios.post(backendUrl+'/api/user/register',{name:credentials.name,email:credentials.email,password:credentials.password});
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token',response.data.token)
        }else{
          toast.error(response.data.message)
        }

      }else{
        const response=await axios.post(backendUrl+'/api/user/login',{email:credentials.email,password:credentials.password});
        if(response.data.success){
          console.log(response.data)
          setToken(response.data.token);
          localStorage.setItem('token',response.data.token) 
        }else{
          toast.error(response.data.message)
        }
      }
    }catch(error){
      toast.error(error.response?.data?.message)
    }
  }

  useEffect(()=>{
    if(token){
      navigate('/');
    }
  },[token])
  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr  className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      {currentState==='Sign Up' 
      &&
      <input required type="text" name='name' onChange={handleChange} className='w-full px-3 py-2 border border-gray-800' placeholder='Name' />}
      <input required type="email" name='email' onChange={handleChange} className='w-full px-3 py-2 border border-gray-800' placeholder='Email' />
      <input required type="password" name='password' onChange={handleChange} className='w-full px-3 py-2 border border-gray-800' placeholder='Password' />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot your password?</p>
        {currentState==='Login'?
        <p  onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Create Account</p>:
        <p  onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login Here</p>}
      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState==='Login'?'Sign In':'Sign Up'}</button>
  </form>
  )
}

export default Login
