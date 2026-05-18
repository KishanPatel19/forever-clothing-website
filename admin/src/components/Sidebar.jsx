import React from 'react'
import {NavLink} from 'react-router-dom'
import add from '../assets/add.png'
import list from '../assets/list.png'
import order from '../assets/order.svg'

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2 border-gray-400'>
        <div className='flex flex-col gap-6 pt-6 pl-[20%]'>
            <NavLink className='flex gap-3 border border-gray-300 border-r-0 rounded-1 items-center px-3 py-2'  to={'/add'} >
                <img className='w-5 h-5 ' src={add} alt="" />
                <p className='hidden md:block'>Add Products</p>
            </NavLink>

               <NavLink className='flex gap-3 border border-gray-300 border-r-0 rounded-1 items-center px-3 py-2'  to={'/list'} >
                <img className='w-5 h-5 ' src={list} alt="" />
                <p className='hidden md:block'>All Products</p>
            </NavLink>

               <NavLink className='flex gap-3 border border-gray-300 border-r-0 rounded-1 items-center px-3 py-2'  to={'/orders'} >
                <img className='w-7 h-7 ' src={order} alt="" />
                <p className='hidden md:block'>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar