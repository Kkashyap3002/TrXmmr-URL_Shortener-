import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { BeatLoader } from 'react-spinners'
import Error from './error'
import { Input } from './ui/input'
import { Button } from './ui/button'
import * as Yup from 'yup'

const Login = () => {
  const [errors, setErrors]= useState([])
  const[formData, setFormData] = useState({
    email:"",
    password:"",
  })

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevState)=>({
      ...prevState,
      [name]: value,
    }))
  }

  const handleLogin = async() => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
        .email("Invalid Email")
        .required("Email is required"),
        password: Yup.string()
        .min(6,"Password must be of 6 characters!")
        .required("Password is required"),
      })
      await schema.validate(formData,{abortEarly:false})
      // api call
    } catch(e){
        const newErrors ={};
        e?.inner?.forEach((err) =>{
          newErrors[err.path] = err.message;
        })
        setErrors(newErrors);
    }
  }

  return (
    <Card className="rounded-3xl">
  <CardHeader>
    <CardTitle>Login</CardTitle>
    <CardDescription>
      to your account if you already have one
      </CardDescription>
      <Error message={"some error"} />
  </CardHeader>
  <CardContent className="space-y-2">
    <div className='space-y-1'>
      <input className="w-full p-2 rounded text-white bg-black" 
      name='email'
      type="email" 
      placeholder='Enter Email'
      onChange={handleInputChange}
      />
      {errors.email  && <Error message={errors.email}/>}
    </div>
    <div className='space-y-1'>
      <input className="w-full p-2 rounded text-white bg-black" 
      name='password' 
      type="password" 
      placeholder='Enter Password' 
      onChange={handleInputChange}
      />
      {errors.password  && <Error message={errors.password}/>}
    </div>
  </CardContent>
  <CardFooter>
    <Button className="rounded-xl" onClick={handleLogin}>
      {false? <BeatLoader size={10} color='#36d7b7'/>:"Login"}
    </Button>
  </CardFooter>
</Card>

  )
}

export default Login