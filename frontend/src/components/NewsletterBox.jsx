import React from 'react'

function NewsletterBox() {

    const onSubmitHandler =(event)=>{
        event.preventDefault
    }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-700'>Subscribe now & get 20% off</p>
        <p className='text-gray-400'>Be our subscriber and get exclusive coupons</p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center mx-auto my-6 border pl-3' >
            <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email here ' required />
            <button type='submit'  className='text-white bg-black text-xs px-10 py-4'>SUBSCRIBE</button>

        </form>
    </div>
  )
}

export default NewsletterBox