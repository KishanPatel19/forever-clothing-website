import React, { useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import star from '../assets/star.png'
import dullStar from '../assets/dullStar.png'

function Product() {

    const {productId}=useParams();
    const {products ,currency} = useContext(ShopContext)
    const [productData,setProductData] = useState(false)
    const [image,setImage] = useState('')
    const [size,setSize]=useState('')

    const fetchProductData = async()=>{
      products.map((item)=>{
        if(item._id === productId){
          setProductData(item);
          setImage(item.image[0])
          console.log(item)
          return null;
        }
      
      })
    }

    useEffect(()=>{
      fetchProductData()
     
    },[productId,products])

  return productData? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* --------product details------------ */}
      <div className='flex flex-col gap-12 sm:flex-row sm:gap-12'>
        {/* ---------------products images--------------- */}
        <div className='flex-1 flex flex-col-reverse sm:flex-row gap-3'>
        <div className='flex  sm:flex-col overflow-x-auto overflow-y-scroll justify-between justify-normal sm:w-[18.7%] w-full'>
          {
            productData.image.map((item,index)=>(
              <img src={item} onClick={()=>setImage(item)} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
            ))
          }
        </div>
        <div className='w-full sm:w-[70%]'>
          <img src={image} className='w-full h-auto' alt="" />
        </div>
        </div>
        {/* -------------product info------------  */}
        <div className='flex-1'>
            <h1 className=' text-2xl mt-2 font-medium '>{productData.name}</h1>
            <div className='flex gap-1 items-center mt-2 '>
              <img src={star} alt="" className="w-3 5" />
              <img src={star} alt="" className="w-3 5" />
              <img src={star} alt="" className="w-3 5" />
              <img src={star} alt="" className="w-3 5" />
              <img src={dullStar} alt="" className="w-3 5" />
              <p className='pl-2 '>(122)</p>
          </div>
          <p className='font-medium text-3xl mt-5'>{currency} {productData.price}</p>
          <p className='text-base md:w-2/5 text-gray-500 mt-5 tracking-wider'> {productData.description}</p>
          <div className='flex flex-col gap-4  my-8'>
            <p className='font-medium  tracking-wider'> Select Size</p>
            <div className='flex gap-2'>
              {
                productData.sizes.map((item , index)=>(
                  <button  key={index} onClick={()=>setSize(item)} className={`px-5 py-2  border bg-gray-100 ${item === size ?'border-orange-700 border-2':''}`}>{item}</button>
                ))
              }
            </div>

          </div>
          <button className='bg-black text-white px-7 py-3 active:bg-gray-700 '>ADD TO CART</button>
          <hr className='mt-5 md:w-3/4 border-gray-400'/>
          <div className='mt-5 text-gray-500 text-sm flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
    </div>
  ):<div className='opacity-0'></div>
}

export default Product