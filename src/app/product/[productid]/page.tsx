'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import axios from 'axios'
import { Badge } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'


interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
}

const ProductDetail = () => {
  
  const params = useParams()
  const id = params?.productid as string
  const [product, setProduct] = useState<Product>([])

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return

      try {
        const response = await axios.get(`https://api.freeapi.app/api/v1/public/randomproducts/${id}`)
        setProduct(response?.data?.data)
      } catch (error) {
        console.error("Error fetching product:", error)
      }
    }

    fetchData()
  }, [id])

  const handleCart = async(id:any)=>{
    const response = await axios.post(`https://api.freeapi.app/api/v1/ecommerce/cart/item/${id}`)
    console.log(response)
  }

  return (
    <div>
       <div className="max-w-xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>{product?.title}</CardTitle>
          <CardDescription>{product?.brand} • {product?.category}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <img src={product?.thumbnail} alt={product?.title} className="w-full h-64 object-cover rounded-lg" />
          <p className="text-gray-700">{product?.description}</p>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">${product.price}</span>
            <Badge variant="outline-primary">-{product?.discountPercentage}%</Badge>
          </div>
          <div className="text-sm text-muted-foreground">Stock: {product?.stock} | Rating: {product.rating}</div>
          <Button
          onClick={()=>handleCart(product?.id)}
          >Add to Cart</Button>
        </CardContent>
      </Card>
    </div>
      
    </div>
  )
}

export default ProductDetail
