import React from 'react'
import exchange from '../assets/exchange.png'
import return1 from '../assets/return.png'
import support from '../assets/support.png'

function OurPolicy() {
  return (
    <div className='flex flex-col sm:flex-row gap-12 sm:gap-2 justify-around text-xs py-20 sm:text-sm md:text-base'>
        <div className='text-center '>
        <img className='w-12 m-auto mb-5' src={exchange} alt="" />
        <p className='font-medium'>Easy Exchange Policy</p>
        <p className='text-gray-400'>We offer hassle free exchange policy</p>
        </div>
        <div className='text-center'>
        <img  className='w-12 m-auto mb-5' src={return1} alt="" />
        <p className='font-medium'>7 Days Return Policy</p>
        <p className='text-gray-400'>We provide 7 days free return policy</p>
        </div>
        <div className='text-center'>
        <img className='w-12 m-auto mb-5' src={support} alt="" />
        <p className='font-medium'>Best customer support </p>
        <p className='text-gray-400'>we provide 24/7 customer support</p>
        </div>
    </div>
  )
}

export default OurPolicy