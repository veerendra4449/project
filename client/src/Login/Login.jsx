import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
export default function Login() {
  const [formData,setFormData]=useState({email:"",password:""})
  const {setUser}=useContext(AuthContext)
  const navigate=useNavigate()
  function handleChange(e){
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  function handleLogin(e){
    e.preventDefault()
    axios.post("https://render.com/docs/web-services#port-binding/api/auth/login",formData)
      .then((res)=>{
        console.log("login response",res)
        if(res.status===200){
          setUser({token:res.data.token,role:res.data.role})
          navigate("/")
        }
      })
      .catch((err)=>{
        console.log("error from login",err)
      })
  }
  return (
    <div>
      <form action="">
        <div>
          <input type='email' placeholder='EmailID' name="email" onChange={handleChange}/>
        </div>
        <div>
          <input type='password' placeholder='Password' name="password" onChange={handleChange}/>
        </div>
        <button onClick={handleLogin}>Login</button>
      </form>
    </div>
  )
}
