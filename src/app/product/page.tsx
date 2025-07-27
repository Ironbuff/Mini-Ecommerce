'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductPage from './components/ProductPage'

const Products = () => {


const [products,setProducts] = useState([])
  
 useEffect(() => {
   const fetch = async()=>{
    const response = await axios.get('https://api.freeapi.app/api/v1/public/randomproducts',{
        headers:{
            'Content-Type':'application/json'
        }
    })
    setProducts(response?.data?.data?.data)
   }
   fetch()
 }, [])

 console.log("New Product",{products})
 
  
    return (
    <div>
        <ProductPage
        product={products}
        />
    </div>
  )
}

export default Products