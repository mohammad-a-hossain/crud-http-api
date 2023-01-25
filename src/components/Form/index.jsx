import React, { useState } from 'react'
import style from './style.module.css'

export const Form = () => {
      /* const [name,setName] = useState('')
      const [email,setEmail] = useState('')
      const [password,setPassword] = useState('') */
      const [user,setUser]= useState({
        name:'',email:'',password:''

      })
      const {name,email,password}= user

    const handleChange =(e)=>{
        
        setUser({
            ...user,
            [e.target.name]:e.target.value}
            )
       // console.log(e.target.value)
    }
   /*  const handleEmailChange =(e)=>{
        setEmail(e.target.value)
        //console.log(e.target.value)
    }
    const handlePassChange =(e)=>{
        setPassword(e.target.value)
        //console.log(e.target.value)
    } */

/*     const handleSubmit=(e)=>{
    e.preventDefault()
    let data={
        name:name,
        email:email,
        password:password
    }
    console.log(data)
   // console.log(name,email,password)
    } */
       
    const handleSubmit=(e)=>{
        
        console.log(user)
        e.preventDefault()
    }
  return (
    <div>
     <form onSubmit={handleSubmit}>
      <div className={style.formDiv}>
         <label htmlFor='name' >name</label>
         <input type="text" name="name" value={name}  onChange={handleChange }/>
      </div>
      <div className={style.formDiv}>
      <label htmlFor='email' >email</label>
      <input type="email" name="email" value={email} onChange={handleChange } />
   </div>
   <div className={style.formDiv}>
   <label htmlFor='password' >password</label>
   <input type="password" name="password" value={password} onChange={handleChange  } />
</div>
    <button type='submit'>submit </button>
     </form>
    </div>
    
    
  
  )
}
