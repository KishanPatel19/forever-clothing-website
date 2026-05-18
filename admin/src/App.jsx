import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

export const App = () => {
  return (
    <div className='bg-gray-50 min-h-screen'>
      <>
          <Navbar />
          <hr className='border-gray-400'/>
          <div className='flex w-full'>
          <Sidebar />
          </div>
      
      </>

    </div>
  )
}

export default App