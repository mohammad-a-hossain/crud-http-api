import React,{useEffect, useState} from 'react'
import style from './style.module.css'
import { v4 as uuidv4 } from 'uuid';

 const Form = ({handelAddUser,btnText,selectedData}) => {
    const [userInfo, setUserInfo] = useState({
      id: uuidv4(),
      name:'',
      email:''
    })
    const {name,email} = userInfo
      
    // getting edit data 
    useEffect(()=>{
        setUserInfo({
         name: selectedData.name,
         email: selectedData.email
        })
    },[selectedData])
   
    const handleChange=(e)=>{
      const selectedField = e.target.name;
      const selectedValue = e.target.value;
      setUserInfo((prevState) => {
        return { ...prevState, [selectedField]: selectedValue };
      });
    }

    const handleSubmit=(e)=>{
           e.preventDefault()
           handelAddUser(userInfo)
           setUserInfo({
            name:'',
            email:''
           })
    }

   



  return (
    <form onSubmit={handleSubmit}>
    <div className={style.formDiv}>
       <label htmlFor='name' >name</label>
       <input type="text" name="name" value={name} id="name"  onChange={handleChange }/>
    </div>
    <div className={style.formDiv}>
    <label htmlFor='email' >email</label>
    <input type="email" name="email" value={email} id="email" onChange={handleChange } />
 </div>

 <button type="submit" className="btn">
 {btnText}
</button>
   </form>
  )
}

Form.defaultProps={
  selectedData: {
    name: "",
    email: "",
  },
}
export default Form