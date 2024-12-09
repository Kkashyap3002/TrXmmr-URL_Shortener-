import Header from '@/components/header'
import React from 'react'
import { Outlet } from 'react-router-dom'


const AppLayout = () => {
return (
    <div>
        <main className='min-h-screen container  mx-auto  p-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500'>
            <Header />
            <Outlet/>
        </main>
        <div className='p-10 text-center bg-gray-800 text-whit mt-10'>
            Made with 💗 For You :) <br /> 
            <div className='text-yellow-500 font-extralight '>Developer Kishan 🤞</div>
        </div>
    </div>
  )
}

export default AppLayout