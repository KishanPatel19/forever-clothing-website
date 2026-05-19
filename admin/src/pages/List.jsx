import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { backend_url, currency } from '../App'
import{toast} from 'react-toastify'

const List = () => {

  const [list,setList ] = useState([])

  const fetchList = async()=>{
    
   try {
     const response = await axios.get(backend_url + '/api/product/list')
    if(response.data.success){
        setList(response.data.products)
        
    }
    else{
        toast.error(response.data.message)
    }
   } catch (error) {
    console.log(error);
    toast.error(error.message)
    
   }
  }

  useEffect(()=>{
    fetchList()
  },[])
  return (
    <>
    <p className='mb-2'>All Products List</p>
    <div className='flex flex-col gap-2' >
      {/* --------list table title ------------- */}
      <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] border px-2 py-1 bg-gray-100 text-xs items-center'>
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className='text-center'>Action</b>
      </div>
      {/* ------------product list---------- */}
      {
        list.map((item,index)=>(
          <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] border items-center px-2 py-1 gap-2 text-sm '>
            <img  className='w-12' src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <p className='text-right md:text-center cursor-pointer text-lg'>X</p>
          </div>
        ))
      }
    </div>
    </>
  )
}

export default List