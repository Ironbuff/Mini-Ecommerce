'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { toast } from 'react-toastify'
import { useState } from 'react'
import { IoEyeSharp } from 'react-icons/io5'
import { FaEyeSlash } from 'react-icons/fa'
import axios from 'axios'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string()
  .min(6)
  .regex(/[a-z]/,"Must Contain atleast one Small letter")
  .regex(/[A-Z]/,"Must Contain atleast one Capital Letter")
  .regex(/[!@#$%^]/,"Must Contain atleast one specialCharacter"),
  username:z.string()
})

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
 
 

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      username:'',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await axios.post(`https://api.freeapi.app/api/v1/users/register`,values, {
        headers:{
            'Content-Type':'application/json'
        }
      })
     if(result.status===201){
      toast.success(result?.message)
      
     }
    
  }
  catch(err){
   console.log(err)
  }
}

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-10ch)] px-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Register</CardTitle>
        </CardHeader>
        <CardContent>
          
          
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              
              
              {/* UserName Field */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UserName</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <span
                        className="absolute top-2.5 right-3 text-gray-500 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <IoEyeSharp /> : <FaEyeSlash />}
                      </span>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Remember & Forgot */}
              <div className="flex justify-between text-sm text-muted-foreground">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded-sm" />
                  <span>Remember Me</span>
                </label>
                <Link href="/forget" className="hover:underline hover:text-blue-500">
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full">
               Register
              </Button>

              {/* Register Link */}
              <p className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Login
                </Link>
              </p>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Register
