
import { useEffect, useState } from 'react';
import './App.css';
//import { Form } from './components/Form';

const URL='http://localhost:9000/users'
function App() {
  const [users,setUsers] = useState(null)
  const [error,setError] = useState(null)
  const [isLoading,setIsLoading] =useState(true)

  const getAllUsers=()=>{
    fetch(URL)
    .then((res)=>{
     if(!res.ok){
      throw Error('data error fetch')
     }
     return res.json()
    })
    .then((data)=>{  console.log(data)
     setUsers(data)
   
    })
    .catch((e)=>{  
     setError(e.message)
    })
    .finally(()=> setIsLoading(false))
  }

  useEffect(()=>{
    setTimeout(() => {
        getAllUsers()
    }, 2000);
   
  },[])

  const handleDelete=(id)=>{ alert(id)
     fetch(URL + `/${id}`,{
      method:'DELETE',
     })
     .then((res)=>{
      if(!res.ok){
       throw Error('data error fetch')
      }  
      getAllUsers()
    })
    
      .catch((e)=>{  
        setError(e.message)
       }) 
    
  }
  return (
    <div className="App">
        <h3>youser management crud project </h3>
    {isLoading && <h1>hello wait it is loadding................</h1>}
    {error && <h1>hello error happens: pls start your server or refresh</h1>}
    <div style={{display:'flex',flexWrap:'wrap',flexGap:'10px',margin:'10px'}}>
       {
        users && users.map((user)=> {
          const {name,email,id} =user
         return  (  <card style={{display:'flex',flexDirection:'column',justifyContent:'center',
        width:'200px',height:'200px',backgroundColor:'lightgrey',padding:'10px',margin:'5px'}}>
           <li style={{listStyleType:'none',textAlign:'left'}}>name:{name}</li> <br/>
           <li style={{listStyleType:'none',textAlign:'left'}}>email: {email}</li><br/>
          <button type="">edit</button><br/><button onClick={()=>handleDelete(id)} type="">delete</button>
        </card> )})
      }
  
      
    </div>
     
    </div>
  );
}

export default App;
