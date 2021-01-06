import React from 'react'
import UserList from './GetUserList'
 const UserForm = () => {
   


    const [name,setName] = React.useState('')
    const [email,setEmail] = React.useState('')
    const [users,setUsers] = React.useState([])

    React.useEffect(()=>{
        loadUser()
    },[users])

    const loadUser = ()=>{
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("http://localhost:8000/api/users", requestOptions)
            .then(response => response.json())
            .then(result => setUsers(result))
            .catch(error => console.log('error', error));
    }

   const onSave = (e)=>{
       e.preventDefault()
        if(name!=='' && email!==''){
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({"name":name,"email":email});
            var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };
            fetch('http://localhost:8000/api/addUser',requestOptions)
           .then(()=>{
            alert("added user..!")
            setName('')
            setEmail('')
            loadUser()
        }).catch(e=>console.log(e))
        }else{
            alert("Invalid data")
        }
   }

     const style={
         marginLeft:'50px',
         marginRight:'50px',
         display:'block'
     }

     const box={
         padding:15
     }

     const delUser=(id)=>{
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({"id":id});
        var requestOptions = {
          method: 'DELETE',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        fetch("http://localhost:8000/api/users", requestOptions)
            .then(() => loadUser(),alert("User deleted")).catch(error => console.log('error', error));
     }

    return (
        <div style={style}>
            <form onSubmit={onSave}>
                <p> <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="User name" style={box} /> </p>
                <p> <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email address" style={box} /> </p>
                <p> <input type="submit" value="Add" style={box}/> </p>
            </form>
            <br/>
            <UserList users={users} delUser={delUser}/>
        </div>
    )
}

export default UserForm
