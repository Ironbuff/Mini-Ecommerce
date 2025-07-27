import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  
 const navitems = [
    {id:1, name:"Product", links:"/product" },
    {id:2, name:"Cart", links:"/cart"},
    {id:3, name:"Order", links:"/order"},
    {id:4, name:"login", links:"/login"}
 ] 
  
 return (
    <div className='flex items-center justify-between h-[8ch] bg-neutral-800 px-28'>
        <div className='flex items-center justify-center'>
            <h1 className='text-2xl font-mono text-red-400'>
               <Link href={"/home"}>Mini Ecommerce</Link> 
            </h1>
        </div>
        <div className='flex flex-row items-center justify-center gap-x-5 text-lg'>
            {
                navitems.map((item)=>(
                    <Link href={item.links} key={item.id} className='font-semibold text-neutral-300 leading-relaxed'>
                        {item.name}
                    </Link>
                ))
            }
        </div>
    </div>
  )
}

export default Navbar