import React from 'react'
import logo from '../assets/logo.png'

const Navbar = ({setToken}) => {
  return (
    <div className='flex  justify-between py-2 px-[4%]'>
        <img  className='w-[max(10%,80px)]' src={logo} alt="" />
        <button onClick={()=>setToken('')} className='bg-gray-600 text-white  px-7 py-1 rounded-full sm:px-10 sm:py-0 text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar