import React from 'react'
import logo from '../assets/logo.png'

function Footer() {
  return (
    <div>
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40'>
        <div>
            <img  className='w-36 mb-5' src={logo} alt="" />
            <p className='text-sm text-gray-600 w-full md:w-2/3'>At Forever, we offer a wide range of fashionable clothing for men, women, and children. Our collections combine comfort, quality, and modern trends, ensuring you always look your best. Discover outfits designed for every occasion, making style effortless for the entire family.</p>
        </div>
        <div >
            <p className='font-medium mb-5 text-xl'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div>
            <p  className='font-medium mb-5 text-xl'>GET IN TOUCH</p>
            <ul className=' flex flex-col gap-1 text-gray-600'>
                <li>+1-232-456-1234</li>
                <li>contact@forever.com</li>
            </ul>
        </div>
    </div>
    <div >
        <hr />
        <p className='text-sm text-center py-5'>Copyright 2026@ forever.com - All Right Reserved.</p>
    </div>
    </div>
    
  )
}

export default Footer