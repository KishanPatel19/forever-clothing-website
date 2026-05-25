import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backend_url, currency } from '../App';
import { useEffect } from 'react';
import {toast} from 'react-toastify'
import order_img from '../assets/order.svg'


const Orders = ({token}) => {
  const [orders,setOrders] = useState([]);

  const fethAllOrders = async()=>{
    if(!token){
      return null;
    }
    try {
      const response = await axios.post(backend_url + '/api/order/list',{},{headers:{token}});
     if (response.data.success){
      console.log(response.data.orders)
      setOrders(response.data.orders)
     }
     else{
        toast.error(response.data.message)
     }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  const statusHandler= async(event ,orderId)=>{

    try {
      const response = await axios.post(backend_url + '/api/order/status',{orderId,status:event.target.value},{headers:{token}})
      if(response.data.success){
        await fethAllOrders()
        toast.success(response.data.message )
      }
      
    } catch (error) {
            console.log(error)
      toast.error(error.message)
    }

  }
  useEffect(()=>{
    fethAllOrders();
  },[token])
  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {
          orders.map((order, index)=>(
            <div  className='grid grid-cols-1 sm:grid-cols-[0.5fr_1fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 border-2 my-3 md:my-4 p-5 md:p-8 items-start text-xs sm:text-sm border-gray-200 text-gray-700' key={index}>
               <img className='w-12' src={order_img} alt="" /> 
               <div>
               <div>
                {
                  order.items.map((item,index)=>(
                    <div key={index}>
                      <p className='py-0.5'>{item.name} x {item.quantity} <span>{item.size}</span></p>
                    </div>
                  ))
                }
               </div>
               <p className='mt-3 mb-2  text-sm sm:text-[15px]'>{order.address.firstName + " "+ order.address.lastName}</p>
               <div>
                <p>{order.address.street + " ,"}</p>
                <p>{order.address.city + " , " + order.address.state + " , " + order.address.country + " , "+ order.address.zipcode}</p>
               </div>
               <p>{order.address.phone}</p>
               </div>
               <div>
                <p className='text-sm font-medium sm:text-[15px]'>Items  : {order.items.length}</p>
                <p className='mt-3'>Method : {order.paymentMethod}</p>
                <p>Payment : {order.payment ? 'Done ': "Panding"}</p>
                <p>Date : {new Date(order.date).toLocaleDateString()}</p>
               </div>
               <p className='text-sm  sm:text-[15px]'>{currency}{order.amount}</p>
               <div>
               <select onChange={(event)=>statusHandler(event,order._id)} value={order.status} className='p-2 font-semibold'>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
               </select>
               </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}// fix deploy

export default Orders