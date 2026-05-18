import React from 'react'
import logo from '../assets/logo.png'

const Navbar = () => {
  return (
    <div className='flex  justify-between py-2 px-[4%]'>
        <img  className='w-[max(10%,80px)]' src={logo} alt="" />
        <button className='bg-gray-600 text-white  px-5 py-2 rounded-full sm:px-7 sm:py-3 text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar