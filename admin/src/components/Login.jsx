import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backend_url } from '../App'
import {toast} from 'react-toastify'

const Login = ({setToken}) => {
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')

    const onSubmitHandler = async(e)=>{
        try {
            e.preventDefault()
            const response = await axios.post(backend_url + '/api/user/admin',{email,password})
            if(response.data.success){
                  setToken(response.data.token)
            }else{
                toast.error(response.data.message)
            }
          
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
  return (
    <div className=' min-h-screen w-full flex items-center justify-center'>
        <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
            <h1 className='font-bold text-2xl mb-4'>Admin Panel</h1>
            <form onSubmit={onSubmitHandler}>
            <div>
                <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='w-full rounded-b-md border border-gray-300 px-3 py-2' type="email" placeholder='your@gmail.com' required />
            </div>
            <div>
                <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} className='w-full rounded-b-md border border-gray-300 px-3 py-2' type="password" placeholder='Enter your password'  required />
            </div>
            <button className='w-full bg-black text-white  mt-4 rounded-md px-4 py-2' >Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login