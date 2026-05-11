import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { Link, NavLink } from 'react-router-dom'
import search from '../assets/search.png'
import profile from '../assets/profile.png'
import cart from '../assets/cart.png'
import menu from '../assets/menu.png'
import back from '../assets/back.png'
import { ShopContext } from '../context/ShopContext'
function Navbar() {

    const{setShowSearch} = useContext(ShopContext)

    const [visible , setVisible]= useState(false)
  return (
    <div className='flex items-center justify-between py-5 font-medium'>
        <Link to='/'><img src={logo} className='w-36' alt="logo" /></Link> 
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink to='/' className='flex flex-col items-center gap-1'>
                <p>HOME</p>
                <hr className='w-2/4  h-[1..5px] bg-gray-700 hidden'   />
            </NavLink>
              <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                <p>COLLECTION</p>
                <hr className='w-2/4  h-[1..5px] bg-gray-700 hidden'  />
            </NavLink>
              <NavLink to='/about' className='flex flex-col items-center gap-1'>
                <p>ABOUT</p>
                <hr className='w-2/4  h-[1..5px] bg-gray-700 hidden'  />
            </NavLink>
              <NavLink to='/contact' className='flex  flex-col items-center gap-1'>
                <p>CONTACT</p>
                <hr className='w-2/4  h-[1..5px]  bg-gray-700 hidden'  />
            </NavLink>
          
        </ul>
        <div className='flex items-center gap-6'>
            <img src={search} onClick={()=>setShowSearch(true)} className='w-5 cursor-pointer' alt="search icon" />
            <div className='group relative'>
                <img src={profile} className='w-5 cursor-pointer' alt="" />
                <div className='group-hover:block hidden absolute right-0 pt-4 dropdown-menu'>
                    <div className='flex flex-col py-3 px-5 w-36 bg-slate-100 text-gray-500 rounded'>
                        <p className='cursor-pointer hover:text-black'>My Profile</p>
                        <p className='cursor-pointer hover:text-black'>Orders</p>
                        <p className='cursor-pointer hover:text-black'>Logout</p>
                    </div>
                </div>
            </div>

            <Link className='relative' to='/cart'>
                <img src={cart} className='w-5 min-w-5' alt="" />
                <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8.5px]'>10</p>
            </Link>
            <img src={menu} onClick={()=>setVisible(true)} className='w-5 cursor-pointer sm:hidden' alt="" />

        </div>
        <div className={`absolute right-0 top-0 bottom-0 bg-white overflow-hidden transition-all ${visible ? 'w-full':'w-0'}`}>
            <div className='flex flex-col text-gray-600'>
            <div onClick={()=>setVisible(false)}   className= 'flex items-center p-3 gap-6 cursor-pointer'>
                <img src={back} className='h-4 rotate-180' alt="" />
                <p>Back</p>
            </div>
            <NavLink onClick={()=>setVisible(false)} to='/' className='py-3 pl-6 border'>HOME</NavLink>
            <NavLink onClick={()=>setVisible(false)} to='/collection' className='py-3 pl-6 border'>COLLECTION</NavLink>
            <NavLink onClick={()=>setVisible(false)} to='/about' className='py-3 pl-6 border'>ABOUT</NavLink>
            <NavLink onClick={()=>setVisible(false)} to='/contact' className='py-3 pl-6 border'>CONTACT</NavLink>

            </div>
        </div>
    </div>
  )
}

export default Navbar