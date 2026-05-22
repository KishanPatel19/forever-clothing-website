import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/cartTotal'
import stripe from '../assets/stripe.png'
import razorpay from '../assets/razorpay.png'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function PlaceOrder() {
  const {navigate,backend_url,cartItems,setCartItems,products,delivery_fee,  getCartAmount,token} = useContext(ShopContext)
  const [method,setMethod] = useState('cod')
  const [formData,setFormData] = useState({
    firstName:"",
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''

  })

  const onChnageHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;

    setFormData(data=>({...data,[name]:value}))
  }

  const onSubmitHandler = async(event)=>{
    event.preventDefault();
    try {
        const orderItems = []

        for(const items in cartItems){
          for(const item in cartItems[items]){
            if(cartItems[items][item] > 0){
              const itemInfo = structuredClone(products.find(product=>product._id === items))
              if(itemInfo){
                itemInfo.size = item
                itemInfo.quantity = cartItems[items][item]
                orderItems.push(itemInfo)
              }
            }
          }
        }
        const orderData = {
          items:orderItems,
          address:formData,
          amount:getCartAmount()+delivery_fee
        }
        switch(method){
          case 'cod':
            const response = await axios.post(backend_url + '/api/order/place',orderData,{headers:{token}});
            console.log(response);
            if(response.data.success){
              setCartItems({});
              navigate('/orders')
              toast.success(response.data.message)
            }else{
              toast.error(response.data.message)
            }
            break;

            default:

            break;
        }

    } catch (error) {
      
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* ----------Left Side----------  */}
      <div className='flex flex-col  gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title  text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>
        <div className='flex gap-3'>
          <input  required onChange={onChnageHandler} name='firstName' value={formData.firstName} type="text" placeholder='First Name ' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' />
          <input  required onChange={onChnageHandler} name='lastName' value={formData.lastName} type="text" placeholder='Last Name' className='border border-gray-300  rounded py-1.5 px-3.5 w-full' />
        </div>
        <input  required onChange={onChnageHandler} name='email' value={formData.email} type="email" placeholder='Email Address ' className='border border-gray-300 rounded py-1.5 px-3.5' />
        <input  required type="text" placeholder='Street ' className='border border-gray-300 rounded py-1.5 px-3.5' />
          <div className='flex gap-3'>
          <input required  onChange={onChnageHandler} name='city' value={formData.city} type="text" placeholder='City ' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' />
          <input required  onChange={onChnageHandler} name='state' value={formData.state} type="text" placeholder='State' className='border border-gray-300  rounded py-1.5 px-3.5 w-full' />
        </div>
          <div className='flex gap-3'>
          <input required  onChange={onChnageHandler} name='zipcode' value={formData.zipcode} type="number" placeholder='Zipcode ' className='border border-gray-300 rounded py-1.5 px-3.5 w-full ' />
          <input required  onChange={onChnageHandler} name='country' value={formData.country} type="text" placeholder='Country' className='border border-gray-300  rounded py-1.5 px-3.5 w-full' />
        </div>
          <input required  onChange={onChnageHandler} name='phone' value={formData.phone} type="number" placeholder='Phone' className='border border-gray-300  rounded py-1.5 px-3.5 w-full' />
         
      </div>
       {/* --------------Right Side-------------  */}
          <div className='mt-8'>
            {/* -------cart total ------ */}
            <div className='mt-8  min-w-80'>
              <CartTotal />
            </div>
            <div className='mt-12'>
              <Title text1={'PAYMENT'} text2={'METHOD'}/>
              <div className='flex flex-col gap-3 lg:flex-row'>
                <div onClick={()=>setMethod("stripe")} className='flex items-center p-2 px-3 border border-gray-300 cursor-pointer'>
                  <p className={`min-w-3.5 h-3.5 border border-gray-300 rounded-full ${method === 'stripe'?'bg-green-400':''}`}></p>
                  <img src={stripe} className='h-5 mx-4' alt="" />
                </div>
                <div onClick={()=>setMethod("razorpay")} className='flex items-center gap-3 p-2 px-3 border border-gray-300 cursor-pointer' >
                  <p className={`min-w-3.5 h-3.5 border rounded-full border-gray-300 ${method === 'razorpay'?'bg-green-400':''}`}></p>
                  <img src={razorpay} className='h-5 mx-4' alt="" />
                </div>
                <div onClick={()=>setMethod("cod")} className='flex items-center gap-3 p-2 px-3 border border-gray-300 cursor-pointer' >
                  <p className={`min-w-3.5 h-3.5 border rounded-full border-gray-300 ${method === 'cod'?'bg-green-400':''}`}></p>
                  <p className='text-sm text-gray-500 mx-4 font-medium'>CASH ON DELIVERY</p>
                </div>
              </div>
              <div className='w-full mt-8 text-end'>
                <button type='submit'  className='bg-black text-white px-16 py-3 cursor-pointer text-sm'>PLACE ORDER</button>
              </div>
            </div>
          </div>
   </form>
  )
}

export default PlaceOrder