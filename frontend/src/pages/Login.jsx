import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {

  const [currentState, setCurrentState] = useState("Sign Up");
  const {backend_url,navigate,token,setToken} = useContext(ShopContext)
  const [name,setName] = useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]= useState('')

  const onSubmitHandler = async (event)=>{
    event.preventDefault()
    try {
      
      if(currentState === 'Sign Up'){
        const response = await axios.post(backend_url + '/api/user/register',{name:name,email:email,password:password});
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem("token",response.data.token)
        }else{
          toast.error(response.data.message)
        }

      }else{

        const response = await axios.post(backend_url + '/api/user/login',{email:email,password:password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem("item",response.data.token);
        }
        else{
          toast.error(response.data.message);
        }

      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }

   }
     useEffect(()=>{
     if(token){
       navigate('/')
     }
    },[token])
  return (
    <form onSubmit={onSubmitHandler} className=" flex flex-col items-center w-[90%] sm:max-w-100 m-auto mt-14 gap-4 text-gray-800">
      <div className=" inline-flex items-center gap-2">
        <p className="prata-regular  text-xl sm:text-3xl">{currentState}</p>
        <hr  className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"/>
      </div>
    {currentState === 'Login' ? '': <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className="w-full border border-gray-800 px-3 py-2" placeholder="Name" required />}
      <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className="w-full border border-gray-800 px-3 py-2" placeholder="Email"required  />
      <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className="w-full border border-gray-800 px-3 py-2" placeholder="Password" required />
      <div className="flex justify-between w-full mt-[-8px]">
      <p className="cursor-pointer">Forgot your password</p>
      {
        currentState === 'Login'
        ? <p className="cursor-pointer" onClick={()=>setCurrentState('Sign Up')}>Create account</p>
        : <p className="cursor-pointer" onClick={()=>setCurrentState('Login')}>Login here</p>
      }
      </div>
      <button className="text-sm bg-black text-white px-10 mt-4 py-2">{currentState === 'Login'? 'Sign In':'Sign Up'}</button>
    </form>
  );
}

export default Login;
