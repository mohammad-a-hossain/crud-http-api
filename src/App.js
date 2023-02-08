
import { useEffect, useState } from 'react';
import './App.css';

 import Form from './components/Form/index';


const URL='http://localhost:9000/users'

function App() {
  const [users,setUsers] = useState(null)
  const [error,setError] = useState(null)
  const [isLoading,setIsLoading] =useState(true)

  //for edit form
  const [selectedData,setSelectedData] = useState({
    name:'',
    email:''
  })
  // getting id for update data
  const [selectedId,setSelectedId] =useState('')
   
  const [isEdit,setIsEdit] = useState(false)


  const getAllUsers=()=>{
    fetch(URL)
    .then((res)=>{
     if(!res.ok){
      throw Error('data error fetch')
     }
     return res.json()
    })
    .then((data)=>{  //console.log(data)
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
  const handelAddUser=(user)=>{// console.log(user)
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.status === 201) {
          getAllUsers();
        } else {
          throw new Error("could not create new user");
        }
      })
      .catch((err) => {
        setError(err.message);
      });
            // setUsers(user)

  }
  const handleEdit=(id)=>{
    setSelectedId(id)
          setIsEdit(true)
             alert(id)
            const selectUser= users.filter((user)=> user.id === id)
            console.log(selectUser)
            setSelectedData({
              name:selectUser[0].name,
              email:selectUser[0].email
            })
  }
  // daate updata 
   const handleUpdateData=(user)=>{
         // console.log(user)
         fetch(URL+ `/${selectedId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
        .then((res)=>{
          if(!res.ok){
           throw Error('data error fetch')
          }  
          getAllUsers()
          setIsEdit(false)
        })
          .catch((err) => {
            setError(err.message);
          })
          .finally(()=> setIsLoading(false))
   }

  return (
    <div className="App">
        <h3>youser management crud project </h3>
    {isLoading && <h1>hello wait it is loadding................</h1>}
    {error && <h1 style={{color:'red'}}>hello error happens: pls see your server is ok or refresh</h1>}
           
        {
          isEdit ? (<Form btnText="edit" selectedData={selectedData} handelAddUser={handleUpdateData}/>):
        ( <Form btnText="add" handelAddUser={handelAddUser}/>)
        
        }
         
        

    <div style={{display:'flex',flexWrap:'wrap',flexGap:'10px',margin:'10px'}}>
       {
        users && users.map((user)=> {
          const {name,email,id} =user
         return  (  <card style={{display:'flex',flexDirection:'column',justifyContent:'center',
        width:'200px',height:'200px',backgroundColor:'lightgrey',padding:'10px',margin:'5px'}} key={user.id}>
           <li style={{listStyleType:'none',textAlign:'left'}}>name:{name}</li> <br/>
           <li style={{listStyleType:'none',textAlign:'left'}}>email: {email}</li><br/>
          <button onClick={()=>handleEdit(id)} type="btn">edit</button><br/><button onClick={()=>handleDelete(id)} type="">delete</button>
        </card> )})
      }
  
      
    </div>
     
    </div>
  );
}

export default App;
