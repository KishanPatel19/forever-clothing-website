import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

function LatestColllection() {

    const {products} =useContext(ShopContext)
    
    const [latestCollection , setLatestCollection] = useState([])

    useEffect(()=>{
        setLatestCollection(products.slice(0,10))
        // console.log("latestCollection updated", latestCollection)
    }, [products])

  return (
    <div className='my-10'>
        <div className='py-8 text-center text-3xl'>
            <Title text1={'LATEST'} text2={'COLLECTION'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>"Step into the latest trends with our curated collection blending style, comfort, and everyday versatility."</p>
        </div>
        {/* rendering latest products */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
            latestCollection.map((item,index)=>(
                <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))
        }
        </div>
    </div>
  )
}

export default LatestColllection