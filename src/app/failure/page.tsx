'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import {  CiCircleRemove } from 'react-icons/ci'


const Faliure = () => {
  
  
  const router = useRouter()
  
    const gotoregister = async()=>{
    try{
          router.push('/register')
    }
    catch(err){
        console.log(err)
    }
  }
  
  
    return (
    <div className='w-full h-[calc(100vh-10ch)] justify-center items-center flex flex-col gap-y-2'>
              <CiCircleRemove  onClick={(gotoregister)} size={300} className='text-center hover:scale-105 transition-all ease-in-out duration-300 text-red-500' />
            <p className='text-2xl text-center'>
                Failed to register to the System
                <br></br>Please Click the Wrong Button try to register again
            </p>
    </div>
  )
}

export default Faliure