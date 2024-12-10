import Login from '@/components/login'
import Signup from '@/components/signup'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

const Auth = () => {

      const [searchParams ] = useSearchParams()

  return (
    <div className='mt-36 flex flex-col items-center gap-10'>
      <h1 className='text-5xl font-extrabold text-gray-800'>
      {searchParams.get ("createNew")
      ? "Hold up! Let's login first.."
      : "Login/SignUp"
      }
      </h1>
      <Tabs defaultValue="login" className="w-[400px]">
  <TabsList className="grid w-full grid-cols-2">
    <TabsTrigger className="text-white" value="login">Login</TabsTrigger>
    <TabsTrigger className="text-white "value="SignUp">SignUp</TabsTrigger>
  </TabsList>
    <TabsContent value="login"><Login/></TabsContent>
    <TabsContent value="SignUp"><Signup/></TabsContent>
        </Tabs>

    </div>
  )
}

export default Auth