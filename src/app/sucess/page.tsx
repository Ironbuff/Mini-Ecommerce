'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { CiCircleCheck } from 'react-icons/ci'


const Sucess = () => {
  
  
  const router = useRouter()
  
    const gotologin = async()=>{
    try{
          router.push('/login')
    }
    catch(err){
        console.log(err)
    }
  }
  
  
    return (
    <div className='w-full h-[calc(100vh-10ch)] justify-center items-center flex flex-col gap-y-2'>
              <CiCircleCheck onClick={(gotologin)} size={300} className='text-center hover:scale-105 transition-all ease-in-out duration-300 text-green-500' />
            <p className='text-2xl text-center'>
                You Have Sucessfully login to the System.
                <br></br>Please Click the Check Button to go to Login Section
            </p>
    </div>
  )
}

export default Sucess