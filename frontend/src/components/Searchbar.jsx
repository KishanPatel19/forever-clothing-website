import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import search1 from '../assets/search.png'
import cross from '../assets/cross.png'
import { useLocation } from 'react-router-dom';

function Searchbar() {
    const{search,setSearch,showSearch,setShowSearch} =useContext(ShopContext);
    const [visible,setVisible]=useState(false);
    const location= useLocation();

    useEffect(()=>{
        if(location.pathname.includes('collection')){
            setVisible(true)
        }
        else{
            setVisible(false)
        }
    },[location])

  return  showSearch && visible ? (
    <div className='border-t border-b bg-gray-50 text-center '>
        <div className='border border-gray-400 py-2 px-5 mx-3 my-5 rounded-full w-3/4 sm:w-1/2 inline-flex items-center justify-between'>
        
        <input value={search} onChange={(e)=>setSearch(e.target.value)} type="text" className='outline-none text-sm bg-inherit' placeholder='Search' />
        <img src={search1} className='w-4' alt="search icon" />
        </div>
        <img src={cross} onClick={()=>setShowSearch(false)} className='w-3 inline cursor-pointer' alt="" />
    </div>
  ):null
}

export default Searchbar