import React from 'react'

function Collection() {
  return (
    <div className=' flex flex-col sm:flex-row border-t border-gray-300 pt-10 gap-1 sm:gap-10 '>
      {/* filter options */}
      <div className='min-w-60'>
        <p className='text-xl  my-2 flex items-center gap-2'>FILTERS</p>
        <div className='border pl-5 mt-6 py-3 border-gray-300 '>
        <p className='text-sm mb-3 font-medium'>CATEGORIES</p>
         <div className='flex  gap-2 flex-col font-light text-gray-700 text-sm'>
        <p className='flex  gap-2'>
            <input  type="checkbox" value={'Men'} className='w-3' />Men
        </p>
        <p className='flex gap-2'>
          <input type="checkbox" value={'Women'} className='w-3' />Women
        </p>
        <p className='flex gap-2'>
          <input type="checkbox" value={'Kids'} />Kids
        </p>
        </div>
        </div>
       

      </div>
    </div>
  )
}

export default Collection