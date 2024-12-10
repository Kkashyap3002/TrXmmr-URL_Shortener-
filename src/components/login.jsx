import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { BeatLoader } from 'react-spinners'

const Login = () => {
  return (
    <Card className="rounded-3xl">
  <CardHeader>
    <CardTitle>Login</CardTitle>
    <CardDescription>to your account if you already have one</CardDescription>
  </CardHeader>
  <CardContent className="space-y-2">
    <div className='spacce-y-1'>
      <input className=" text-blue-900" name='email' type="email" placeholder='Enter Email' />
    </div>
    <div className='spacce-y-1'>
      <input className=" text-blue-900" name='password' type="password" placeholder='Enter Password' />
    </div>
  </CardContent>
  <CardFooter>
    <button>
      {true? <BeatLoader size={10} color='#36d7b7'/>:"Login"}
      Login
    </button>
  </CardFooter>
</Card>

  )
}

export default Login