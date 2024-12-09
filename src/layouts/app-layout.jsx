import Header from '@/components/header'
import React from 'react'
import { Outlet } from 'react-router-dom'


const AppLayout = () => {
return (
    <div className='min-h-screen bg-gradient-to-tr from-cyan-400 via-teal-500 to-blue-700 
        sm:bg-gradient-to-r from-purple-300 via-pink-400 to-red-500 
        md:bg-gradient-to-bl from-yellow-400 via-orange-500 to-red-600 
        lg:bg-gradient-to-tl from-green-400 via-indigo-500 to-purple-700'>
        <main className=' container  mx-auto  p-4 '>
            <Header />
            <Outlet/>
        </main>
        <div className='p-10 text-center bg-gray-800 text-whit mt-10'>
            Made with 💗 For You :) <br /> 
            <div className='text-yellow-500 font-extralight '>Developed by Kishan 🤞</div>
        </div>
    </div>
  )
}

export default AppLayout